import { StatutsDepot } from "../../../enums/StatutsDepot"
import { Utilisateur } from "../../auth/models/Utilisateur"
import { DonneeIndexation } from "../../indexation/models/DonneeIndexation"
import { ActeRegistre } from "./ActeRegistre"
import { DepotTitreFoncier } from "./DepotTitreFoncier"
import { FormalitePrealable } from "./FormalitePrealable"
import { PartiePrenante } from "./PartiePrenante"
import { PieceDeposee } from "./PieceDeposee"
import { TitreFoncier } from "./TitreFoncier"
import { TypeDepot } from "./TypeDepot"
import { TypeOperationPostImmatriculation } from "./TypeOperationPostImmatriculation"

export class Depot {
  declare id?: string
  declare numeroRequisition?: string
  declare dateDepotRequisition?: Date
  declare statut?: StatutsDepot
  declare informationsStatut?: string
  declare designationDroitReel?: string
  declare nombrePiecesDeposees?: number
  declare dateDepot?: Date
  declare montantOperation?: number
  declare utilisateurId?: Utilisateur['id']
  declare utilisateur?: Utilisateur
  declare typeDepotId?: TypeDepot['id']
  declare typeDepot?: TypeDepot
  declare typeOperationPostImmatriculationId?: TypeOperationPostImmatriculation['id']
  declare typeOperationPostImmatriculation?: TypeOperationPostImmatriculation
  declare acteRegistreId?: ActeRegistre['id']
  declare acteRegistre?: ActeRegistre
  declare formalitePrealableId: FormalitePrealable['id']
  declare formalitePrealable?: FormalitePrealable
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier

  declare partiesPrenantes?: PartiePrenante[]
  declare piecesDeposees?: PieceDeposee[]
  declare depotsTitresFonciers?: DepotTitreFoncier[]

  declare donneeIndexation?: DonneeIndexation

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}
