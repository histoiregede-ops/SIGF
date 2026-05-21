import express from "express"

import GroupePersonnePhysiqueController from "../controllers/GroupePersonnePhysiqueController";

const router = express.Router()

router
    .get('/', GroupePersonnePhysiqueController.getAllGroupesPersonnesPhysiques)
    .post('/', [], GroupePersonnePhysiqueController.createGroupePersonnePhysique)
    .get('/statistics/count', [], GroupePersonnePhysiqueController.getCount)
    .get('/:id', GroupePersonnePhysiqueController.getGroupePersonnePhysique)
    .put('/:id', [], GroupePersonnePhysiqueController.updateGroupePersonnePhysique)
    .delete('/:id', [], GroupePersonnePhysiqueController.deleteGroupePersonnePhysique)

export default router