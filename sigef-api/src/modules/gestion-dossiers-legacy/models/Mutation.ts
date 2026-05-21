import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { ModeAcquisition } from "./ModeAcquisition";
import { TitreFoncier } from "./TitreFoncier";
import { PartiePrenante } from "./PartiePrenante";

export class Mutation extends Model<InferAttributes<Mutation>, InferCreationAttributes<Mutation>> {
  declare id: CreationOptional<string>
  declare numeroBordereauAnalytique: CreationOptional<string>
  declare dateInscription: CreationOptional<Date>
  declare description: CreationOptional<string>
  declare prixAcquisition: CreationOptional<number>
  declare valeurVenaleOuEstimee: CreationOptional<number>

  declare partiesPrenantes?: NonAttribute<PartiePrenante[]>
  declare modeAcquisitionId: ForeignKey<ModeAcquisition['id']>
  declare modeAcquisition?: NonAttribute<ModeAcquisition>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    partiesPrenantes: Association<Mutation, PartiePrenante>,
    modeAcquisition: Association<Mutation, ModeAcquisition>,
    titreFoncier: Association<Mutation, TitreFoncier>
  }
}

Mutation.init({
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  prixAcquisition: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  valeurVenaleOuEstimee: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'Mutation',
  tableName:  MODULE_TABLE_PREFIX + 'mutations',
  timestamps: true
})