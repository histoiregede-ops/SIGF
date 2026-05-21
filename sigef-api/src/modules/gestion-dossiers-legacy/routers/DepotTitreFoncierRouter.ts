import express from "express"

import DepotTitreFoncierController from "../controllers/DepotTitreFoncierController";

const router = express.Router()

router
    .get('/', DepotTitreFoncierController.getAllDepotsTitresFonciers)
    .post('/', [], DepotTitreFoncierController.createDepotTitreFoncier)
    .get('/statistics/count', [], DepotTitreFoncierController.getCount)
    .get('/:id', DepotTitreFoncierController.getDepotTitreFoncier)
    .put('/:id', [], DepotTitreFoncierController.updateDepotTitreFoncier)
    .delete('/:id', [], DepotTitreFoncierController.deleteDepotTitreFoncier)

export default router