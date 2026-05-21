import { PersonneConjointe } from "./PersonneConjointe";
import { PartiePrenante } from "./PartiePrenante";

export class GroupeConjoints {
  declare id?: string
  declare personnesConjointes?: PersonneConjointe[]
  declare partiePrenanteId?: PartiePrenante['id']
  declare partiePrenante?: PartiePrenante

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}