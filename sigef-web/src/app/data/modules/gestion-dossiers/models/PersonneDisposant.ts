import { PersonnePhysique } from "./PersonnePhysique";
import { GroupeHeritiers } from "./GroupeHeritiers";

export class PersonneDisposant {
  declare id?: string
  declare personnePhysiqueId?: PersonnePhysique['id']
  declare personnePhysique?: PersonnePhysique
  declare groupeHeritiersId?: GroupeHeritiers['id']
  declare groupeHeritiers?: GroupeHeritiers

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}