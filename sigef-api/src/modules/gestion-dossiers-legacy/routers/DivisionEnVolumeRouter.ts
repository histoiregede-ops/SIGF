import express from "express"

import DivisionEnVolumeController from "../controllers/DivisionEnVolumeController"

const router = express.Router()

router
    .get('/', DivisionEnVolumeController.getAllDivisionsEnVolumes)
    .post('/', [], DivisionEnVolumeController.createDivisionEnVolume)
    .get('/statistics/count', [], DivisionEnVolumeController.getCount)
    .get('/:id', DivisionEnVolumeController.getDivisionEnVolume)
    .put('/:id', [], DivisionEnVolumeController.updateDivisionEnVolume)
    .delete('/:id', [], DivisionEnVolumeController.deleteDivisionEnVolume)

export default router