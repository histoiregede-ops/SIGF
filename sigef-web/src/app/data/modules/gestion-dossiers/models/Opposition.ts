import { FormalitePrealable } from "./FormalitePrealable";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { PartiePrenante } from "./PartiePrenante";
import { PieceDeposee } from "./PieceDeposee";
import { OppositionRequisition } from "./OppositionRequisition";
import { StatutsOpposition } from "../../../enums/StatutsOpposition";
import { DonneeIndexation } from "../../indexation/models/DonneeIndexation";
import { ActeRegistre } from "./ActeRegistre";

export class Opposition {
  declare id?: string
  declare description?: string
  declare statut?: StatutsOpposition
  declare informationsStatut?: string
  declare designationDroitReel?: string
  declare nombrePiecesDeposees?: number
  declare dateOpposition?: Date
  declare utilisateurId?: Utilisateur['id']
  declare utilisateur?: Utilisateur
  declare formalitePrealableId?: FormalitePrealable['id']
  declare formalitePrealable?: FormalitePrealable
  declare acteRegistreId?: ActeRegistre['id']
  declare acteRegistre?: ActeRegistre

  declare partiesPrenantes?: PartiePrenante[]
  declare piecesDeposees?: PieceDeposee[]
  declare oppositionsRequisitions?: OppositionRequisition[]

  declare donneeIndexation?: DonneeIndexation

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}