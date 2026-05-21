import express from "express"

import FormalitePrealableController from "../controllers/FormalitePrealableController"

const router = express.Router()

router
    .get('/filter', FormalitePrealableController.filterAllFormalitesPrealables)
    .post('/filter', FormalitePrealableController.filterAllFormalitesPrealables)
    .get('/', FormalitePrealableController.getAllFormalitesPrealables)
    .post('/', [], FormalitePrealableController.createFormalitePrealable)
    .get('/requisition/:requisition', FormalitePrealableController.getFormalitePrealableParNumeroRequisition)
    .get('/statistics/count', [], FormalitePrealableController.getCount)
    .get('/:id', FormalitePrealableController.getFormalitePrealable)
    .put('/:id', [], FormalitePrealableController.updateFormalitePrealable)
    .delete('/:id', [], FormalitePrealableController.deleteFormalitePrealable)

export default router