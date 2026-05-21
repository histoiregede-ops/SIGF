import express from "express"

import PrefectureController from "../controllers/PrefectureController"

const router = express.Router()

router
    .get('/', PrefectureController.getAllPrefectures)
    .post('/', [], PrefectureController.createPrefecture)
    .get('/statistics/count', [], PrefectureController.getCount)
    .get('/:id', PrefectureController.getPrefecture)
    .put('/:id', [], PrefectureController.updatePrefecture)
    .delete('/:id', [], PrefectureController.deletePrefecture)

export default router