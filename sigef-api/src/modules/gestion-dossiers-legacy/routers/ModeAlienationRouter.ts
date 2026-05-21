import express from "express"

import ModeAlienationController from "../controllers/ModeAlienationController";

const router = express.Router()

router
    .get('/', ModeAlienationController.getAllModesAlienation)
    .post('/', [], ModeAlienationController.createModeAlienation)
    .get('/statistics/count', [], ModeAlienationController.getCount)
    .get('/:id', ModeAlienationController.getModeAlienation)
    .put('/:id', [], ModeAlienationController.updateModeAlienation)
    .delete('/:id', [], ModeAlienationController.deleteModeAlienation)

export default router