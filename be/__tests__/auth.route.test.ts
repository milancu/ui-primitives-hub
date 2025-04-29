import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import authRouter from '../src/routes/auth.route'; // cesta k routeru

// Mocking AuthService
import { AuthService } from '../src/services/auth.service';
vi.mock('../src/services/auth.service');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

// Test for /device/code route
describe('/auth/device/code', () => {
  it('should generate device code successfully', async () => {
    const mockDeviceCode = { device_code: 'mockCode' };
    AuthService.generateDeviceCode.mockResolvedValue(mockDeviceCode); // Mock resolved value

    const response = await request(app).post('/auth/device/code');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDeviceCode);
  });

  it('should return 500 on failure to generate device code', async () => {
    AuthService.generateDeviceCode.mockRejectedValue(new Error('Failed to generate device code'));

    const response = await request(app).post('/auth/device/code');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to generate device code' });
  });
});

// Test for /device/poll route
describe('/auth/device/poll', () => {
  it('should poll device code successfully', async () => {
    const mockResult = { status: 'success' };
    const mockDeviceCode = 'mockDeviceCode';
    AuthService.pollDeviceCode.mockResolvedValue(mockResult);

    const response = await request(app)
      .post('/auth/device/poll')
      .send({ device_code: mockDeviceCode });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
  });

  it('should return 404 if device code is invalid', async () => {
    const mockDeviceCode = 'invalidCode';
    AuthService.pollDeviceCode.mockRejectedValue(new Error('Device code not found'));

    const response = await request(app)
      .post('/auth/device/poll')
      .send({ device_code: mockDeviceCode });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Device code not found' });
  });

  it('should return 410 if device code expired', async () => {
    const mockDeviceCode = 'expiredCode';
    AuthService.pollDeviceCode.mockRejectedValue(new Error('Device code expired'));

    const response = await request(app)
      .post('/auth/device/poll')
      .send({ device_code: mockDeviceCode });

    expect(response.status).toBe(410);
    expect(response.body).toEqual({ error: 'Device code expired' });
  });
});

// Test for /figma route
describe('/auth/figma', () => {
  it('should redirect to Figma auth URL', async () => {
    const mockUrl = 'https://figma.com/oauth';
    AuthService.buildFigmaAuthUrl.mockReturnValue(mockUrl);

    const response = await request(app).get('/auth/figma');

    expect(response.status).toBe(302); // Redirect status code
    expect(response.header['location']).toBe(mockUrl);
  });
});

// Test for /figma/token route
describe('/auth/figma/token', () => {
  it('should generate token successfully', async () => {
    const mockToken = { token: 'mockToken' };
    const mockFigmaId = 'mockFigmaId';
    AuthService.getFigmaUser.mockResolvedValue({ uid: 'mockUid' });
    AuthService.generateToken.mockResolvedValue(mockToken);

    const response = await request(app)
      .get('/auth/figma/token')
      .query({ figmaId: mockFigmaId });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockToken);
  });

  it('should return 500 on error generating token', async () => {
    AuthService.getFigmaUser.mockRejectedValue(new Error('Error fetching user'));
    const response = await request(app)
      .get('/auth/figma/token')
      .query({ figmaId: 'mockFigmaId' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error fetching user' });
  });
});

// Test for /figma/callback route
describe('/auth/figma/callback', () => {
  it('should return 400 for invalid state', async () => {
    const response = await request(app)
      .get('/auth/figma/callback')
      .query({ code: 'mockCode', state: 'invalidState' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid state' });
  });

  it('should redirect on successful authentication', async () => {
    const mockRedirectUrl = 'https://frontend.com/redirect';
    AuthService.exchangeCodeForToken.mockResolvedValue('mockToken');
    AuthService.getFigmaUserProfile.mockResolvedValue({ uid: 'mockUid' });
    AuthService.handleFigmaAuth.mockResolvedValue({ uid: 'mockUid' });
    AuthService.generateFrontendRedirectUrl.mockResolvedValue(mockRedirectUrl);

    const response = await request(app)
      .get('/auth/figma/callback')
      .query({ code: 'mockCode', state: 'YOUR_UNIQUE_STATE' });

    expect(response.status).toBe(302);
    expect(response.header['location']).toBe(mockRedirectUrl);
  });

  it('should return 500 on callback error', async () => {
    AuthService.exchangeCodeForToken.mockRejectedValue(new Error('Authorization failed'));

    const response = await request(app)
      .get('/auth/figma/callback')
      .query({ code: 'mockCode', state: 'YOUR_UNIQUE_STATE' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Authorization failed' });
  });
});
