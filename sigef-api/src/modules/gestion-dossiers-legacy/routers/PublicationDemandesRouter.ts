import express from "express"

import PublicationDemandesController from "../controllers/PublicationDemandesController"

const router = express.Router()

router
    .get('/', PublicationDemandesController.getAllPublicationsDemandess)
    .post('/', [], PublicationDemandesController.createPublicationDemandes)
    .get('/statistics/count', [], PublicationDemandesController.getCount)
    .get('/:id', PublicationDemandesController.getPublicationDemandes)
    .put('/:id', [], PublicationDemandesController.updatePublicationDemandes)
    .delete('/:id', [], PublicationDemandesController.deletePublicationDemandes)

export default router