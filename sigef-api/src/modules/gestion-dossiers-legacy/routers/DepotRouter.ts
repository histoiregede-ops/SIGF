import express from "express"

import DepotController from "../controllers/DepotController"

const router = express.Router()

router
    .get('/', DepotController.getAllDepots)
    .post('/', [], DepotController.createDepot)
    .get('/statistics/count', [], DepotController.getCount)
    .get('/:id', DepotController.getDepot)
    .put('/:id', [], DepotController.updateDepot)
    .delete('/:id', [], DepotController.deleteDepot)

export default router