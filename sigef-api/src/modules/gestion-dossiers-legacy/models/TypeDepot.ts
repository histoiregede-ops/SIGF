import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";

export class TypeDepot extends Model<InferAttributes<TypeDepot>, InferCreationAttributes<TypeDepot>> {
  declare id: CreationOptional<string>
  declare libelle: string
  declare description: CreationOptional<string>
  declare post: CreationOptional<boolean>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

TypeDepot.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  libelle: {
    type: new DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  post: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'TypeDepot',
  tableName: MODULE_TABLE_PREFIX + 'types_depot',
  timestamps: true
})