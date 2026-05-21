import express from "express"

import PeriodeController from "../controllers/PeriodeController";

const router = express.Router()

router
    .get('/', PeriodeController.getAllPeriodes)
    .post('/', [], PeriodeController.createPeriode)
    .get('/statistics/count', [], PeriodeController.getCount)
    .get('/:id', PeriodeController.getPeriode)
    .put('/:id', [], PeriodeController.updatePeriode)
    .delete('/:id', [], PeriodeController.deletePeriode)

export default router