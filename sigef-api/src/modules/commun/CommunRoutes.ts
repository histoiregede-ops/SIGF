require("./models/_associations")
import express from "express";
import Authenticate from "../../core/middlewares/Authenticate";
import PeriodeRouter from "./routers/PeriodeRouter";
import RegionRouter from "./routers/RegionRouter";
import PrefectureRouter from "./routers/PrefectureRouter";
import CommuneRouter from "./routers/CommuneRouter";
import CantonRouter from "./routers/CantonRouter";
import FormeJuridiqueRouter from "./routers/FormeJuridiqueRouter";
import QualiteDocumentRouter from "./routers/QualiteDocumentRouter";
import TypeRegistreRouter from "./routers/TypeRegistreRouter";
import QuartierRouter from "./routers/QuartierRouter";
import TypePersonneMoraleRouter from "./routers/TypePersonneMoraleRouter";
import TypeRelationLegaleRouter from "./routers/TypeRelationLegaleRouter";
import SecteurActiviteRouter from "./routers/SecteurActiviteRouter";
import PieceIdentiteRouter from "./routers/PieceIdentiteRouter";
import ProfessionRouter from "./routers/ProfessionRouter";
import NationaliteRouter from "./routers/NationaliteRouter";
import CiviliteRouter from "./routers/CiviliteRouter";
import TypeLienGroupeRouter from "./routers/TypeLienGroupeRouter";
import VillageRouter from "./routers/VillageRouter";
import VilleRouter from "./routers/VilleRouter";

const router = express.Router();

router
    .use('/typesRegistre', [Authenticate], TypeRegistreRouter)
    .use('/formesJuridiques', [Authenticate], FormeJuridiqueRouter)
    .use('/periodes', [Authenticate], PeriodeRouter)
    .use('/regions', [Authenticate], RegionRouter)
    .use('/prefectures', [Authenticate], PrefectureRouter)
    .use('/communes', [Authenticate], CommuneRouter)
    .use('/cantons', [Authenticate], CantonRouter)
    .use('/villes', [Authenticate], VilleRouter)
    .use('/villages', [Authenticate], VillageRouter)
    .use('/quartiers', [Authenticate], QuartierRouter)
    .use('/qualitesDocument', [Authenticate], QualiteDocumentRouter)
    .use('/typesPersonneMorale', [Authenticate], TypePersonneMoraleRouter)
    .use('/typesRelationLegale', [Authenticate], TypeRelationLegaleRouter)
    .use('/typesLienGroupe', [Authenticate], TypeLienGroupeRouter)
    .use('/civilites', [Authenticate], CiviliteRouter)
    .use('/nationalites', [Authenticate], NationaliteRouter)
    .use('/professions', [Authenticate], ProfessionRouter)
    .use('/secteursActivite', [Authenticate], SecteurActiviteRouter)
    .use('/piecesIdentite', [Authenticate], PieceIdentiteRouter)

export default router;