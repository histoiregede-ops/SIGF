import express from "express"
import NationaliteController from "../controllers/NationaliteController"

const router = express.Router()

router
    .get('/', NationaliteController.getAllNationalites)
    .post('/', [], NationaliteController.createNationalite)
    .get('/statistics/count', [], NationaliteController.getCount)
    .get('/:id', NationaliteController.getNationalite)
    .put('/:id', [], NationaliteController.updateNationalite)
    .delete('/:id', [], NationaliteController.deleteNationalite)

export default router