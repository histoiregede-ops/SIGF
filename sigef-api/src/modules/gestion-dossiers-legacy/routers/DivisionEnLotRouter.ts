import express from "express"

import DivisionEnLotController from "../controllers/DivisionEnLotController"

const router = express.Router()

router
    .get('/', DivisionEnLotController.getAllDivisionsEnLots)
    .post('/', [], DivisionEnLotController.createDivisionEnLot)
    .get('/statistics/count', [], DivisionEnLotController.getCount)
    .get('/:id', DivisionEnLotController.getDivisionEnLot)
    .put('/:id', [], DivisionEnLotController.updateDivisionEnLot)
    .delete('/:id', [], DivisionEnLotController.deleteDivisionEnLot)

export default router