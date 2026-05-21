import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../CommunModule";

export class SecteurActivite extends Model<InferAttributes<SecteurActivite>, InferCreationAttributes<SecteurActivite>> {
  declare id: CreationOptional<string>
  declare libelle: string
  declare description: CreationOptional<string>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
  }
}

SecteurActivite.init({
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
  modelName:  MODULE_MODEL_PREFIX + 'SecteurActivite',
  tableName:  MODULE_TABLE_PREFIX + 'secteurs_activite',
  timestamps: true
})