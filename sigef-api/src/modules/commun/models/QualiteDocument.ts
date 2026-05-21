import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../CommunModule";
import { Region } from "./Region";

export class QualiteDocument extends Model<InferAttributes<QualiteDocument>, InferCreationAttributes<QualiteDocument>> {
  declare id: CreationOptional<string>
  declare libelle: string
  declare description: CreationOptional<string>
  declare aSignaler: CreationOptional<boolean>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
  }
}

QualiteDocument.init({
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
  aSignaler: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'QualiteDocument',
  tableName:  MODULE_TABLE_PREFIX + 'qualites_document',
  timestamps: true
})