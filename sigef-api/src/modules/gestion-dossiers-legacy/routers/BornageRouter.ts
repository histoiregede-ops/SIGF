import express from "express"

import BornageController from "../controllers/BornageController"

const router = express.Router()

router
    .get('/', BornageController.getAllBornages)
    .post('/', [], BornageController.createBornage)
    .get('/statistics/count', [], BornageController.getCount)
    .get('/:id', BornageController.getBornage)
    .put('/:id', [], BornageController.updateBornage)
    .delete('/:id', [], BornageController.deleteBornage)

export default router