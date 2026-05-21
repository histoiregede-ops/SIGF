import express from "express"

import DossierRegistreController from "../controllers/DossierRegistreController"

const router = express.Router()

router
    .get('/', DossierRegistreController.getAllDossiersRegistres)
    .post('/', [], DossierRegistreController.createDossierRegistre)
    .get('/statistics/count', [], DossierRegistreController.getCount)
    .get('/:id', DossierRegistreController.getDossierRegistre)
    // .get('/prochainFolio/:dossierRegistreId', DossierRegistreController.getProchainFolioDossierRegistre)
    // .get('/prochainNumeroOrdre/:dossierRegistreId', DossierRegistreController.getProchainNumeroOrdreDossierRegistre)
    .put('/:id', [], DossierRegistreController.updateDossierRegistre)
    .delete('/:id', [], DossierRegistreController.deleteDossierRegistre)

export default router