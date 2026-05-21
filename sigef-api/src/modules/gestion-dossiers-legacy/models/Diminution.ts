import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { ModeAlienation } from "./ModeAlienation";
import { TitreFoncier } from "./TitreFoncier";

export class Diminution extends Model<InferAttributes<Diminution>, InferCreationAttributes<Diminution>> {
  declare id: CreationOptional<string>
  declare numeroBordereauAnalytique: CreationOptional<string>
  declare dateInscription: CreationOptional<Date>
  declare numeroTitreAliene: CreationOptional<string>
  declare designationImmeuble: CreationOptional<string>
  declare contenanceParcelleAlieneeEnHectare: CreationOptional<number>
  declare contenanceParcelleAlieneeEnAre: CreationOptional<number>
  declare contenanceParcelleAlieneeEnCentiare: CreationOptional<number>
  declare prixAlienation: CreationOptional<number>
  declare modeAlienationId: ForeignKey<ModeAlienation['id']>
  declare modeAlienation?: NonAttribute<ModeAlienation>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    modeAlienation: Association<Diminution, ModeAlienation>,
    titreFoncier: Association<Diminution, TitreFoncier>
  }
}

Diminution.init({
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
  numeroTitreAliene: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  designationImmeuble: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  contenanceParcelleAlieneeEnHectare: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  contenanceParcelleAlieneeEnAre: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  contenanceParcelleAlieneeEnCentiare: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  prixAlienation: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'Diminution',
  tableName:  MODULE_TABLE_PREFIX + 'diminutions',
  timestamps: true
})