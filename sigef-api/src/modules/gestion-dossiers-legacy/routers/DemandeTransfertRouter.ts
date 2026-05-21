import express from "express"

import DemandeTransfertController from "../controllers/DemandeTransfertController";

const router = express.Router()

router
    .get('/', DemandeTransfertController.getAllDemandesTransferts)
    .post('/', [], DemandeTransfertController.createDemandeTransfert)
    .get('/statistics/count', [], DemandeTransfertController.getCount)
    .get('/:id', DemandeTransfertController.getDemandeTransfert)
    .put('/:id', [], DemandeTransfertController.updateDemandeTransfert)
    .put('/:id/traitement', [], DemandeTransfertController.traiterDemandeTransfert)
    .delete('/:id', [], DemandeTransfertController.deleteDemandeTransfert)

export default router