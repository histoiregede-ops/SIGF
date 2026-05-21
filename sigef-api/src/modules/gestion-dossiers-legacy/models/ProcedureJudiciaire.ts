import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { FormalitePrealable } from "./FormalitePrealable";

export class ProcedureJudiciaire extends Model<InferAttributes<ProcedureJudiciaire>, InferCreationAttributes<ProcedureJudiciaire>> {
  declare id: CreationOptional<string>
  declare dateJugementEnPremiereInstance: CreationOptional<Date>
  declare dateRemiseExpeditionEnPremiereInstance: CreationOptional<Date>
  declare dateRecoursEnPremiereInstance: CreationOptional<Date>
  declare dateArreEnAppel: CreationOptional<Date>
  declare dateRemiseExpeditionEnAppel: CreationOptional<Date>
  declare dateRecoursEnAppel: CreationOptional<Date>
  declare dateArreEnCassation: CreationOptional<Date>
  declare dateRemiseExpeditionEnCassation: CreationOptional<Date>
  declare formalitePrealableId: ForeignKey<FormalitePrealable['id']>
  declare formalitePrealable?: NonAttribute<FormalitePrealable>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    formalitePrealable: Association<ProcedureJudiciaire, FormalitePrealable>,
  }
}

ProcedureJudiciaire.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  dateJugementEnPremiereInstance: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateRemiseExpeditionEnPremiereInstance: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateRecoursEnPremiereInstance: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateArreEnAppel: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateRemiseExpeditionEnAppel: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateRecoursEnAppel: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateArreEnCassation: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateRemiseExpeditionEnCassation: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'ProcedureJudiciaire',
  tableName:  MODULE_TABLE_PREFIX + 'procedures_judiciaires',
  timestamps: true
})