import { TypeLienGroupe } from "../../commun/models/TypeLienGroupe";
import { PersonneMembre } from "./PersonneMembre";
import { PartiePrenante } from "./PartiePrenante";

export class GroupePersonnePhysique {
  declare id?: string
  declare personnesMembres?: PersonneMembre[]
  declare typeLienGroupeId?: TypeLienGroupe['id']
  declare typeLienGroupe?: TypeLienGroupe
  declare partiePrenanteId?: PartiePrenante['id']
  declare partiePrenante?: PartiePrenante

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}