import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
// import { StatutsRequisition } from "../../../core/enums/StatutsRequisition";

export class Requisition extends Model<InferAttributes<Requisition>, InferCreationAttributes<Requisition>> {
  declare id: CreationOptional<string>
  declare numero: string
  declare dateDepot: CreationOptional<Date>
  // declare statut: CreationOptional<StatutsRequisition>
  declare description: CreationOptional<string>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

Requisition.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numero: {
    type: new DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dateDepot: {
    type: DataTypes.DATE,
    allowNull: true,
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
  modelName: MODULE_MODEL_PREFIX + 'Requisition',
  tableName: MODULE_TABLE_PREFIX + 'requisitions',
  timestamps: true
})