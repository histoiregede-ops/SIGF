import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../CommunModule";
// import { Region } from "./Region"; // Removed circular/unused import

export class TypeRegistre extends Model<InferAttributes<TypeRegistre>, InferCreationAttributes<TypeRegistre>> {
  declare id: CreationOptional<string>
  declare abbreviation: string
  declare libelle: string
  declare description: CreationOptional<string>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
  }
}

TypeRegistre.init({
  id: {
    type: new DataTypes.STRING,
    primaryKey: true
  },
  abbreviation: {
    type: new DataTypes.STRING(191), 
    allowNull: false,
    unique: true
  },
  libelle: {
    type: new DataTypes.STRING(191), 
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
  modelName:  MODULE_MODEL_PREFIX + 'TypeRegistre',
  tableName:  MODULE_TABLE_PREFIX + 'types_registre',
  timestamps: true
})
