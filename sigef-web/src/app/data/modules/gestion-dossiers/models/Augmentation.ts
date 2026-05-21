import { ModeAcquisition } from "./ModeAcquisition";
import { TitreFoncier } from "./TitreFoncier";

export class Augmentation {
  declare id?: string
  declare numeroBordereauAnalytique?: string
  declare dateInscription?: Date
  declare numeroTitreAcquis?: string
  declare designationImmeuble?: string
  declare contenanceImmeubleAcquisEnHectare?: number
  declare contenanceImmeubleAcquisEnAre?: number
  declare contenanceImmeubleAcquisEnCentiare?: number
  declare prixAcquisition?: number
  declare modeAcquisitionId?: ModeAcquisition['id']
  declare modeAcquisition?: ModeAcquisition
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}