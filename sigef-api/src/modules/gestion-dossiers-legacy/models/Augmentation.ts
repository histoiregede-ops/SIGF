import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { ModeAcquisition } from "./ModeAcquisition";
import { TitreFoncier } from "./TitreFoncier";

export class Augmentation extends Model<InferAttributes<Augmentation>, InferCreationAttributes<Augmentation>> {
  declare id: CreationOptional<string>
  declare numeroBordereauAnalytique: CreationOptional<string>
  declare dateInscription: CreationOptional<Date>
  declare numeroTitreAcquis: CreationOptional<string>
  declare designationImmeuble: CreationOptional<string>
  declare contenanceImmeubleAcquisEnHectare: CreationOptional<number>
  declare contenanceImmeubleAcquisEnAre: CreationOptional<number>
  declare contenanceImmeubleAcquisEnCentiare: CreationOptional<number>
  declare prixAcquisition: CreationOptional<number>
  declare modeAcquisitionId: ForeignKey<ModeAcquisition['id']>
  declare modeAcquisition?: NonAttribute<ModeAcquisition>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    modeAcquisition: Association<Augmentation, ModeAcquisition>,
    titreFoncier: Association<Augmentation, TitreFoncier>
  }
}

Augmentation.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numeroBordereauAnalytique: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  dateInscription: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  numeroTitreAcquis: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  designationImmeuble: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  contenanceImmeubleAcquisEnHectare: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  contenanceImmeubleAcquisEnAre: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  contenanceImmeubleAcquisEnCentiare: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  prixAcquisition: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'Augmentation',
  tableName:  MODULE_TABLE_PREFIX + 'augmentations',
  timestamps: true
})