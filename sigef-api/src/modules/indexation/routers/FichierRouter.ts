import express from "express"

import FichierController from "../controllers/FichierController"

const router = express.Router()

router
    .get('/', FichierController.getAllFichiers)
    .post('/', FichierController.uploadSingleFichier(), FichierController.createFichier)
    .get('/statistics/count', [], FichierController.getCount)
    .get('/:id/contenu', FichierController.getFichierContenu)
    .get('/:id', FichierController.getFichier)
    .put('/:id/contenu', [FichierController.uploadFichier()], FichierController.updateFichierContenu)
    .put('/:id', [], FichierController.updateFichier)
    .delete('/:id', [], FichierController.deleteFichier)

export default router