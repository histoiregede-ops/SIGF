import express from "express"

import LimiteController from "../controllers/LimiteController"

const router = express.Router()

router
    .get('/', LimiteController.getAllLimites)
    .post('/', [], LimiteController.createLimite)
    .get('/statistics/count', [], LimiteController.getCount)
    .get('/:id', LimiteController.getLimite)
    .put('/:id', [], LimiteController.updateLimite)
    .delete('/:id', [], LimiteController.deleteLimite)

export default router