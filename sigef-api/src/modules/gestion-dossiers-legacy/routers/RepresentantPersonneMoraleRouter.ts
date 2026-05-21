import express from "express"

import RepresentantPersonneMoraleController from "../controllers/RepresentantPersonneMoraleController"

const router = express.Router()

router
    .get('/', RepresentantPersonneMoraleController.getAllRepresentantsPersonneMorale)
    .post('/', [], RepresentantPersonneMoraleController.createRepresentantPersonneMorale)
    .get('/statistics/count', [], RepresentantPersonneMoraleController.getCount)
    .get('/:id', RepresentantPersonneMoraleController.getRepresentantPersonneMorale)
    .put('/:id', [], RepresentantPersonneMoraleController.updateRepresentantPersonneMorale)
    .delete('/:id', [], RepresentantPersonneMoraleController.deleteRepresentantPersonneMorale)

export default router