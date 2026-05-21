import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../CommunModule";
import { Prefecture } from "./Prefecture";
import { Canton } from "./Canton";

export class Commune extends Model<InferAttributes<Commune>, InferCreationAttributes<Commune>> {
  declare id: CreationOptional<string>
  declare libelle: string
  declare description: CreationOptional<string>

  declare prefectureId: ForeignKey<Prefecture['id']>
  declare prefecture?: NonAttribute<Prefecture>
  declare cantons?: NonAttribute<Canton[]>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    prefecture: Association<Commune, Prefecture>,
    cantons: Association<Commune, Canton>,
  }
}

Commune.init({
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
  modelName: MODULE_MODEL_PREFIX + 'Commune',
  tableName: MODULE_TABLE_PREFIX + 'communes',
  timestamps: true
})