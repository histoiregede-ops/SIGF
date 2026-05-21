import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../TitresFonciersModule";
import { TitreFoncier } from "./TitreFoncier";

export class Mutation extends Model<InferAttributes<Mutation>, InferCreationAttributes<Mutation>> {
  declare id: CreationOptional<number>
  declare dateInscription: Date
  declare annee: number
  declare quinzaine: number
  declare ancienProprietaire: string
  declare acquereur: string
  declare prixAcquisition: number
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

Mutation.init({
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
  ancienProprietaire: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  acquereur: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prixAcquisition: {
    type: DataTypes.FLOAT,
    allowNull: false,
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
  modelName: MODULE_MODEL_PREFIX + 'Mutation',
  tableName: MODULE_TABLE_PREFIX + 'mutations',
  timestamps: true
})
