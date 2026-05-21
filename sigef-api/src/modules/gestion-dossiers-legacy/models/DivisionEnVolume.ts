import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { ModeAlienation } from "./ModeAlienation";
import { TitreFoncier } from "./TitreFoncier";

export class DivisionEnVolume extends Model<InferAttributes<DivisionEnVolume>, InferCreationAttributes<DivisionEnVolume>> {
  declare id: CreationOptional<string>
  declare numeroVolume: CreationOptional<string>
  declare situationBatiment: CreationOptional<string>
  declare situationNiveau: CreationOptional<string>
  declare natureDescription: CreationOptional<string>
  declare affectation: CreationOptional<string>
  declare contenance: CreationOptional<number>
  declare valeurVolume: CreationOptional<number>
  declare mutationTitreFoncier: CreationOptional<string>
  declare extinctionVolume: CreationOptional<string>
  
  declare modeAlienationId: ForeignKey<ModeAlienation['id']>
  declare modeAlienation?: NonAttribute<ModeAlienation>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    modeAlienation: Association<DivisionEnVolume, ModeAlienation>,
    titreFoncier: Association<DivisionEnVolume, TitreFoncier>
  }
}

DivisionEnVolume.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numeroVolume: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  situationBatiment: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  situationNiveau: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  natureDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  affectation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  contenance: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  valeurVolume: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  mutationTitreFoncier: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  extinctionVolume: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'DivisionEnVolume',
  tableName:  MODULE_TABLE_PREFIX + 'divisions_en_volumes',
  timestamps: true
})