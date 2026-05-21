import { TitreFoncier } from "./TitreFoncier";

export class DroitReelConstitueParDenombrement {
  declare id?: string
  declare numeroBordereauAnalytiqueConstitution?: string
  declare dateInscription?: Date
  declare indicationChargeOuConstitue?: string
  declare prix?: number
  declare numeroBordereauAnalytiqueRadiation?: string
  declare dateRadiation?: Date
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}