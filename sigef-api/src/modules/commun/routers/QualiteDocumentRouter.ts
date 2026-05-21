import express from "express"

import QualiteDocumentController from "../controllers/QualiteDocumentController";

const router = express.Router()

router
    .get('/', QualiteDocumentController.getAllQualitesDocument)
    .post('/', [], QualiteDocumentController.createQualiteDocument)
    .get('/statistics/count', [], QualiteDocumentController.getCount)
    .get('/:id', QualiteDocumentController.getQualiteDocument)
    .put('/:id', [], QualiteDocumentController.updateQualiteDocument)
    .delete('/:id', [], QualiteDocumentController.deleteQualiteDocument)

export default router