import express from "express"

import OppositionRequisitionController from "../controllers/OppositionRequisitionController";

const router = express.Router()

router
    .get('/', OppositionRequisitionController.getAllOppositionsRequisitions)
    .post('/', [], OppositionRequisitionController.createOppositionRequisition)
    .get('/statistics/count', [], OppositionRequisitionController.getCount)
    .get('/:id', OppositionRequisitionController.getOppositionRequisition)
    .put('/:id', [], OppositionRequisitionController.updateOppositionRequisition)
    .delete('/:id', [], OppositionRequisitionController.deleteOppositionRequisition)

export default router