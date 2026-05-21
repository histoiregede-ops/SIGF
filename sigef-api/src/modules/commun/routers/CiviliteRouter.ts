import express from "express"
import CiviliteController from "../controllers/CiviliteController"

const router = express.Router()

router
    .get('/', CiviliteController.getAllCivilites)
    .post('/', [], CiviliteController.createCivilite)
    .get('/statistics/count', [], CiviliteController.getCount)
    .get('/:id', CiviliteController.getCivilite)
    .put('/:id', [], CiviliteController.updateCivilite)
    .delete('/:id', [], CiviliteController.deleteCivilite)

export default router