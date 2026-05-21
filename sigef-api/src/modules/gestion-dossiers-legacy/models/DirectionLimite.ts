import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";

export class DirectionLimite extends Model<InferAttributes<DirectionLimite>, InferCreationAttributes<DirectionLimite>> {
  declare id: CreationOptional<string>
  declare libelle: string
  declare abbreviation: CreationOptional<string>
  declare description: CreationOptional<string>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
  }
}

DirectionLimite.init({
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
  abbreviation: {
    type: new DataTypes.STRING, 
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
  modelName:  MODULE_MODEL_PREFIX + 'DirectionLimite',
  tableName:  MODULE_TABLE_PREFIX + 'directions_limite',
  timestamps: true
})