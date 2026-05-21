import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PersonnePhysique } from "./PersonnePhysique";
import { GroupePersonnePhysique } from "./GroupePersonnePhysique";

export class PersonneMembre extends Model<InferAttributes<PersonneMembre>, InferCreationAttributes<PersonneMembre>> {
  declare id: CreationOptional<string>
  declare personnePhysiqueId: ForeignKey<PersonnePhysique['id']>
  declare personnePhysique?: NonAttribute<PersonnePhysique>
  declare groupePersonnePhysiqueId: ForeignKey<GroupePersonnePhysique['id']>
  declare groupePersonnePhysique?: NonAttribute<GroupePersonnePhysique>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    personnePhysique: Association<PersonneMembre, PersonnePhysique>,
    groupePersonnePhysique: Association<PersonneMembre, GroupePersonnePhysique>,
  }
}

PersonneMembre.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'PersonneMembre',
  tableName: MODULE_TABLE_PREFIX + 'personnes_membres',
  timestamps: true
})