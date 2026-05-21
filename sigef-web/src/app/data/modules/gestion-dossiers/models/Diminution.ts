import { ModeAlienation } from "./ModeAlienation";
import { TitreFoncier } from "./TitreFoncier";

export class Diminution {
  declare id?: string
  declare numeroBordereauAnalytique?: string
  declare dateInscription?: Date
  declare numeroTitreAliene?: string
  declare designationImmeuble?: string
  declare contenanceParcelleAlieneeEnHectare?: number
  declare contenanceParcelleAlieneeEnAre?: number
  declare contenanceParcelleAlieneeEnCentiare?: number
  declare prixAlienation?: number
  declare modeAlienationId?: ModeAlienation['id']
  declare modeAlienation?: ModeAlienation
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}