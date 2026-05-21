import express from "express"

import DiminutionController from "../controllers/DiminutionController"

const router = express.Router()

router
    .get('/', DiminutionController.getAllDiminutions)
    .post('/', [], DiminutionController.createDiminution)
    .get('/statistics/count', [], DiminutionController.getCount)
    .get('/:id', DiminutionController.getDiminution)
    .put('/:id', [], DiminutionController.updateDiminution)
    .delete('/:id', [], DiminutionController.deleteDiminution)

export default router