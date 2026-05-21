import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../CommunModule";
import { Region } from "./Region";

export class FormeJuridique extends Model<InferAttributes<FormeJuridique>, InferCreationAttributes<FormeJuridique>> {
  declare id: CreationOptional<string>
  declare sigle: CreationOptional<string>
  declare libelle: string
  declare declaree: CreationOptional<boolean>
  declare description: CreationOptional<string>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
  }
}

FormeJuridique.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  sigle: {
    type: new DataTypes.STRING, 
    allowNull: true
  },
  libelle: {
    type: new DataTypes.STRING, 
    allowNull: false,
    unique: true
  },
  declaree: {
    type: DataTypes.BOOLEAN, 
    allowNull: false,
    defaultValue: true
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
  modelName:  MODULE_MODEL_PREFIX + 'FormeJuridique',
  tableName:  MODULE_TABLE_PREFIX + 'formes_juridiques',
  timestamps: true
})