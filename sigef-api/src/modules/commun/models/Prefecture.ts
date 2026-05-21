import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../CommunModule";
import { Region } from "./Region";
import { Commune } from "./Commune";

export class Prefecture extends Model<InferAttributes<Prefecture>, InferCreationAttributes<Prefecture>> {
  declare id: CreationOptional<string>
  declare libelle: string
  declare description: CreationOptional<string>

  declare regionId: ForeignKey<Region['id']>
  declare region?: NonAttribute<Region>
  declare communes?: NonAttribute<Commune[]>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    region: Association<Prefecture, Region>,
    communes: Association<Prefecture, Commune>,
  }
}

Prefecture.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  libelle: {
    type: new DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'Prefecture',
  tableName: MODULE_TABLE_PREFIX + 'prefectures',
  timestamps: true
})