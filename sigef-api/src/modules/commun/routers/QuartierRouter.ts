import express from "express"

import QuartierController from "../controllers/QuartierController"

const router = express.Router()

router
    .get('/', QuartierController.getAllQuartiers)
    .post('/', [], QuartierController.createQuartier)
    .get('/statistics/count', [], QuartierController.getCount)
    .get('/:id', QuartierController.getQuartier)
    .put('/:id', [], QuartierController.updateQuartier)
    .delete('/:id', [], QuartierController.deleteQuartier)

export default router