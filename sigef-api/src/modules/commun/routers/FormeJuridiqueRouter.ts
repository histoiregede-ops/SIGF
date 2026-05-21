import express from "express"

import FormeJuridiqueController from "../controllers/FormeJuridiqueController";

const router = express.Router()

router
    .get('/', FormeJuridiqueController.getAllFormesJuridiques)
    .post('/', [], FormeJuridiqueController.createFormeJuridique)
    .get('/statistics/count', [], FormeJuridiqueController.getCount)
    .get('/:id', FormeJuridiqueController.getFormeJuridique)
    .put('/:id', [], FormeJuridiqueController.updateFormeJuridique)
    .delete('/:id', [], FormeJuridiqueController.deleteFormeJuridique)

export default router