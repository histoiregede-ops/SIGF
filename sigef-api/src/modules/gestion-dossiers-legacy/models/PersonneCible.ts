import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PersonnePhysique } from "./PersonnePhysique";
import { PersonneRelationLegale } from "./PersonneRelationLegale";

export class PersonneCible extends Model<InferAttributes<PersonneCible>, InferCreationAttributes<PersonneCible>> {
  declare id: CreationOptional<string>
  declare personnePhysiqueId: ForeignKey<PersonnePhysique['id']>
  declare personnePhysique?: NonAttribute<PersonnePhysique>
  declare personneRelationLegaleId?: ForeignKey<PersonneRelationLegale['id']>
  declare personneRelationLegale?: NonAttribute<PersonneRelationLegale>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    personnePhysique: Association<PersonneCible, PersonnePhysique>,
    personneRelationLegale: Association<PersonneCible, PersonneRelationLegale>,
  }
}

PersonneCible.init({
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
  modelName: MODULE_MODEL_PREFIX + 'PersonneCible',
  tableName: MODULE_TABLE_PREFIX + 'personnes_cibles',
  timestamps: true
})