import express from "express"

import OppositionController from "../controllers/OppositionController"

const router = express.Router()

router
    .get('/', OppositionController.getAllOppositions)
    .post('/', [], OppositionController.createOpposition)
    .get('/statistics/count', [], OppositionController.getCount)
    .get('/:id', OppositionController.getOpposition)
    .put('/:id', [], OppositionController.updateOpposition)
    .delete('/:id', [], OppositionController.deleteOpposition)

export default router