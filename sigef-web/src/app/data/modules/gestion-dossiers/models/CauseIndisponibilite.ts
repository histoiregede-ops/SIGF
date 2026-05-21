import { TitreFoncier } from "./TitreFoncier";

export class CauseIndisponibilite {
  declare id?: string
  declare numeroBordereauAnalytiqueStipulationExecution?: string
  declare dateInscription?: Date
  declare indicationClausesConventionnelles?: string
  declare numeroBordereauAnalytiqueRadiation?: string
  declare dateRadiation?: Date
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}