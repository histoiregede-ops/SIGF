import express from "express"

import TypeOperationPostImmatriculationController from "../controllers/TypeOperationPostImmatriculationController";

const router = express.Router()

router
    .get('/', TypeOperationPostImmatriculationController.getAllTypesOperationPostImmatriculation)
    .post('/', [], TypeOperationPostImmatriculationController.createTypeOperationPostImmatriculation)
    .get('/statistics/count', [], TypeOperationPostImmatriculationController.getCount)
    .get('/:id', TypeOperationPostImmatriculationController.getTypeOperationPostImmatriculation)
    .put('/:id', [], TypeOperationPostImmatriculationController.updateTypeOperationPostImmatriculation)
    .delete('/:id', [], TypeOperationPostImmatriculationController.deleteTypeOperationPostImmatriculation)

export default router