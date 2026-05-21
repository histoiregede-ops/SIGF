import express from "express"

import ConjointPersonneDisposantController from "../controllers/ConjointPersonneDisposantController";

const router = express.Router()

router
    .get('/', ConjointPersonneDisposantController.getAllConjointsPersonneDisposant)
    .post('/', [], ConjointPersonneDisposantController.createConjointPersonneDisposant)
    .get('/statistics/count', [], ConjointPersonneDisposantController.getCount)
    .get('/:id', ConjointPersonneDisposantController.getConjointPersonneDisposant)
    .put('/:id', [], ConjointPersonneDisposantController.updateConjointPersonneDisposant)
    .delete('/:id', [], ConjointPersonneDisposantController.deleteConjointPersonneDisposant)

export default router