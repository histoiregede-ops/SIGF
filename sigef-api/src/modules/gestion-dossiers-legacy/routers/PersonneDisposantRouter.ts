import express from "express"

import PersonneDisposantController from "../controllers/PersonneDisposantController"

const router = express.Router()

router
    .get('/', PersonneDisposantController.getAllPersonnesDisposants)
    .post('/', [], PersonneDisposantController.createPersonneDisposant)
    .get('/statistics/count', [], PersonneDisposantController.getCount)
    .get('/:id', PersonneDisposantController.getPersonneDisposant)
    .put('/:id', [], PersonneDisposantController.updatePersonneDisposant)
    .delete('/:id', [], PersonneDisposantController.deletePersonneDisposant)

export default router