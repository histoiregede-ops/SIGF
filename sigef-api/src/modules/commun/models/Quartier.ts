import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../CommunModule";
import { Ville } from "./Ville";

export class Quartier extends Model<InferAttributes<Quartier>, InferCreationAttributes<Quartier>> {
  declare id: CreationOptional<string>
  declare libelle: string
  declare description: CreationOptional<string>

  declare villeId: ForeignKey<Ville['id']>
  declare ville?: NonAttribute<Ville>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    ville: Association<Quartier, Ville>,
  }
}

Quartier.init({
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
  modelName: MODULE_MODEL_PREFIX + 'Quartier',
  tableName: MODULE_TABLE_PREFIX + 'quartiers',
  timestamps: true
})