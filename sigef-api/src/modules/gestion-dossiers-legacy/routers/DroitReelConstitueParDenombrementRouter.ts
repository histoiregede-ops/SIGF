import express from "express"

import DroitReelConstitueParDenombrementController from "../controllers/DroitReelConstitueParDenombrementController";

const router = express.Router()

router
    .get('/', DroitReelConstitueParDenombrementController.getAllDroitsReelsConstituesParDenombrement)
    .post('/', [], DroitReelConstitueParDenombrementController.createDroitReelConstitueParDenombrement)
    .get('/statistics/count', [], DroitReelConstitueParDenombrementController.getCount)
    .get('/:id', DroitReelConstitueParDenombrementController.getDroitReelConstitueParDenombrement)
    .put('/:id', [], DroitReelConstitueParDenombrementController.updateDroitReelConstitueParDenombrement)
    .delete('/:id', [], DroitReelConstitueParDenombrementController.deleteDroitReelConstitueParDenombrement)

export default router