import {beforeEach, describe, expect, it, vi} from 'vitest';
import request from 'supertest';
import express from 'express';
import componentsRouter from '../src/routes/component.route'; // cesta k routeru
import { ComponentService } from '../src/services/component.service'; // cesta k service

// Mock authenticate middleware
const authenticateMock = vi.fn((req, res, next) => {
  req.user = {uid: 'mockUserId'}; // Simulate authenticated user
  next();
});

vi.mock('../src/services/component.service', () => ({
  ComponentService: {
    updateComponent: vi.fn(),
    resetComponentPartStateStyle: vi.fn(),
    getComponentHierarchy: vi.fn(),
    getComponentParts: vi.fn(),
    getComponentPartStates: vi.fn(),
    getComponentPartState: vi.fn(),
    getComponentCode: vi.fn(),
  },
}));

// Nastavení Express aplikace pro testování
const app = express();
app.use(express.json());
app.use(authenticateMock);
app.use('/projects', [componentsRouter]); // Opraveno na správnou cestu

vi.mock('../src/firebase', () => ({
  auth: {
    verifyIdToken: vi.fn().mockResolvedValue({uid: 'mockUserId'}) // Simulujeme úspěšnou autentizaci
  }
}));

// Testy pro jednotlivé routes
describe('/components routes', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear previous mock calls before each test
  });

  it('should update component part state', async () => {
    const mockTailwind = 'mockTailwind';
    const mockResponse = { success: true };

    // Mockování metody pro update
    ComponentService.updateComponent.mockResolvedValue({ success: true });

    const response = await request(app)
      .put('/projects/projectId/components/component/part/state') // Opraveno na správnou cestu
      .set('Authorization', 'Bearer mockToken')
      .send({ tailwind: mockTailwind });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });

  it('should reset component part state style', async () => {
    const mockResponse = { success: true };

    // Mockování metody pro reset
    ComponentService.resetComponentPartStateStyle.mockResolvedValue(mockResponse);

    const response = await request(app)
      .post('/projects/projectId/components/component/part/state/reset') // Opraveno na správnou cestu
      .set('Authorization', 'Bearer mockToken')
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });

  it('should get component hierarchy', async () => {
    const mockResponse = { };

    // Mockování metody pro získání hierarchie
    ComponentService.getComponentHierarchy.mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/projects/projectId/components/component/hierarchy') // Opraveno na správnou cestu
      .set('Authorization', 'Bearer mockToken');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });

  it('should get component parts', async () => {
    const mockResponse = { parts: [] };

    // Mockování metody pro získání částí komponenty
    ComponentService.getComponentParts.mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/projects/projectId/components/component/parts') // Opraveno na správnou cestu
      .set('Authorization', 'Bearer mockToken');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });

  it('should get component part states', async () => {
    const mockResponse = { states: [] };

    // Mockování metody pro získání stavů částí komponenty
    ComponentService.getComponentPartStates.mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/projects/projectId/components/component/part/states') // Opraveno na správnou cestu
      .set('Authorization', 'Bearer mockToken');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });

  it('should get component part state', async () => {
    const mockResponse = { state: 'mockState' };

    // Mockování metody pro získání stavu části komponenty
    ComponentService.getComponentPartState.mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/projects/projectId/components/component/part/state') // Opraveno na správnou cestu
      .set('Authorization', 'Bearer mockToken');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });

  it('should get component code', async () => {
    const mockResponse = 'mockComponentCode';

    // Mockování metody pro získání kódu komponenty
    ComponentService.getComponentCode.mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/projects/projectId/components/component/code') // Opraveno na správnou cestu
      .set('Authorization', 'Bearer mockToken');

    expect(response.status).toBe(200);
    expect(response.text).toBe(mockResponse);
  });

});
