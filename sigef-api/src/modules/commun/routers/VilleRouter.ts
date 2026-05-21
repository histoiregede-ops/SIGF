import express from "express"

import VilleController from "../controllers/VilleController"

const router = express.Router()

router
    .get('/', VilleController.getAllVilles)
    .post('/', [], VilleController.createVille)
    .get('/statistics/count', [], VilleController.getCount)
    .get('/:id', VilleController.getVille)
    .put('/:id', [], VilleController.updateVille)
    .delete('/:id', [], VilleController.deleteVille)

export default router