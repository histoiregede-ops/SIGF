import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../CommunModule";
import { Canton } from "./Canton";

export class Village extends Model<InferAttributes<Village>, InferCreationAttributes<Village>> {
  declare id: CreationOptional<string>
  declare libelle: string
  declare description: CreationOptional<string>

  declare cantonId: ForeignKey<Canton['id']>
  declare canton?: NonAttribute<Canton>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    canton: Association<Village, Canton>,
  }
}

Village.init({
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
  modelName: MODULE_MODEL_PREFIX + 'Village',
  tableName: MODULE_TABLE_PREFIX + 'villages',
  timestamps: true
})