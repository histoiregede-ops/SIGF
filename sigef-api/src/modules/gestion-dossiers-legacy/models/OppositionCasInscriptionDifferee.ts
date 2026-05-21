import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { TitreFoncier } from "./TitreFoncier";

export class OppositionCasInscriptionDifferee extends Model<InferAttributes<OppositionCasInscriptionDifferee>, InferCreationAttributes<OppositionCasInscriptionDifferee>> {
  declare id: CreationOptional<string>
  declare dateOpposition: CreationOptional<Date>
  declare numeroRegistreDepots: CreationOptional<string>
  declare dureeValiditeOpposition: CreationOptional<string>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    titreFoncier: Association<OppositionCasInscriptionDifferee, TitreFoncier>
  }
}

OppositionCasInscriptionDifferee.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  dateOpposition: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  numeroRegistreDepots: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  dureeValiditeOpposition: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'OppositionCasInscriptionDifferee',
  tableName:  MODULE_TABLE_PREFIX + 'oppositions_cas_inscription_differee',
  timestamps: true
})