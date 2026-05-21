import { Router } from 'express';
import Authenticate from '../../../core/middlewares/Authenticate';
import { validate } from '../../../core/middlewares/ValidationMiddleware';
import { createTitreFoncierSchema } from '../validators/titreFoncier.schemas';
import TitreFoncierController from '../controllers/TitreFoncierController';

const router = Router();

router.get('/', Authenticate, TitreFoncierController.getAll);
router.get('/:id', Authenticate, TitreFoncierController.getById);
router.post('/', Authenticate, validate(createTitreFoncierSchema), TitreFoncierController.create);

// update, delete...

export default router;

