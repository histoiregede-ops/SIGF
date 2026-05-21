import express from "express"

import PersonneRelationLegaleController from "../controllers/PersonneRelationLegaleController"

const router = express.Router()

router
    .get('/', PersonneRelationLegaleController.getAllPersonnesRelationLegale)
    .post('/', [], PersonneRelationLegaleController.createPersonneRelationLegale)
    .get('/statistics/count', [], PersonneRelationLegaleController.getCount)
    .get('/:id', PersonneRelationLegaleController.getPersonneRelationLegale)
    .put('/:id', [], PersonneRelationLegaleController.updatePersonneRelationLegale)
    .delete('/:id', [], PersonneRelationLegaleController.deletePersonneRelationLegale)

export default router