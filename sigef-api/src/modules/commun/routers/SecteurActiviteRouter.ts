import express from "express"

import SecteurActiviteController from "../controllers/SecteurActiviteController";

const router = express.Router()

router
    .get('/', SecteurActiviteController.getAllSecteursActivite)
    .post('/', [], SecteurActiviteController.createSecteurActivite)
    .get('/statistics/count', [], SecteurActiviteController.getCount)
    .get('/:id', SecteurActiviteController.getSecteurActivite)
    .put('/:id', [], SecteurActiviteController.updateSecteurActivite)
    .delete('/:id', [], SecteurActiviteController.deleteSecteurActivite)

export default router