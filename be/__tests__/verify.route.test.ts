import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import authRouter from '../src/routes/verify.route'; // cesta k routeru
import { authenticate } from '../src/middleware/auth.js'; // cesta k middleware

// Mocking AuthService
import { AuthService } from '../src/services/auth.service';
vi.mock('../src/services/auth.service');

// Mocking authenticate middleware
vi.mock('../src/middleware/auth.js', () => ({
  authenticate: vi.fn((req, res, next) => next()), // Mock pro bypass autentizace
}));

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

// Test for /device/verify route
describe('/auth/device/verify', () => {
  it('should verify device code successfully', async () => {
    const mockUserCode = 'mockUserCode';
    const mockToken = 'mockToken';
    const mockSuccessResponse = { success: true };

    AuthService.verifyDeviceCode.mockResolvedValue(mockSuccessResponse); // Mock resolved value

    const response = await request(app)
      .post('/auth/device/verify')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ userCode: mockUserCode });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSuccessResponse);
  });

  it('should return 400 if verification fails due to invalid code', async () => {
    const mockUserCode = 'invalidCode';
    const mockToken = 'mockToken';

    AuthService.verifyDeviceCode.mockRejectedValue(new Error('Invalid device code'));

    const response = await request(app)
      .post('/auth/device/verify')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ userCode: mockUserCode });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid device code' });
  });

  it('should return 410 if verification fails due to expired code', async () => {
    const mockUserCode = 'expiredCode';
    const mockToken = 'mockToken';

    AuthService.verifyDeviceCode.mockRejectedValue(new Error('Device code expired'));

    const response = await request(app)
      .post('/auth/device/verify')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ userCode: mockUserCode });

    expect(response.status).toBe(410);
    expect(response.body).toEqual({ error: 'Device code expired' });
  });
});
