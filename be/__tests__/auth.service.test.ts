import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import axios from 'axios';
import {AuthService} from "../src/services/auth.service";
import {auth, db} from "../src/firebase";

vi.mock('axios');
vi.mock('../firebase');

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateDeviceCode', () => {
    it('should generate device and user codes and store them in the database', async () => {
      const setSpy = vi.fn();
      db.ref = vi.fn().mockReturnValue({set: setSpy});

      const result = await AuthService.generateDeviceCode();

      expect(result).toHaveProperty('device_code');
      expect(result).toHaveProperty('user_code');
      expect(result).toHaveProperty('verification_uri');
      expect(setSpy).toHaveBeenCalledWith(expect.objectContaining({
        userCode: expect.any(String),
        codeChallenge: expect.any(String),
        status: 'pending',
        createdAt: expect.any(Number),
      }));
    });
  });

  describe('verifyDeviceCode', () => {
    it('should update the device code status to approved', async () => {
      const updateSpy = vi.fn();
      db.ref = vi.fn().mockReturnValue({update: updateSpy});

      const userCode = '123ABC';
      const token = 'validToken';
      const deviceCode = 'device123';

      vi.spyOn(AuthService, 'findDeviceCodeByUserCode').mockResolvedValue(deviceCode);

      await AuthService.verifyDeviceCode(userCode, token);

      expect(updateSpy).toHaveBeenCalledWith({
        status: 'approved',
        token,
      });
    });

    it('should throw an error if the user code is invalid', async () => {
      const userCode = 'invalidCode';
      vi.spyOn(AuthService, 'findDeviceCodeByUserCode').mockRejectedValue(new Error('Invalid user code'));

      await expect(AuthService.verifyDeviceCode(userCode, 'token')).rejects.toThrow('Invalid user code');
    });
  });

  describe('pollDeviceCode', () => {
    it('should return the status and token if device code exists', async () => {
      const mockSnapshot = {val: () => ({status: 'approved', token: 'validToken'})};
      db.ref = vi.fn().mockReturnValue({get: vi.fn().mockResolvedValue(mockSnapshot)});

      const result = await AuthService.pollDeviceCode('device123');

      expect(result).toEqual({status: 'approved', token: 'validToken'});
    });

    it('should throw an error if device code is invalid', async () => {
      db.ref = vi.fn().mockReturnValue({get: vi.fn().mockResolvedValue({val: () => null})});

      await expect(AuthService.pollDeviceCode('invalidDeviceCode')).rejects.toThrow('Invalid device code');
    });

    it('should throw an error if session is expired', async () => {
      const mockSnapshot = {val: () => ({status: 'expired'})};
      db.ref = vi.fn().mockReturnValue({get: vi.fn().mockResolvedValue(mockSnapshot)});

      await expect(AuthService.pollDeviceCode('device123')).rejects.toThrow('Session expired');
    });
  });

  describe('handleFigmaCallback', () => {
    it('should return the frontend URL with a token', async () => {
      const code = 'figmaCode';
      const state = process.env.OAUTH_STATE_SECRET!;
      const mockToken = 'firebaseToken';
      const mockUser = {uid: 'user123', email: 'user@example.com'};
      const mockFigmaUser = {id: 'figma123', email: 'user@example.com', handle: 'user_handle'};

      vi.spyOn(AuthService, 'exchangeCodeForToken').mockResolvedValue('figmaAccessToken');
      vi.spyOn(AuthService, 'getFigmaUserProfile').mockResolvedValue(mockFigmaUser);
      vi.spyOn(AuthService, 'getOrCreateFirebaseUser').mockResolvedValue(mockUser);
      vi.spyOn(auth, 'createCustomToken').mockResolvedValue(mockToken);

      const result = await AuthService.handleFigmaCallback(code, state);

      expect(result).toBe(`${process.env.FRONTEND_URL}/auth/callback?token=${mockToken}`);
    });

    it('should throw an error if state is invalid', async () => {
      const invalidState = 'wrongState';

      await expect(AuthService.handleFigmaCallback('code', invalidState)).rejects.toThrow('Invalid state parameter');
    });
  });

  describe('exchangeCodeForToken', () => {
    it('should exchange code for access token', async () => {
      const code = 'authCode';
      const mockResponse = {data: {access_token: 'accessToken'}};

      axios.post = vi.fn().mockResolvedValue(mockResponse);

      const token = await AuthService.exchangeCodeForToken(code);

      expect(token).toBe('accessToken');
      expect(axios.post).toHaveBeenCalledWith(
        'https://api.figma.com/v1/oauth/token',
        expect.any(URLSearchParams),
        expect.objectContaining({headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      );
    });
  });


  describe('getOrCreateUser', () => {
    it('should create a new user if they do not exist', async () => {
      const figmaUser = {id: 'figma123', email: 'user@example.com', handle: 'user_handle'};
      const mockUser = {uid: 'figma:figma123', email: 'user@example.com'};

      vi.spyOn(auth, 'getUser').mockRejectedValue(new Error('User not found'));
      vi.spyOn(auth, 'createUser').mockResolvedValue(mockUser);

      const setSpy = vi.fn();
      db.ref = vi.fn().mockReturnValue({set: setSpy});

      const result = await AuthService.getOrCreateUser(figmaUser);

      expect(result).toEqual({
        uid: 'figma:figma123',
        email: 'user@example.com',
        figmaId: figmaUser.id,
        createdAt: expect.any(Date),
        photoURL: undefined,
        projects: [],
      });
      expect(setSpy).toHaveBeenCalled();
    });
  });
});
