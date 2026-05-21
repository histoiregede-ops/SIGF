import express from "express"

import AugmentationController from "../controllers/AugmentationController"

const router = express.Router()

router
    .get('/', AugmentationController.getAllAugmentations)
    .post('/', [], AugmentationController.createAugmentation)
    .get('/statistics/count', [], AugmentationController.getCount)
    .get('/:id', AugmentationController.getAugmentation)
    .put('/:id', [], AugmentationController.updateAugmentation)
    .delete('/:id', [], AugmentationController.deleteAugmentation)

export default router