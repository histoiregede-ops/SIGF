import express from "express"

import PersonnePhysiqueController from "../controllers/PersonnePhysiqueController"

const router = express.Router()

router
    .get('/', PersonnePhysiqueController.getAllPersonnesPhysiques)
    .post('/', [], PersonnePhysiqueController.createPersonnePhysique)
    .get('/statistics/count', [], PersonnePhysiqueController.getCount)
    .get('/:id', PersonnePhysiqueController.getPersonnePhysique)
    .put('/:id', [], PersonnePhysiqueController.updatePersonnePhysique)
    .delete('/:id', [], PersonnePhysiqueController.deletePersonnePhysique)

export default router