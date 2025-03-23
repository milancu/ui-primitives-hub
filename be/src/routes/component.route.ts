import express from "express";
import {authenticate} from "../middleware/auth";
import {ComponentService} from "../services/component.service";

const router = express.Router();

router.use(authenticate as express.RequestHandler);

router.put('/:projectId/components/:component/:part/:state', async (req, res) => {
  try {
    const {tailwind} = req.body;

    const updated = await ComponentService.updateComponent(
      (req as any).user.uid,
      req.params.projectId,
      req.params.component,
      req.params.part,
      req.params.state,
      tailwind
    );
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({error: `Component update failed, ${error.message}`});
  }
});

router.get('/:projectId/components/:component/hierarchy', async (req, res) => {
  try {
    const hierarchy = ComponentService.getComponentHierarchy(
      (req as any).user.uid,
      req.params.projectId,
      req.params.component
    );
    res.json(hierarchy);
  } catch (error: any) {
    res.status(400).json({error: error.message});
  }
});

router.get('/:projectId/components/:component/parts', async (req, res) => {
  try {
    const parts = await ComponentService.getComponentParts(
      (req as any).user.uid,
      req.params.projectId,
      req.params.component
    )
    res.json(parts)
  } catch (error: any) {
    res.status(400).json({error: error.message});
  }
})

router.get('/:projectId/components/:component/:part/states', async (req, res) => {
  try {
    const parts = await ComponentService.getComponentPartStates(
      (req as any).user.uid,
      req.params.projectId,
      req.params.component,
      req.params.part
    )
    res.json(parts)
  } catch (error: any) {
    res.status(400).json({error: error.message});
  }
})

router.get('/:projectId/components/:component/:part/:state', async (req, res) => {
  try {
    const parts = await ComponentService.getComponentPartState(
      (req as any).user.uid,
      req.params.projectId,
      req.params.component,
      req.params.part,
      req.params.state
    )
    res.json(parts)
  } catch (error: any) {
    res.status(400).json({error: error.message});
  }
})

export default router;