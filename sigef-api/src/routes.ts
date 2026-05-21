import express, { Request, Response } from "express";
import AuthRoutes from "./modules/auth/AuthRoutes";
import titreFoncierRoutes from "./modules/titres-fonciers/routes";
import IndexationRoutes from "./modules/indexation/IndexationRoutes";
import CommunRoutes from "./modules/commun/CommunRoutes";
import oppositionRoutes from "./modules/oppositions/routes";
import formaliteRoutes from "./modules/formalites/routes";
import depotRoutes from "./modules/depots/routes";
import gestionDossiersRoutes from "./modules/gestion-dossiers-legacy/GestionDossiersRoutes";

const router = express.Router();

router
    .get('', async (req: Request, res: Response) => {
        res.json({ success: true, message: "SIGEF API v1 is running", timestamp: new Date() });
    })
    .use('/auth', AuthRoutes)
    .use('/titres-fonciers', titreFoncierRoutes)
    .use('/indexation', IndexationRoutes)
    .use('/commun', CommunRoutes)
    .use('/dossiers', gestionDossiersRoutes)
    .use('/oppositions', oppositionRoutes)
    .use('/formalites', formaliteRoutes)
    .use('/depots', depotRoutes)
    .all('*', (req: Request, res: Response) => {
        res.status(404).json({
            success: false,
            message: `Ressource non trouvée : ${req.method} ${req.originalUrl}`
        });
    });

export default router;