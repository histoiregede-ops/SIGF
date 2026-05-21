import express from "express"

import DirectionLimiteController from "../controllers/DirectionLimiteController";

const router = express.Router()

router
    .get('/', DirectionLimiteController.getAllDirectionsLimite)
    .post('/', [], DirectionLimiteController.createDirectionLimite)
    .get('/statistics/count', [], DirectionLimiteController.getCount)
    .get('/:id', DirectionLimiteController.getDirectionLimite)
    .put('/:id', [], DirectionLimiteController.updateDirectionLimite)
    .delete('/:id', [], DirectionLimiteController.deleteDirectionLimite)

export default router