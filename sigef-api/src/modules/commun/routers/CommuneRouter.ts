import express from "express"

import CommuneController from "../controllers/CommuneController"

const router = express.Router()

router
    .get('/', CommuneController.getAllCommunes)
    .post('/', [], CommuneController.createCommune)
    .get('/statistics/count', [], CommuneController.getCount)
    .get('/:id', CommuneController.getCommune)
    .put('/:id', [], CommuneController.updateCommune)
    .delete('/:id', [], CommuneController.deleteCommune)

export default router