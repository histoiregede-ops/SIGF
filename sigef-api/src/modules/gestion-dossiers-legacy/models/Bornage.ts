import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { FormalitePrealable } from "./FormalitePrealable";

export class Bornage extends Model<InferAttributes<Bornage>, InferCreationAttributes<Bornage>> {
  declare id: CreationOptional<string>
  declare dateInsertionJournalOfficiel: CreationOptional<Date>
  declare dateAvisIndividuels: CreationOptional<Date>
  declare dateProcesVerbal: CreationOptional<Date>
  declare formalitePrealableId: ForeignKey<FormalitePrealable['id']>
  declare formalitePrealable?: NonAttribute<FormalitePrealable>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    formalitePrealable: Association<Bornage, FormalitePrealable>,
  }
}

Bornage.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  dateInsertionJournalOfficiel: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateAvisIndividuels: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateProcesVerbal: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'Bornage',
  tableName:  MODULE_TABLE_PREFIX + 'bornages',
  timestamps: true
})