import express from "express"

import TypeRelationLegaleController from "../controllers/TypeRelationLegaleController";

const router = express.Router()

router
    .get('/', TypeRelationLegaleController.getAllTypesRelationLegale)
    .post('/', [], TypeRelationLegaleController.createTypeRelationLegale)
    .get('/statistics/count', [], TypeRelationLegaleController.getCount)
    .get('/:id', TypeRelationLegaleController.getTypeRelationLegale)
    .put('/:id', [], TypeRelationLegaleController.updateTypeRelationLegale)
    .delete('/:id', [], TypeRelationLegaleController.deleteTypeRelationLegale)

export default router