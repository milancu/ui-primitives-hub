// src/routes/project.routes.ts
import express from 'express';
import {ProjectService} from '../services/project.service';
import {authenticate} from "../middleware/auth";

const router = express.Router();

router.use(authenticate as express.RequestHandler);

// Projects CRUD
router.post('/', async (req, res) => {
  try {
    const project = await ProjectService.createProject((req as any).user.uid, req.body.name);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({error: 'Project creation failed'});
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await ProjectService.listProjects((req as any).user.uid);
    res.json(projects);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch projects'});
  }
});

router.route('/:projectId')
  .get(async (req, res) => {
    try {
      const project = await ProjectService.getProject((req as any).user.uid, req.params.projectId);
      res.json(project);
    } catch (error) {
      res.status(404).json({error: 'Project not found'});
    }
  })
  .put(async (req, res) => {
    try {
      const updated = await ProjectService.updateProject(
        (req as any).user.uid,
        req.params.projectId,
        req.body
      );
      res.json(updated);
    } catch (error) {
      res.status(400).json({error: 'Update failed'});
    }
  })
  .delete(async (req, res) => {
    try {
      await ProjectService.deleteProject((req as any).user.uid, req.params.projectId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({error: 'Deletion failed'});
    }
  });

export default router;