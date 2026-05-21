import express from "express"

import PartiePrenanteController from "../controllers/PartiePrenanteController"

const router = express.Router()

router
    .get('/', PartiePrenanteController.getAllPartiesPrenantes)
    .post('/', [], PartiePrenanteController.createPartiePrenante)
    .get('/statistics/count', [], PartiePrenanteController.getCount)
    .get('/:id', PartiePrenanteController.getPartiePrenante)
    .put('/:id', [], PartiePrenanteController.updatePartiePrenante)
    .delete('/:id', [], PartiePrenanteController.deletePartiePrenante)

export default router