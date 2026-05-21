import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../TitresFonciersModule";
import { TitreFoncier } from "./TitreFoncier";

export class Augmentation extends Model<InferAttributes<Augmentation>, InferCreationAttributes<Augmentation>> {
  declare id: CreationOptional<number>
  declare dateInscription: Date
  declare annee: number
  declare quinzaine: number
  declare natureModification: string
  declare designationParcelle: string
  declare superficie: number
  declare reglementParcelle: CreationOptional<number>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

Augmentation.init({
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
  natureModification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designationParcelle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  superficie: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  reglementParcelle: {
    type: DataTypes.FLOAT,
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
  modelName: MODULE_MODEL_PREFIX + 'Augmentation',
  tableName: MODULE_TABLE_PREFIX + 'augmentations',
  timestamps: true
})
