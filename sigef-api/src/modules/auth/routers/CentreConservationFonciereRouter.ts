import express from "express"

import CentreConservationFonciereController from "../controllers/CentreConservationFonciereController";

const router = express.Router()

router
    .get('/', CentreConservationFonciereController.getAllCentresConservationFonciere)
    .post('/', [], CentreConservationFonciereController.createCentreConservationFonciere)
    .get('/statistics/count', [], CentreConservationFonciereController.getCount)
    .get('/:id', CentreConservationFonciereController.getCentreConservationFonciere)
    .put('/:id', [], CentreConservationFonciereController.updateCentreConservationFonciere)
    .delete('/:id', [], CentreConservationFonciereController.deleteCentreConservationFonciere)

export default router