import express from "express"

import PersonneMoraleController from "../controllers/PersonneMoraleController"

const router = express.Router()

router
    .get('/', PersonneMoraleController.getAllPersonnesMorales)
    .post('/', [], PersonneMoraleController.createPersonneMorale)
    .get('/statistics/count', [], PersonneMoraleController.getCount)
    .get('/:id', PersonneMoraleController.getPersonneMorale)
    .put('/:id', [], PersonneMoraleController.updatePersonneMorale)
    .delete('/:id', [], PersonneMoraleController.deletePersonneMorale)

export default router