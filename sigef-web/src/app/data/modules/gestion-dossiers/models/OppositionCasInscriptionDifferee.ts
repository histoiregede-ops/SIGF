import { TitreFoncier } from "./TitreFoncier";

export class OppositionCasInscriptionDifferee {
  declare id?: string
  declare dateOpposition?: Date
  declare numeroRegistreDepots?: string
  declare dureeValiditeOpposition?: string
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}