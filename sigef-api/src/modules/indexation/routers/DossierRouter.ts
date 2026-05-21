import express from "express"

import DossierController from "../controllers/DossierController"

const router = express.Router()

router
    .get('/', DossierController.getAllDossiers)
    .get('/formalites', async (req, res) => {
        req.query.typeRegistreId = "formalites";
        await DossierController.getAllDossiers(req, res);
    })
    .get('/depots', async (req, res) => {
        req.query.typeRegistreId = "depots";
        await DossierController.getAllDossiers(req, res);
    })
    .get('/titres-fonciers', async (req, res) => {
        req.query.typeRegistreId = "titres-fonciers";
        await DossierController.getAllDossiers(req, res);
    })
    .get('/oppositions', async (req, res) => {
        req.query.typeRegistreId = "oppositions";
        await DossierController.getAllDossiers(req, res);
    })
    .get('/:typeRegistreId', async (req, res) => {
        req.query.typeRegistreId = req.params.typeRegistreId;
        await DossierController.getAllDossiers(req, res);
    })
    .post('/', [], DossierController.createDossier)
    .get('/statistics/count', [], DossierController.getCount)
    .get('/:id', DossierController.getDossier)
    .put('/:id', [], DossierController.updateDossier)
    .delete('/:id', [], DossierController.deleteDossier)

export default router
