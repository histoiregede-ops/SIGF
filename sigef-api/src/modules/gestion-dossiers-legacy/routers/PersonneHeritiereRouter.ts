import express from "express"

import PersonneHeritiereController from "../controllers/PersonneHeritiereController"

const router = express.Router()

router
    .get('/', PersonneHeritiereController.getAllPersonnesHeritieres)
    .post('/', [], PersonneHeritiereController.createPersonneHeritiere)
    .get('/statistics/count', [], PersonneHeritiereController.getCount)
    .get('/:id', PersonneHeritiereController.getPersonneHeritiere)
    .put('/:id', [], PersonneHeritiereController.updatePersonneHeritiere)
    .delete('/:id', [], PersonneHeritiereController.deletePersonneHeritiere)

export default router