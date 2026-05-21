import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { Opposition } from "./Opposition";

export class OppositionRequisition extends Model<InferAttributes<OppositionRequisition>, InferCreationAttributes<OppositionRequisition>> {
  declare id: CreationOptional<string>
  declare numeroRequisition: CreationOptional<string>
  declare oppositionId: ForeignKey<Opposition['id']>
  declare opposition?: NonAttribute<Opposition>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    opposition: Association<OppositionRequisition, Opposition>,
  }
}

OppositionRequisition.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numeroRequisition: {
    type: new DataTypes.STRING,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'OppositionRequisition',
  tableName: MODULE_TABLE_PREFIX + 'oppositions_requisitions',
  timestamps: true
})