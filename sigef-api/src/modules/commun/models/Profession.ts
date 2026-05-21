import { 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  DataTypes 
} from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_TABLE_PREFIX, MODULE_MODEL_PREFIX } from "../CommunModule";

export class Profession extends Model<InferAttributes<Profession>, InferCreationAttributes<Profession>> {
    declare id: CreationOptional<number>;
    declare libelle: string;
    declare description?: string;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
}

Profession.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  libelle: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'Profession',
  tableName: MODULE_TABLE_PREFIX + 'professions',
  timestamps: true
});

