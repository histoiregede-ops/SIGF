import { PersonnePhysique } from "./PersonnePhysique";

export class RepresentantPersonnePhysique {
  declare id?: string
  declare personnePhysiqueId?: PersonnePhysique['id']
  declare personnePhysique?: PersonnePhysique
  declare representantId?: PersonnePhysique['id']
  declare representant?: PersonnePhysique

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}