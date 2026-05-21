import { Router } from 'express';
import '../models/_associations';
import DepotController from '../controllers/DepotController';

const router = Router();

router.get('/', DepotController.getAll);
router.get('/:id', DepotController.getById);
router.post('/', DepotController.create);
router.put('/:id', DepotController.update);
router.delete('/:id', DepotController.delete);

export default router;
