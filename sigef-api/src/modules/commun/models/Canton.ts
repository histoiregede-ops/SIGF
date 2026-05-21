import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../CommunModule";
import { Commune } from "./Commune";
import { Quartier } from "./Quartier";

export class Canton extends Model<InferAttributes<Canton>, InferCreationAttributes<Canton>> {
  declare id: CreationOptional<string>
  declare libelle: string
  declare description: CreationOptional<string>

  declare communeId: ForeignKey<Commune['id']>
  declare commune?: NonAttribute<Commune>
  declare quartiers?: NonAttribute<Quartier[]>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    commune: Association<Canton, Commune>,
    quartiers: Association<Commune, Quartier>,
  }
}

Canton.init({
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
  modelName: MODULE_MODEL_PREFIX + 'Canton',
  tableName: MODULE_TABLE_PREFIX + 'cantons',
  timestamps: true
})