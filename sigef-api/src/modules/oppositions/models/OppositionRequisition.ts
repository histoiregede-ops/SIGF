import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../OppositionsModule";
import { Opposition } from "./Opposition";

export class OppositionRequisition extends Model<InferAttributes<OppositionRequisition>, InferCreationAttributes<OppositionRequisition>> {
  declare id: CreationOptional<number>
  declare numero: number
  declare annee: number
  
  declare oppositionId: ForeignKey<Opposition['id']>
  declare opposition?: NonAttribute<Opposition>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

OppositionRequisition.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  annee: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  oppositionId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'Requisition',
  tableName: MODULE_TABLE_PREFIX + 'requisitions',
  timestamps: true
})
