import express from "express"

import PersonneMembreController from "../controllers/PersonneMembreController"

const router = express.Router()

router
    .get('/', PersonneMembreController.getAllPersonnesMembres)
    .post('/', [], PersonneMembreController.createPersonneMembre)
    .get('/statistics/count', [], PersonneMembreController.getCount)
    .get('/:id', PersonneMembreController.getPersonneMembre)
    .put('/:id', [], PersonneMembreController.updatePersonneMembre)
    .delete('/:id', [], PersonneMembreController.deletePersonneMembre)

export default router