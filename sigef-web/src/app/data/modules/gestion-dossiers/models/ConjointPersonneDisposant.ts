import { PersonnePhysique } from "./PersonnePhysique";
import { GroupeHeritiers } from "./GroupeHeritiers";
import { PersonneHeritiere } from "./PersonneHeritiere";

export class ConjointPersonneDisposant {
  declare id?: string
  declare groupeHeritiersId?: GroupeHeritiers['id']
  declare groupeHeritiers?: GroupeHeritiers
  declare personnePhysiqueId?: PersonnePhysique['id']
  declare personnePhysique?: PersonnePhysique
  declare personnesHeritieres?: PersonneHeritiere[]

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}