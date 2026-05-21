import { PersonnePhysique } from "./PersonnePhysique";
import { PersonneRelationLegale } from "./PersonneRelationLegale";

export class PersonneCible {
  declare id?: string
  declare personnePhysiqueId?: PersonnePhysique['id']
  declare personnePhysique?: PersonnePhysique
  declare personneRelationLegaleId?: PersonneRelationLegale['id']
  declare personneRelationLegale?: PersonneRelationLegale

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}