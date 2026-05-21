import express from "express"

import PersonneConjointeController from "../controllers/PersonneConjointeController"

const router = express.Router()

router
    .get('/', PersonneConjointeController.getAllPersonnesConjointes)
    .post('/', [], PersonneConjointeController.createPersonneConjointe)
    .get('/statistics/count', [], PersonneConjointeController.getCount)
    .get('/:id', PersonneConjointeController.getPersonneConjointe)
    .put('/:id', [], PersonneConjointeController.updatePersonneConjointe)
    .delete('/:id', [], PersonneConjointeController.deletePersonneConjointe)

export default router