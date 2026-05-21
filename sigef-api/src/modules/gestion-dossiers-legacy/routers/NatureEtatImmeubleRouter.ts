import express from "express"

import NatureEtatImmeubleController from "../controllers/NatureEtatImmeubleController";

const router = express.Router()

router
    .get('/', NatureEtatImmeubleController.getAllNaturesEtatsImmeuble)
    .post('/', [], NatureEtatImmeubleController.createNatureEtatImmeuble)
    .get('/statistics/count', [], NatureEtatImmeubleController.getCount)
    .get('/:id', NatureEtatImmeubleController.getNatureEtatImmeuble)
    .put('/:id', [], NatureEtatImmeubleController.updateNatureEtatImmeuble)
    .delete('/:id', [], NatureEtatImmeubleController.deleteNatureEtatImmeuble)

export default router