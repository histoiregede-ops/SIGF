require("./models/_associations")
import express from "express";
import Authenticate from "../../core/middlewares/Authenticate";
import FormalitePrealableRouter from "./routers/FormalitePrealableRouter";
import BornageRouter from "./routers/BornageRouter";
import InformationsProprieteRouter from "./routers/InformationsProprieteRouter";
import PartiePrenanteRouter from "./routers/PartiePrenanteRouter";
import PersonneMoraleRouter from "./routers/PersonneMoraleRouter";
import PersonnePhysiqueRouter from "./routers/PersonnePhysiqueRouter";
import PersonneRelationLegaleRouter from "./routers/PersonneRelationLegaleRouter";
import ProcedureJudiciaireRouter from "./routers/ProcedureJudiciaireRouter";
import PublicationDemandesRouter from "./routers/PublicationDemandesRouter";
import SituationProprieteRouter from "./routers/SituationProprieteRouter";
import OppositionRouter from "./routers/OppositionRouter";
import PieceDeposeeRouter from "./routers/PieceDeposeeRouter";
import DepotRouter from "./routers/DepotRouter";
import TypeDepotRouter from "./routers/TypeDepotRouter";
import TypeOperationPostImmatriculationRouter from "./routers/TypeOperationPostImmatriculationRouter";
import DepotTitreFoncierRouter from "./routers/DepotTitreFoncierRouter";
import OppositionRequisitionRouter from "./routers/OppositionRequisitionRouter";
import DirectionLimiteRouter from "./routers/DirectionLimiteRouter";
import AugmentationRouter from "./routers/AugmentationRouter";
import DiminutionRouter from "./routers/DiminutionRouter";
import CauseIndisponibliteRouter from "./routers/CauseIndisponibliteRouter";
import MutationRouter from "./routers/MutationRouter";
import DroitReelConstitueParDenombrementRouter from "./routers/DroitReelConstitueParDenombrementRouter";
import LimiteRouter from "./routers/LimiteRouter";
import PrivilegeHypothequeRouter from "./routers/PrivilegeHypothequeRouter";
import OppositionCasInscriptionDiffereeRouter from "./routers/OppositionCasInscriptionDiffereeRouter";
import TitreFoncierRouter from "./routers/TitreFoncierRouter";
import ModeAcquisitionRouter from "./routers/ModeAcquisitionRouter";
import ModeAlienationRouter from "./routers/ModeAlienationRouter";
import GroupePersonnePhysiqueRouter from "./routers/GroupePersonnePhysiqueRouter";
import GroupeHeritiersRouter from "./routers/GroupeHeritiersRouter";
import GroupeConjointsRouter from "./routers/GroupeConjointsRouter";
import ConjointPersonneDisposantRouter from "./routers/ConjointPersonneDisposantRouter";
import PersonneCibleRouter from "./routers/PersonneCibleRouter";
import PersonneMembreRouter from "./routers/PersonneMembreRouter";
import PersonneConjointeRouter from "./routers/PersonneConjointeRouter";
import PersonneDisposantRouter from "./routers/PersonneDisposantRouter";
import PersonneHeritiereRouter from "./routers/PersonneHeritiereRouter";
import RepresentantPersonnePhysiqueRouter from "./routers/RepresentantPersonnePhysiqueRouter";
import RepresentantPersonneMoraleRouter from "./routers/RepresentantPersonneMoraleRouter";
import NatureEtatImmeubleRouter from "./routers/NatureEtatImmeubleRouter";
import NatureTypeImmeubleRouter from "./routers/NatureTypeImmeubleRouter";
import DivisionEnVolumeRouter from "./routers/DivisionEnVolumeRouter";
import SituationFiscaleRouter from "./routers/SituationFiscaleRouter";
import DivisionEnLotRouter from "./routers/DivisionEnLotRouter";
import DossierRouter from "./routers/DossierRegistreRouter";
import DemandeTransfertRouter from "./routers/DemandeTransfertRouter";
import { ActeRegistre } from "./models/ActeRegistre";
import ActeRegistreRouter from "./routers/ActeRegistreRouter";
import DemandeEtatDescriptifRouter from "./routers/DemandeEtatDescriptifRouter";
import BordereauAnalytiqueRouter from "./routers/BordereauAnalytiqueRouter";
import RequisitionRouter from "./routers/RequisitionRouter";

const router = express.Router();

