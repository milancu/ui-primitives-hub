import express from "express";
import {authenticate} from "../middleware/auth";
import {ComponentService} from "../services/component.service";

const router = express.Router();

router.use(authenticate as express.RequestHandler);

router.put('/:projectId/components/:componentType/', async (req, res) => {
  try {
    const { state, data } = req.body;

    const updated = await ComponentService.updateComponent(
      (req as any).user.uid,
      req.params.projectId,
      req.params.componentType,
      state,
      data
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Component update failed' });
  }
});

router.get('/:projectId/components/:componentType', async (req, res) => {
  try {
    const component = await ComponentService.getComponent(
      (req as any).user.uid,
      req.params.projectId,
      req.params.componentType,
    );
    res.json(component);
  } catch (error) {
    res.status(404).json({ error: 'Component not found' });
  }
});

// router.delete('/:projectId/components/:componentType/:element', async (req, res) => {
//   try {
//     await ComponentService.resetComponent(
//       req.user.uid,
//       req.params.projectId,
//       req.params.componentType,
//       req.params.element
//     );
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: 'Reset failed' });
//   }
// });

export default router;