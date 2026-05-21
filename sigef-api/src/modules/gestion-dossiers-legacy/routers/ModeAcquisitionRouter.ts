import express from "express"

import ModeAcquisitionController from "../controllers/ModeAcquisitionController";

const router = express.Router()

router
    .get('/', ModeAcquisitionController.getAllModesAcquisition)
    .post('/', [], ModeAcquisitionController.createModeAcquisition)
    .get('/statistics/count', [], ModeAcquisitionController.getCount)
    .get('/:id', ModeAcquisitionController.getModeAcquisition)
    .put('/:id', [], ModeAcquisitionController.updateModeAcquisition)
    .delete('/:id', [], ModeAcquisitionController.deleteModeAcquisition)

export default router