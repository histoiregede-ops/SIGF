import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { DatabaseConnection } from "../src/core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../src/modules/gestion-dossiers-legacy/GestionDossiersModule";

export class Test extends Model<InferAttributes<Test>, InferCreationAttributes<Test>> {
  declare id: CreationOptional<string>
  declare data: string

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

Test.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'Test',
  tableName:  MODULE_TABLE_PREFIX + 'tests',
  timestamps: true
})
