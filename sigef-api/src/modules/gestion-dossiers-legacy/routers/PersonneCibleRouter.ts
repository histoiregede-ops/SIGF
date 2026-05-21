import express from "express"

import PersonneCibleController from "../controllers/PersonneCibleController"

const router = express.Router()

router
    .get('/', PersonneCibleController.getAllPersonnesCibles)
    .post('/', [], PersonneCibleController.createPersonneCible)
    .get('/statistics/count', [], PersonneCibleController.getCount)
    .get('/:id', PersonneCibleController.getPersonneCible)
    .put('/:id', [], PersonneCibleController.updatePersonneCible)
    .delete('/:id', [], PersonneCibleController.deletePersonneCible)

export default router