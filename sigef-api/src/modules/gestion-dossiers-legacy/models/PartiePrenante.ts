import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { FormalitePrealable } from "./FormalitePrealable";
import { TypesPartiePrenante } from "../../../core/enums/TypesPartiePrenante";
import { PersonnePhysique } from "./PersonnePhysique";
import { PersonneMorale } from "./PersonneMorale";
import { PersonneRelationLegale } from "./PersonneRelationLegale";
import { Opposition } from "./Opposition";
import { Depot } from "./Depot";
import { GroupeConjoints } from "./GroupeConjoints";
import { GroupeHeritiers } from "./GroupeHeritiers";
import { GroupePersonnePhysique } from "./GroupePersonnePhysique";
import { CategoriesPartiePrenante } from "../../../core/enums/CategoriesPartiePrenante";
import { Mutation } from "./Mutation";

export class PartiePrenante extends Model<InferAttributes<PartiePrenante>, InferCreationAttributes<PartiePrenante>> {
  declare id: CreationOptional<string>
  declare type: TypesPartiePrenante
  declare categorie: CategoriesPartiePrenante
  declare formalitePrealableId: ForeignKey<FormalitePrealable['id']>
  declare formalitePrealable?: NonAttribute<FormalitePrealable>
  declare oppositionId: ForeignKey<Opposition['id']>
  declare opposition?: NonAttribute<Opposition>
  declare depotId: ForeignKey<Depot['id']>
  declare depot?: NonAttribute<Depot>
  declare mutationId: ForeignKey<Mutation['id']>
  declare mutation?: NonAttribute<Mutation>

  declare personnePhysique?: NonAttribute<PersonnePhysique>
  declare personneMorale?: NonAttribute<PersonneMorale>
  declare personneRelationLegale?: NonAttribute<PersonneRelationLegale>
  declare groupePersonnePhysique?: NonAttribute<GroupePersonnePhysique>
  declare groupeConjoints?: NonAttribute<GroupeConjoints>
  declare groupeHeritiers?: NonAttribute<GroupeHeritiers>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    formalitePrealable: Association<PartiePrenante, FormalitePrealable>,
    opposition: Association<PartiePrenante, Opposition>,
    depot: Association<PartiePrenante, Depot>,
    mutation: Association<PartiePrenante, Mutation>,

    personnePhysique: Association<PartiePrenante, PersonnePhysique>,
    personneMorale: Association<PartiePrenante, PersonneMorale>,
    personneRelationLegale: Association<PartiePrenante, PersonneRelationLegale>,
    groupePersonnePhysique: Association<PartiePrenante, GroupePersonnePhysique>,
    groupeConjoints: Association<PartiePrenante, GroupeConjoints>,
    groupeHeritiers: Association<PartiePrenante, GroupeHeritiers>,
  }
}

PartiePrenante.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM,
    values: [TypesPartiePrenante.ACQUEREUR, TypesPartiePrenante.ALIENATEUR, TypesPartiePrenante.REQUERANT, TypesPartiePrenante.PROPRIETAIRE, TypesPartiePrenante.INTERVENANT, TypesPartiePrenante.PROPRIETAIRE_SUCCESSIF],
    allowNull: false,
  },
  categorie: {
    type: DataTypes.ENUM,
    values: [CategoriesPartiePrenante.PERSONNE_PHYSIQUE, CategoriesPartiePrenante.PERSONNE_MORALE, CategoriesPartiePrenante.PERSONNE_RELATION_LEGALE, CategoriesPartiePrenante.GROUPE_PERSONNE_PHYSIQUE, CategoriesPartiePrenante.GROUPE_CONJOINTS, CategoriesPartiePrenante.GROUPE_HERITIERS],
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'PartiePrenante',
  tableName: MODULE_TABLE_PREFIX + 'parties_prenantes',
  timestamps: true
})