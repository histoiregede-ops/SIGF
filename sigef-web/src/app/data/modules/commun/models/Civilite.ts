import { SexesPersonnePhysique } from "../../../enums/SexesPersonnePhysique"

export class Civilite {
  declare id?: string
  declare libelle?: string
  declare abbreviation?: string
  declare sexe?: SexesPersonnePhysique
  declare description?: string
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}