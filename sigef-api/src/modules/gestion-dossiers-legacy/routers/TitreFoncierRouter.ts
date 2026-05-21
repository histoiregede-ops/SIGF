import express from "express"

import TitreFoncierController from "../controllers/TitreFoncierController"

const router = express.Router()

router
    .get('/', TitreFoncierController.getAllTitresFonciers)
    .post('/', [], TitreFoncierController.createTitreFoncier)
    .get('/numeroTitreFoncier/:numeroTitreFoncier', TitreFoncierController.getTitreFoncierParNumeroTitreFoncier)
    .get('/statistics/count', [], TitreFoncierController.getCount)
    .get('/:id', TitreFoncierController.getTitreFoncier)
    // .get('/prochainNumeroTitreFoncier/:regionId', TitreFoncierController.getProchainNumeroTitreFoncier)
    .put('/:id', [], TitreFoncierController.updateTitreFoncier)
    .delete('/:id', [], TitreFoncierController.deleteTitreFoncier)

export default router