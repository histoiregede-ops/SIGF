import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { TitreFoncier } from "./TitreFoncier";

export class DroitReelConstitueParDenombrement extends Model<InferAttributes<DroitReelConstitueParDenombrement>, InferCreationAttributes<DroitReelConstitueParDenombrement>> {
  declare id: CreationOptional<string>
  declare numeroBordereauAnalytiqueConstitution: CreationOptional<string>
  declare dateInscription: CreationOptional<Date>
  declare indicationChargeOuConstitue: CreationOptional<string>
  declare prix: CreationOptional<number>
  declare numeroBordereauAnalytiqueRadiation: CreationOptional<string>
  declare dateRadiation: CreationOptional<Date>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    titreFoncier: Association<DroitReelConstitueParDenombrement, TitreFoncier>
  }
}

DroitReelConstitueParDenombrement.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numeroBordereauAnalytiqueConstitution: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  dateInscription: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  indicationChargeOuConstitue: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  prix: {
    type: DataTypes.FLOAT,
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
  modelName:  MODULE_MODEL_PREFIX + 'DroitReelConstitueParDenombrement',
  tableName:  MODULE_TABLE_PREFIX + 'droits_reels_constitues_par_denombrement',
  timestamps: true
})