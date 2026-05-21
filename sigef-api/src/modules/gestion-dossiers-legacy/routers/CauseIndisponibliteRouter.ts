import express from "express"

import CauseIndisponibiliteController from "../controllers/CauseIndisponibiliteController";

const router = express.Router()

router
    .get('/', CauseIndisponibiliteController.getAllCausesIndisponibilite)
    .post('/', [], CauseIndisponibiliteController.createCauseIndisponibilite)
    .get('/statistics/count', [], CauseIndisponibiliteController.getCount)
    .get('/:id', CauseIndisponibiliteController.getCauseIndisponibilite)
    .put('/:id', [], CauseIndisponibiliteController.updateCauseIndisponibilite)
    .delete('/:id', [], CauseIndisponibiliteController.deleteCauseIndisponibilite)

export default router