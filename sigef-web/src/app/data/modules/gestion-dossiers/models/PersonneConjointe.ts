import { PersonnePhysique } from "./PersonnePhysique";
import { GroupeConjoints } from "./GroupeConjoints";

export class PersonneConjointe {
  declare id?: string
  declare personnePhysiqueId?: PersonnePhysique['id']
  declare personnePhysique?: PersonnePhysique
  declare groupeConjointsId?: GroupeConjoints['id']
  declare groupeConjoints?: GroupeConjoints

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}