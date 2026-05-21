import { PartiePrenante } from "./PartiePrenante";
import { TypeRelationLegale } from "../../commun/models/TypeRelationLegale";
import { PersonneCible } from "./PersonneCible";

export class PersonneRelationLegale {
  declare id?: string
  declare personneCible?: PersonneCible
  declare typeRelationLegaleId?: TypeRelationLegale['id']
  declare typeRelationLegale?: TypeRelationLegale
  declare partiePrenanteId?: PartiePrenante['id']
  declare partiePrenante?: PartiePrenante

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}