router
    .use('/formalites', [Authenticate], FormalitePrealableRouter)
    .use('/informationsPropriete', [Authenticate], InformationsProprieteRouter)
    .use('/naturesEtatImmeuble', [Authenticate], NatureEtatImmeubleRouter)
    .use('/naturesTypeImmeuble', [Authenticate], NatureTypeImmeubleRouter)
    .use('/situationsPropriete', [Authenticate], SituationProprieteRouter)
    .use('/publicationsDemandes', [Authenticate], PublicationDemandesRouter)
    .use('/bornages', [Authenticate], BornageRouter)
    .use('/proceduresJudiciaires', [Authenticate], ProcedureJudiciaireRouter)
    
    .use('/partiesPrenantes', [Authenticate], PartiePrenanteRouter)
    .use('/personnesPhysiques', [Authenticate], PersonnePhysiqueRouter)
    .use('/personnesMorales', [Authenticate], PersonneMoraleRouter)
    .use('/personnesRelationLegale', [Authenticate], PersonneRelationLegaleRouter)
    .use('/conjointsPersonneDisposant', [Authenticate], ConjointPersonneDisposantRouter)
    .use('/groupesConjoints', [Authenticate], GroupeConjointsRouter)
    .use('/groupesHeritiers', [Authenticate], GroupeHeritiersRouter)
    .use('/groupesPersonnesPhysiques', [Authenticate], GroupePersonnePhysiqueRouter)
    .use('/personnesCibles', [Authenticate], PersonneCibleRouter)
    .use('/personnesMembres', [Authenticate], PersonneMembreRouter)
    .use('/personnesConjointes', [Authenticate], PersonneConjointeRouter)
    .use('/personnesDisposants', [Authenticate], PersonneDisposantRouter)
    .use('/personnesHeritieres', [Authenticate], PersonneHeritiereRouter)
    .use('/representantsPersonnePhysique', [Authenticate], RepresentantPersonnePhysiqueRouter)
    .use('/representantsPersonneMorale', [Authenticate], RepresentantPersonneMoraleRouter)
    
    .use('/oppositions', [Authenticate], OppositionRouter)
    .use('/oppositionsRequisitions', [Authenticate], OppositionRequisitionRouter)
    .use('/piecesDeposees', [Authenticate], PieceDeposeeRouter)

    .use('/depots', [Authenticate], DepotRouter)
    .use('/typesDepot', [Authenticate], TypeDepotRouter)
    .use('/typesOperationPostImmatriculation', [Authenticate], TypeOperationPostImmatriculationRouter)
    
    .use('/titresFonciers', [Authenticate], TitreFoncierRouter)
    .use('/depotsTitresFonciers', [Authenticate], DepotTitreFoncierRouter)
    .use('/directionsLimite', [Authenticate], DirectionLimiteRouter)
    .use('/limites', [Authenticate], LimiteRouter)
    .use('/augmentations', [Authenticate], AugmentationRouter)
    .use('/diminutions', [Authenticate], DiminutionRouter)
    .use('/causesIndisponibilite', [Authenticate], CauseIndisponibliteRouter)
    .use('/droitsReelsConstituesParDenombrement', [Authenticate], DroitReelConstitueParDenombrementRouter)
    .use('/privilegesHypotheques', [Authenticate], PrivilegeHypothequeRouter)
    .use('/oppositionsCasInscriptionDifferee', [Authenticate], OppositionCasInscriptionDiffereeRouter)
    .use('/mutations', [Authenticate], MutationRouter)
    .use('/modesAcquisition', [Authenticate], ModeAcquisitionRouter)
    .use('/modesAlienation', [Authenticate], ModeAlienationRouter)
    .use('/situationsFiscales', [Authenticate], SituationFiscaleRouter)
    .use('/divisionsEnVolumes', [Authenticate], DivisionEnVolumeRouter)
    .use('/divisionsEnLots', [Authenticate], DivisionEnLotRouter)

    .use('/dossiersRegistres', [Authenticate], DossierRouter)
    .use('/actesRegistres', [Authenticate], ActeRegistreRouter)
    .use('/demandesTransferts', [Authenticate], DemandeTransfertRouter)
    .use('/demandesEtatsDescriptifs', [Authenticate], DemandeEtatDescriptifRouter)
    .use('/bordereaux-analytiques', [Authenticate], BordereauAnalytiqueRouter)
    .use('/requisitions', [Authenticate], RequisitionRouter)

export default router;