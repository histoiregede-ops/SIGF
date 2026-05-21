import { PartiePrenante } from "./PartiePrenante";
import { ConjointPersonneDisposant } from "./ConjointPersonneDisposant";
import { PersonneDisposant } from "./PersonneDisposant";

export class GroupeHeritiers  {
  declare id?: string
  declare termesSuccession?: string
  declare description?: string
  declare personneDisposant?: PersonneDisposant
  declare conjointsPersonneDisposant?: ConjointPersonneDisposant[]
  declare partiePrenanteId?: PartiePrenante['id']
  declare partiePrenante?: PartiePrenante

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}