import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { DirectionLimite } from "./DirectionLimite";
import { TitreFoncier } from "./TitreFoncier";

export class Limite extends Model<InferAttributes<Limite>, InferCreationAttributes<Limite>> {
  declare id: CreationOptional<string>
  declare limitrophe: string
  declare directionLimiteId: ForeignKey<DirectionLimite['id']>
  declare directionLimite?: NonAttribute<DirectionLimite>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    directionLimite: Association<Limite, DirectionLimite>
    titreFoncier: Association<Limite, TitreFoncier>
  }
}

Limite.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  limitrophe: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'Limite',
  tableName:  MODULE_TABLE_PREFIX + 'limites',
  timestamps: true
})