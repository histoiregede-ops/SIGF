import express from "express"

import ControleurController from "../controllers/ControleurController"

const router = express.Router()

router
    .get('/', ControleurController.getAllControleurs)
    .get('/statistics/count', ControleurController.getCount)
    .get('/:id', ControleurController.getControleur)
    // .post('/', ControleurController.registerControleur)
    .put('/:id', ControleurController.updateControleur)
    .put('/:id/password', ControleurController.updateMotDePasseControleur)
    .put('/:id/actif', ControleurController.updateActifControleur)
    .delete('/:id', ControleurController.deleteControleur)

export default router