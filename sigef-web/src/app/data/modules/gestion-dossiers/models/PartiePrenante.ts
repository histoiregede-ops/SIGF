import { FormalitePrealable } from "./FormalitePrealable";
import { PersonnePhysique } from "./PersonnePhysique";
import { PersonneMorale } from "./PersonneMorale";
import { PersonneRelationLegale } from "./PersonneRelationLegale";
import { TypesPartiePrenante } from "../../../enums/TypesPartiePrenante";
import { Opposition } from "./Opposition";
import { Depot } from "./Depot";
import { GroupePersonnePhysique } from "./GroupePersonnePhysique";
import { GroupeConjoints } from "./GroupeConjoints";
import { GroupeHeritiers } from "./GroupeHeritiers";
import { CategoriesPartiePrenante } from "../../../enums/CategoriesPartiePrenante";
import { Mutation } from "./Mutation";

export class PartiePrenante {
  declare id?: string
  declare type?: TypesPartiePrenante
  declare categorie?: CategoriesPartiePrenante
  declare formalitePrealableId?: FormalitePrealable['id']
  declare formalitePrealable?: FormalitePrealable
  declare oppositionId?: Opposition['id']
  declare opposition?: Opposition
  declare depotId?: Depot['id']
  declare depot?: Depot
  declare mutationId?: Mutation['id']
  declare mutation?: Mutation

  declare personnePhysique?: PersonnePhysique
  declare personneMorale?: PersonneMorale
  declare personneRelationLegale?: PersonneRelationLegale
  declare groupePersonnePhysique?: GroupePersonnePhysique
  declare groupeConjoints?: GroupeConjoints
  declare groupeHeritiers?: GroupeHeritiers

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}