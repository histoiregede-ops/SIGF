import { StatutsDemandeEtatDescriptif } from "../../../enums/StatutsDemandeEtatDescriptif"
import { Utilisateur } from "../../auth/models/Utilisateur"
import { TitreFoncier } from "./TitreFoncier"

export class DemandeEtatDescriptif {
  declare id?: string
  declare requerant?: string
  declare reponse?: string
  declare statut?: StatutsDemandeEtatDescriptif
  declare dateDemande?: Date
  declare dateTraitement?: Date

  declare utilisateurDemandeId?: Utilisateur['id']
  declare utilisateurDemande?: Utilisateur
  declare utilisateurTraitementId?: Utilisateur['id']
  declare utilisateurTraitement?: Utilisateur
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}