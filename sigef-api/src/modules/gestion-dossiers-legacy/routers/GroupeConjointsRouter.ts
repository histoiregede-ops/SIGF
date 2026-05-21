import express from "express"

import GroupeConjointsController from "../controllers/GroupeConjointsController";

const router = express.Router()

router
    .get('/', GroupeConjointsController.getAllGroupesConjoints)
    .post('/', [], GroupeConjointsController.createGroupeConjoints)
    .get('/statistics/count', [], GroupeConjointsController.getCount)
    .get('/:id', GroupeConjointsController.getGroupeConjoints)
    .put('/:id', [], GroupeConjointsController.updateGroupeConjoints)
    .delete('/:id', [], GroupeConjointsController.deleteGroupeConjoints)

export default router