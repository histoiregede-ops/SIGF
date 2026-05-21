import { PersonnePhysique } from "./PersonnePhysique";
import { GroupePersonnePhysique } from "./GroupePersonnePhysique";

export class PersonneMembre {
  declare id?: string
  declare personnePhysiqueId?: PersonnePhysique['id']
  declare personnePhysique?: PersonnePhysique
  declare groupePersonnePhysiqueId?: GroupePersonnePhysique['id']
  declare groupePersonnePhysique?: GroupePersonnePhysique

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}