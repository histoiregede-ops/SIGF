import express from "express"

import VillageController from "../controllers/VillageController"

const router = express.Router()

router
    .get('/', VillageController.getAllVillages)
    .post('/', [], VillageController.createVillage)
    .get('/statistics/count', [], VillageController.getCount)
    .get('/:id', VillageController.getVillage)
    .put('/:id', [], VillageController.updateVillage)
    .delete('/:id', [], VillageController.deleteVillage)

export default router