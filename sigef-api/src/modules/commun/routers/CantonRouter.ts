import express from "express"

import CantonController from "../controllers/CantonController"

const router = express.Router()

router
    .get('/', CantonController.getAllCantons)
    .post('/', [], CantonController.createCanton)
    .get('/statistics/count', [], CantonController.getCount)
    .get('/:id', CantonController.getCanton)
    .put('/:id', [], CantonController.updateCanton)
    .delete('/:id', [], CantonController.deleteCanton)

export default router