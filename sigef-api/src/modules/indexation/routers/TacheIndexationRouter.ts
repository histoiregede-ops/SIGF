import express from "express"

import TacheIndexationController from "../controllers/TacheIndexationController"

const router = express.Router()

router
    .get('/', TacheIndexationController.getAllTachesIndexation)
    .post('/', [], TacheIndexationController.createTacheIndexation)
    .get('/statistics/count', [], TacheIndexationController.getCount)
    .get('/:id', TacheIndexationController.getTacheIndexation)
    .put('/:id', [], TacheIndexationController.updateTacheIndexation)
    .delete('/:id', [], TacheIndexationController.deleteTacheIndexation)

export default router