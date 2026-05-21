import { Router } from 'express';
import TitreFoncierController from './controllers/TitreFoncierController';

const router = Router();

/**
 * Routes pour le module Titres Fonciers
 * 
 * Note : L'ordre des routes est crucial. 
 * Les routes statiques (comme /statistics/count) doivent être déclarées 
 * AVANT les routes avec paramètres dynamiques (comme /:id) pour éviter les collisions.
 */

// @route   GET /api/v1/titres-fonciers/statistics/count
router.get('/statistics/count', TitreFoncierController.count);

// @route   GET /api/v1/titres-fonciers/numero/:numero
router.get('/numero/:numero', TitreFoncierController.getByNumero);

// @route   GET /api/v1/titres-fonciers/
router.get('/', TitreFoncierController.getAll);

// @route   POST /api/v1/titres-fonciers/
router.post('/', TitreFoncierController.create);

// @route   PUT /api/v1/titres-fonciers/:id
router.put('/:id', TitreFoncierController.update);

// @route   DELETE /api/v1/titres-fonciers/:id
router.delete('/:id', TitreFoncierController.delete);

// @route   GET /api/v1/titres-fonciers/:id
router.get('/:id', TitreFoncierController.getById);

export default router;