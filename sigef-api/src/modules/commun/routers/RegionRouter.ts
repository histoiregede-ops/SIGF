import express from "express"

import RegionController from "../controllers/RegionController";

const router = express.Router()

router
    .get('/', RegionController.getAllRegions)
    .post('/', [], RegionController.createRegion)
    .get('/statistics/count', [], RegionController.getCount)
    .get('/:id', RegionController.getRegion)
    .put('/:id', [], RegionController.updateRegion)
    .delete('/:id', [], RegionController.deleteRegion)

export default router