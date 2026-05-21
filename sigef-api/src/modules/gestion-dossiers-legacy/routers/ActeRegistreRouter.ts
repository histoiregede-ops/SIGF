import express from "express"

import ActeRegistreController from "../controllers/ActeRegistreController"

const router = express.Router()

router
    .get('/', ActeRegistreController.getAllActesRegistres)
    // .post('/', [], ActeRegistreController.createActeRegistre)
    .get('/statistics/count', [], ActeRegistreController.getCount)
    // .get('/:id', ActeRegistreController.getActeRegistre)
    // .put('/:id', [], ActeRegistreController.updateActeRegistre)
    // .delete('/:id', [], ActeRegistreController.deleteActeRegistre)

export default router