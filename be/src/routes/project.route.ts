import express from 'express';
import {ProjectService} from "../services/project.service.js";
import {authenticate} from "../middleware/auth.js";

const router = express.Router();

router.use(authenticate as express.RequestHandler);

// Projects CRUD
router.post('/', async (req, res) => {
  const {name} = req.body;

  if (!name) {
    res.status(400).json({error: 'Missing name'});
  }

  try {
    const project = await ProjectService.createProject((req as any).user.uid, name);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({error: `Project creation failed, ${error}`});
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await ProjectService.listProjects((req as any).user.uid);
    res.json(projects);
  } catch (error) {
    res.status(400).json({error: 'Failed to fetch projects'});
  }
});

router.get('/:projectId/colors', async (req, res) => {
  const projectId = req.params.projectId
  const userId = (req as any).user.uid
  try {
    const projects = await ProjectService.getProjectColors(userId, projectId);
    res.json(projects);
  } catch (error) {
    res.status(400).json({error: 'Failed to fetch projects'});
  }
});

router.put('/:projectId/colors', async (req, res) => {
  const projectId = req.params.projectId
  const userId = (req as any).user.uid
  const {theme, color, value} = req.body;

  try {
    const projects = await ProjectService.updateProjectColors(userId, projectId, theme, color, value);
    res.json(projects);
  } catch (error: any) {
    res.status(400).json({error: error.message});
  }
});

router.get('/:projectId/metadata', async (req, res) => {
  try {
    const project = await ProjectService.getProjectMetadata((req as any).user.uid, req.params.projectId);
    res.json(project);
  } catch (error) {
    res.status(404).json({error: 'Project not found'});
  }
})

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
    const {name} = req.body;
    const {projectId} = req.params;

    if (!projectId || !name) {
      res.status(400).json({error: 'Missing data'});
    }

    try {
      const updatedProject = await ProjectService.updateProject((req as any).user.uid, projectId, name);
      res.status(200).json(updatedProject);
    } catch (err: any) {
      res.status(400).json({error: err.message});
    }
  })
  .delete(async (req, res) => {
    const {projectId} = req.params;

    if (!projectId) {
      res.status(400).json({error: 'Missing projectId'});
    }

    try {
      await ProjectService.deleteProject((req as any).user.uid, projectId);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({error: error.message});
    }
  });

export default router;