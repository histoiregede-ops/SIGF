import { ModeAlienation } from "./ModeAlienation";
import { TitreFoncier } from "./TitreFoncier";

export class DivisionEnVolume {
  declare id?: string
  declare numeroVolume?: string
  declare situationBatiment?: string
  declare situationNiveau?: string
  declare natureDescription?: string
  declare affectation?: string
  declare contenance?: number
  declare valeurVolume?: number
  declare mutationTitreFoncier?: string
  declare extinctionVolume?: string
  
  declare modeAlienationId?: ModeAlienation['id']
  declare modeAlienation?: ModeAlienation
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}