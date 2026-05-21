import { ModeAcquisition } from "./ModeAcquisition";
import { PartiePrenante } from "./PartiePrenante";
import { TitreFoncier } from "./TitreFoncier";

export class Mutation {
  declare id?: string
  declare numeroBordereauAnalytique?: string
  declare dateInscription?: Date
  declare description?: string
  declare prixAcquisition?: number
  declare valeurVenaleOuEstimee?: number

  declare partiesPrenantes?: PartiePrenante[]
  declare modeAcquisitionId?: ModeAcquisition['id']
  declare modeAcquisition?: ModeAcquisition
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}