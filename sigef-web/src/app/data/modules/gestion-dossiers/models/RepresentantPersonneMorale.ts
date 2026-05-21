import { PersonnePhysique } from "./PersonnePhysique";
import { PersonneMorale } from "./PersonneMorale";

export class RepresentantPersonneMorale {
  declare id?: string
  declare personneMoraleId?: PersonneMorale['id']
  declare personneMorale?: PersonneMorale
  declare representantId?: PersonnePhysique['id']
  declare representant?: PersonnePhysique

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}