import { Utilisateur } from "../../auth/models/Utilisateur";
import { InformationsPropriete } from "./InformationsPropriete";
import { SituationPropriete } from "./SituationPropriete";
import { PublicationDemandes } from "./PublicationDemandes";
import { Bornage } from "./Bornage";
import { ProcedureJudiciaire } from "./ProcedureJudiciaire";
import { PartiePrenante } from "./PartiePrenante";
import { StatutsFormalitePrealable } from "../../../enums/StatutsFormalitePrealable";
import { PieceDeposee } from "./PieceDeposee";
import { DonneeIndexation } from "../../indexation/models/DonneeIndexation";
import { ActeRegistre } from "./ActeRegistre";

export class FormalitePrealable {
  declare id?: string
  declare numeroRequisition?: number
  declare statut?: StatutsFormalitePrealable
  declare informationsStatut?: string
  declare dateDeDepot?: Date
  declare dateForclusion?: Date
  declare nombrePiecesJointes?: Date
  declare dateSommationDepotDePieces?: Date
  declare dateDepotDepotDePieces?: Date
  declare nombreCopiesTitresFonciersEtablies?: number
  declare nombreCertificatsInscriptionEtablis?: number
  declare dateRemisePieces?: Date
  declare utilisateurId?: Utilisateur['id']
  declare utilisateur?: Utilisateur
  declare acteRegistreId?: ActeRegistre['id']
  declare acteRegistre?: ActeRegistre

  declare partiesPrenantes?: PartiePrenante[]
  declare informationsPropriete?: InformationsPropriete
  declare situationPropriete?: SituationPropriete
  declare publicationDemandes?: PublicationDemandes
  declare bornage?: Bornage
  declare procedureJudiciaire?: ProcedureJudiciaire
  declare piecesDeposees?: PieceDeposee[]

  declare donneeIndexation?: DonneeIndexation

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}