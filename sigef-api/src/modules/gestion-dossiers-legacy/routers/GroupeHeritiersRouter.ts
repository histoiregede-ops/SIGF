import express from "express"

import GroupeHeritiersController from "../controllers/GroupeHeritiersController";

const router = express.Router()

router
    .get('/', GroupeHeritiersController.getAllGroupesHeritiers)
    .post('/', [], GroupeHeritiersController.createGroupeHeritiers)
    .get('/statistics/count', [], GroupeHeritiersController.getCount)
    .get('/:id', GroupeHeritiersController.getGroupeHeritiers)
    .put('/:id', [], GroupeHeritiersController.updateGroupeHeritiers)
    .delete('/:id', [], GroupeHeritiersController.deleteGroupeHeritiers)

export default router