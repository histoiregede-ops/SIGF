import express from "express"

import TypePersonneMoraleController from "../controllers/TypePersonneMoraleController";

const router = express.Router()

router
    .get('/', TypePersonneMoraleController.getAllTypesPersonneMorale)
    .post('/', [], TypePersonneMoraleController.createTypePersonneMorale)
    .get('/statistics/count', [], TypePersonneMoraleController.getCount)
    .get('/:id', TypePersonneMoraleController.getTypePersonneMorale)
    .put('/:id', [], TypePersonneMoraleController.updateTypePersonneMorale)
    .delete('/:id', [], TypePersonneMoraleController.deleteTypePersonneMorale)

export default router