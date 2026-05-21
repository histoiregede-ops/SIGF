import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { TitreFoncier } from "./TitreFoncier";
import { Requisition } from "./Requisition";

export class BordereauAnalytique extends Model<InferAttributes<BordereauAnalytique>, InferCreationAttributes<BordereauAnalytique>> {
  declare id: CreationOptional<string>
  declare numero: string
  declare dateBordereau: CreationOptional<Date>
  declare description: CreationOptional<string>

  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare requisitionId?: ForeignKey<Requisition['id']>
  declare requisition?: NonAttribute<Requisition>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    titreFoncier: Association<BordereauAnalytique, TitreFoncier>,
    requisition: Association<BordereauAnalytique, Requisition>
  }
}

BordereauAnalytique.init({
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
  dateBordereau: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'BordereauAnalytique',
  tableName: MODULE_TABLE_PREFIX + 'bordereaux_analytiques',
  timestamps: true
})
