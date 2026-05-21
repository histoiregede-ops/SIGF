require("./models/_associations")
import express from "express";
import AuthRouter from "./routers/AuthRouter";
import UtilisateurRouter from "./routers/UtilisateurRouter";
import Authenticate from "../../core/middlewares/Authenticate";
import IndexeurRouter from "./routers/IndexeurRouter";
import ControleurRouter from "./routers/ControleurRouter";
import RoleRouter from "./routers/RoleRouter";
import ProfilRouter from "./routers/ProfilRouter";
import CentreConservationFonciereRouter from "./routers/CentreConservationFonciereRouter";

const router = express.Router();

router
    .use('/', AuthRouter)
    .use('/utilisateurs', [Authenticate], UtilisateurRouter)
    .use('/indexeurs', [Authenticate], IndexeurRouter)
    .use('/controleurs', [Authenticate], ControleurRouter)
    .use('/roles', [Authenticate], RoleRouter)
    .use('/profils', [Authenticate], ProfilRouter)
    .use('/centresConservationFonciere', [Authenticate], CentreConservationFonciereRouter)

export default router;