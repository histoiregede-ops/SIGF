import express from "express"

import SituationProprieteController from "../controllers/SituationProprieteController"

const router = express.Router()

router
    .get('/', SituationProprieteController.getAllSituationsPropriete)
    .post('/', [], SituationProprieteController.createSituationPropriete)
    .get('/statistics/count', [], SituationProprieteController.getCount)
    .get('/:id', SituationProprieteController.getSituationPropriete)
    .put('/:id', [], SituationProprieteController.updateSituationPropriete)
    .delete('/:id', [], SituationProprieteController.deleteSituationPropriete)

export default router