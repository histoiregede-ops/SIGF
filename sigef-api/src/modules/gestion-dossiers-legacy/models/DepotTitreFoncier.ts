import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { Depot } from "./Depot";

export class DepotTitreFoncier extends Model<InferAttributes<DepotTitreFoncier>, InferCreationAttributes<DepotTitreFoncier>> {
  declare id: CreationOptional<string>
  declare numeroTitreFoncier: CreationOptional<string>
  declare depotId: ForeignKey<Depot['id']>
  declare depot?: NonAttribute<Depot>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    depot: Association<DepotTitreFoncier, Depot>,
  }
}

DepotTitreFoncier.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numeroTitreFoncier: {
    type: new DataTypes.STRING,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'DepotTitreFoncier',
  tableName: MODULE_TABLE_PREFIX + 'depots_titres_fonciers',
  timestamps: true
})