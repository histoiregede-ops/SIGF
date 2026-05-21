import express from "express"

import InformationsProprieteController from "../controllers/InformationsProprieteController"

const router = express.Router()

router
    .get('/', InformationsProprieteController.getAllInformationsProprietes)
    .post('/', [], InformationsProprieteController.createInformationsPropriete)
    .get('/statistics/count', [], InformationsProprieteController.getCount)
    .get('/:id', InformationsProprieteController.getInformationsPropriete)
    .put('/:id', [], InformationsProprieteController.updateInformationsPropriete)
    .delete('/:id', [], InformationsProprieteController.deleteInformationsPropriete)

export default router