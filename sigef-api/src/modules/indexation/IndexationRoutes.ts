require("./models/_associations")
import express from "express";
import Authenticate from "../../core/middlewares/Authenticate";
import DossierRouter from "./routers/DossierRouter";
import FichierRouter from "./routers/FichierRouter";
import TacheIndexationRouter from "./routers/TacheIndexationRouter";
import ProgressionTacheIndexationRouter from "./routers/ProgressionTacheIndexationRouter";
import DonneeIndexationRouter from "./routers/DonneeIndexationRouter";
import StatistiqueRouter from "./routers/StatistiqueRouter";

const router = express.Router();

router
    .use('/dossiers', [Authenticate], DossierRouter)
    .use('/fichiers', [Authenticate], FichierRouter)
    .use('/tachesIndexation', [Authenticate], TacheIndexationRouter)
    .use('/progressionsTachesIndexation', [Authenticate], ProgressionTacheIndexationRouter)
    .use('/donneesIndexation', [Authenticate], DonneeIndexationRouter)
    .use('/statistiques', [Authenticate], StatistiqueRouter)

export default router;