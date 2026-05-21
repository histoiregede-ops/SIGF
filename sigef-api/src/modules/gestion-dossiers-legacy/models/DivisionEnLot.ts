import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { ModeAlienation } from "./ModeAlienation";
import { TitreFoncier } from "./TitreFoncier";

export class DivisionEnLot extends Model<InferAttributes<DivisionEnLot>, InferCreationAttributes<DivisionEnLot>> {
  declare id: CreationOptional<string>
  declare numeroLotOuVolume: CreationOptional<string>
  declare situationBatiment: CreationOptional<string>
  declare situationNiveau: CreationOptional<string>
  declare natureDescription: CreationOptional<string>
  declare affectation: CreationOptional<string>
  declare contenance: CreationOptional<number>
  declare quotePartPartiesCommunes: CreationOptional<number>
  declare valeurLot: CreationOptional<number>
  declare mutationTitreFoncier: CreationOptional<string>
  declare extinctionLot: CreationOptional<string>
  
  declare modeAlienationId: ForeignKey<ModeAlienation['id']>
  declare modeAlienation?: NonAttribute<ModeAlienation>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    modeAlienation: Association<DivisionEnLot, ModeAlienation>,
    titreFoncier: Association<DivisionEnLot, TitreFoncier>
  }
}

DivisionEnLot.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numeroLotOuVolume: {
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
  quotePartPartiesCommunes: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  valeurLot: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  mutationTitreFoncier: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  extinctionLot: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'DivisionEnLot',
  tableName:  MODULE_TABLE_PREFIX + 'divisions_en_lot',
  timestamps: true
})