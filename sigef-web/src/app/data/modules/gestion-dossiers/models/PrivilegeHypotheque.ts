import { TitreFoncier } from "./TitreFoncier";

export class PrivilegeHypotheque {
  declare id?: string
  declare numeroBordereauAnalytiqueConstitution?: string
  declare dateInscription?: Date
  declare designationDroitConstitue?: string
  declare beneficiaire?: string
  declare montantCharge?: number
  declare numeroBordereauAnalytiqueRadiation?: string
  declare dateRadiation?: Date
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}