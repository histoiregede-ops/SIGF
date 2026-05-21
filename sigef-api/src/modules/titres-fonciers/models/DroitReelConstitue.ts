import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../TitresFonciersModule";
import { TitreFoncier } from "./TitreFoncier";

export class DroitReelConstitue extends Model<InferAttributes<DroitReelConstitue>, InferCreationAttributes<DroitReelConstitue>> {
  declare id: CreationOptional<number>
  declare dateInscription: Date
  declare annee: number
  declare quinzaine: number
  declare natureDroitEtabli: string
  declare designationBeneficiaire: string
  declare dureeDroit: number
  declare valeurEnFrancs: CreationOptional<number>
  declare dateRadiation: CreationOptional<Date>
  declare anneeRadiation: CreationOptional<number>
  declare quinzaineRadiation: CreationOptional<number>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

DroitReelConstitue.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  dateInscription: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  annee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quinzaine: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  natureDroitEtabli: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designationBeneficiaire: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dureeDroit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valeurEnFrancs: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  dateRadiation: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  anneeRadiation: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  quinzaineRadiation: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  titreFoncierId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'DroitReelConstitue',
  tableName: MODULE_TABLE_PREFIX + 'droits_reels_constitues',
  timestamps: true
})
