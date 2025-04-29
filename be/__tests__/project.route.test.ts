import {beforeEach, describe, expect, it, vi} from 'vitest';
import request from 'supertest';
import express from 'express';
import projectRouter from '../src/routes/project.route'; // Adjust path as needed
import {ProjectService} from '../src/services/project.service'; // Adjust path as needed

// Mock authenticate middleware
const authenticateMock = vi.fn((req, res, next) => {
  req.user = {uid: 'mockUserId'}; // Simulate authenticated user
  next();
});

vi.mock('../src/services/project.service', () => ({
  ProjectService: {
    createProject: vi.fn(),
    listProjects: vi.fn(),
    searchProjects: vi.fn(),
    getProjectColors: vi.fn(),
    updateProjectColors: vi.fn(),
    getProjectMetadata: vi.fn(),
    getProject: vi.fn(),
    updateProject: vi.fn(),
    deleteProject: vi.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use(authenticateMock);
app.use('/projects', projectRouter);

vi.mock('../src/firebase', () => ({
  auth: {
    verifyIdToken: vi.fn().mockResolvedValue({uid: 'mockUserId'}) // Simulujeme úspěšnou autentizaci
  }
}));

describe('Projects Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear previous mock calls before each test
  });

  describe('POST /projects', () => {
    it('should create a new project', async () => {
      const mockProject = {id: '1', name: 'Test Project'};
      ProjectService.createProject.mockResolvedValue(mockProject);

      const response = await request(app)
        .post('/projects')
        .set('Authorization', 'Bearer mockToken')
        .send({name: 'Test Project'});

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockProject);
    });

    it('should handle project creation failure', async () => {
      ProjectService.createProject.mockRejectedValue(new Error('Database error'));

      const response = await request(app).post('/projects').set('Authorization', 'Bearer mockToken').send({name: 'Test Project'});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({error: 'Project creation failed, Error: Database error'});
    });
  });

  describe('GET /projects', () => {
    it('should list all projects', async () => {
      const mockProjects = [{id: '1', name: 'Test Project'}];
      ProjectService.listProjects.mockResolvedValue(mockProjects);

      const response = await request(app).get('/projects').set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProjects);
    });

    it('should handle failure in listing projects', async () => {
      ProjectService.listProjects.mockRejectedValue(new Error('Error fetching projects'));

      const response = await request(app).get('/projects').set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({error: 'Failed to fetch projects'});
    });
  });

  describe('GET /projects/search', () => {
    it('should search projects', async () => {
      const mockProjects = [{id: '1', name: 'Test Project'}];
      ProjectService.searchProjects.mockResolvedValue(mockProjects);

      const response = await request(app).get('/projects/search').set('Authorization', 'Bearer mockToken').query({q: 'Test'});

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProjects);
    });

    it('should handle search failure', async () => {
      ProjectService.searchProjects.mockRejectedValue(new Error('Search failed'));

      const response = await request(app).get('/projects/search').set('Authorization', 'Bearer mockToken').query({q: 'Test'});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({error: 'Failed to search projects, Error: Search failed'});
    });
  });

  describe('GET /projects/:projectId/colors', () => {
    it('should get project colors', async () => {
      const mockColors = {theme: 'dark', color: 'blue'};
      ProjectService.getProjectColors.mockResolvedValue(mockColors);

      const response = await request(app).get('/projects/1/colors').set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockColors);
    });

    it('should handle failure in getting project colors', async () => {
      ProjectService.getProjectColors.mockRejectedValue(new Error('Error fetching colors'));

      const response = await request(app).get('/projects/1/colors').set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({error: 'Failed to fetch projects'});
    });
  });

  describe('PUT /projects/:projectId/colors', () => {
    it('should update project colors', async () => {
      const mockColors = {theme: 'light', color: 'green'};
      ProjectService.updateProjectColors.mockResolvedValue(mockColors);

      const response = await request(app)
        .put('/projects/1/colors')
        .set('Authorization', 'Bearer mockToken')
        .send({theme: 'light', color: 'green', value: '#00FF00'});

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockColors);
    });

    it('should handle failure in updating project colors', async () => {
      ProjectService.updateProjectColors.mockRejectedValue(new Error('Color update failed'));

      const response = await request(app)
        .put('/projects/1/colors')
        .set('Authorization', 'Bearer mockToken')
        .send({theme: 'light', color: 'green', value: '#00FF00'});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({error: 'Color update failed'});
    });
  });

  describe('GET /projects/:projectId/metadata', () => {
    it('should get project metadata', async () => {
      const mockMetadata = {id: '1', name: 'Test Project', description: 'Test Description'};
      ProjectService.getProjectMetadata.mockResolvedValue(mockMetadata);

      const response = await request(app).get('/projects/1/metadata').set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMetadata);
    });

    it('should return 404 if project not found', async () => {
      ProjectService.getProjectMetadata.mockRejectedValue(new Error('Project not found'));

      const response = await request(app).get('/projects/1/metadata').set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({error: 'Project not found'});
    });
  });

  describe('DELETE /projects/:projectId', () => {
    it('should delete a project', async () => {
      ProjectService.deleteProject.mockResolvedValue(undefined);

      const response = await request(app).delete('/projects/1').set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(204);
    });

    it('should handle failure in deleting a project', async () => {
      ProjectService.deleteProject.mockRejectedValue(new Error('Error deleting project'));

      const response = await request(app).delete('/projects/1').set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({error: 'Error deleting project'});
    });
  });
});
