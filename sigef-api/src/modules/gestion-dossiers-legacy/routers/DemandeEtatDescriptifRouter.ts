import express from "express"

import DemandeEtatDescriptifController from "../controllers/DemandeEtatDescriptifController";

const router = express.Router()

router
    .get('/', DemandeEtatDescriptifController.getAllDemandesEtatsDescriptifs)
    .post('/', [], DemandeEtatDescriptifController.createDemandeEtatDescriptif)
    .get('/statistics/count', [], DemandeEtatDescriptifController.getCount)
    .get('/:id', DemandeEtatDescriptifController.getDemandeEtatDescriptif)
    .put('/:id', [], DemandeEtatDescriptifController.updateDemandeEtatDescriptif)
    .put('/:id/traitement', [], DemandeEtatDescriptifController.traiterDemandeEtatDescriptif)
    .delete('/:id', [], DemandeEtatDescriptifController.deleteDemandeEtatDescriptif)

export default router