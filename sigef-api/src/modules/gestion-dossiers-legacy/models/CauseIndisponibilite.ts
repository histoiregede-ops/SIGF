import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { TitreFoncier } from "./TitreFoncier";

export class CauseIndisponibilite extends Model<InferAttributes<CauseIndisponibilite>, InferCreationAttributes<CauseIndisponibilite>> {
  declare id: CreationOptional<string>
  declare numeroBordereauAnalytiqueStipulationExecution: CreationOptional<string>
  declare dateInscription: CreationOptional<Date>
  declare indicationClausesConventionnelles: CreationOptional<string>
  declare numeroBordereauAnalytiqueRadiation: CreationOptional<string>
  declare dateRadiation: CreationOptional<Date>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    titreFoncier: Association<CauseIndisponibilite, TitreFoncier>
  }
}

CauseIndisponibilite.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numeroBordereauAnalytiqueStipulationExecution: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  dateInscription: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  indicationClausesConventionnelles: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  numeroBordereauAnalytiqueRadiation: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  dateRadiation: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'CauseIndisponibilite',
  tableName:  MODULE_TABLE_PREFIX + 'causes_indisponibilite',
  timestamps: true
})