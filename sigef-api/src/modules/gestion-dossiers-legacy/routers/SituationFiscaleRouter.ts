import express from "express"

import SituationFiscaleController from "../controllers/SituationFiscaleController"

const router = express.Router()

router
    .get('/', SituationFiscaleController.getAllSituationsFiscales)
    .post('/', [], SituationFiscaleController.createSituationFiscale)
    .get('/statistics/count', [], SituationFiscaleController.getCount)
    .get('/:id', SituationFiscaleController.getSituationFiscale)
    .put('/:id', [], SituationFiscaleController.updateSituationFiscale)
    .delete('/:id', [], SituationFiscaleController.deleteSituationFiscale)

export default router