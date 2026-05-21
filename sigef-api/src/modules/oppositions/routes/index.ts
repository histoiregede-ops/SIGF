import { Router } from 'express';
import '../models/_associations';
import OppositionController from '../controllers/OppositionController';

const router = Router();

router.get('/', OppositionController.getAll);
router.get('/:id', OppositionController.getById);
router.post('/', OppositionController.create);
router.put('/:id', OppositionController.update);
router.delete('/:id', OppositionController.delete);

export default router;
