import { 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  DataTypes 
} from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_TABLE_PREFIX, MODULE_MODEL_PREFIX } from "../CommunModule";

export class Periode extends Model<InferAttributes<Periode>, InferCreationAttributes<Periode>> {
    declare id: CreationOptional<number>;
    declare libelle: string;
    declare sigle: CreationOptional<string>;
    
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
}

Periode.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  libelle: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  sigle: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'Periode',
  tableName: MODULE_TABLE_PREFIX + 'periodes',
  timestamps: true
});

