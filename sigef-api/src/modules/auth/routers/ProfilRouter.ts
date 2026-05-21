import express from "express"

import ProfilController from "../controllers/ProfilController";

const router = express.Router()

router
    .get('/', ProfilController.getAllProfils)
    .post('/', [], ProfilController.createProfil)
    .get('/statistics/count', [], ProfilController.getCount)
    .get('/:id', ProfilController.getProfil)
    .put('/:id', [], ProfilController.updateProfil)
    .delete('/:id', [], ProfilController.deleteProfil)

export default router