import express from "express"

import IndexeurController from "../controllers/IndexeurController"

const router = express.Router()

router
    .get('/', IndexeurController.getAllIndexeurs)
    .get('/statistics/count', IndexeurController.getCount)
    .get('/:id', IndexeurController.getIndexeur)
    // .post('/', IndexeurController.registerIndexeur)
    .put('/:id', IndexeurController.updateIndexeur)
    .put('/:id/password', IndexeurController.updateMotDePasseIndexeur)
    .put('/:id/actif', IndexeurController.updateActifIndexeur)
    .delete('/:id', IndexeurController.deleteIndexeur)

export default router