import { ModeAlienation } from "./ModeAlienation";
import { TitreFoncier } from "./TitreFoncier";

export class DivisionEnLot {
  declare id?: string
  declare numeroLotOuVolume?: string
  declare situationBatiment?: string
  declare situationNiveau?: string
  declare natureDescription?: string
  declare affectation?: string
  declare contenance?: number
  declare quotePartPartiesCommunes?: number
  declare valeurLot?: number
  declare mutationTitreFoncier?: string
  declare extinctionLot?: string
  
  declare modeAlienationId?: ModeAlienation['id']
  declare modeAlienation?: ModeAlienation
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}