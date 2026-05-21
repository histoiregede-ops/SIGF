import { PersonnePhysique } from "./PersonnePhysique";
import { ConjointPersonneDisposant } from "./ConjointPersonneDisposant";

export class PersonneHeritiere {
  declare id?: string
  declare personnePhysiqueId?: PersonnePhysique['id']
  declare personnePhysique?: PersonnePhysique
  declare conjointPersonneDisposantId?: ConjointPersonneDisposant['id']
  declare conjointPersonneDisposant?: ConjointPersonneDisposant

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}