import { TitreFoncier } from "./TitreFoncier";

export class SituationFiscale {
  declare id?: string
  declare annee?: string
  declare valeurVenale?: number
  declare valeurLocative?: number
  declare exoneration?: number
  declare taxeLiquidee?: number
  declare taxePayee?: number
  declare taxeRestanteDue?: number

  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}