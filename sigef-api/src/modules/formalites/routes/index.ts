import { Router } from 'express';
import FormaliteController from '../controllers/FormaliteController';

const router = Router();

router.get('/', FormaliteController.getAll);
router.get('/:id', FormaliteController.getById);
router.post('/', FormaliteController.create);
router.put('/:id', FormaliteController.update);
router.delete('/:id', FormaliteController.delete);

export default router;
