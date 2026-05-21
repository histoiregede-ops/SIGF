import { 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  DataTypes 
} from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_TABLE_PREFIX, MODULE_MODEL_PREFIX } from "../CommunModule";
import { SexesPersonnePhysique } from "../../../core/enums/SexesPersonnePhysique";

export class Civilite extends Model<InferAttributes<Civilite>, InferCreationAttributes<Civilite>> {
    declare id: CreationOptional<number>;
    declare libelle: string;
    declare abbreviation: string;
    declare sexe: SexesPersonnePhysique;
    declare description?: string;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
}

Civilite.init({
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
  abbreviation: {
    type: DataTypes.STRING(10),
    unique: true,
    allowNull: false
  },
  sexe: {
    type: DataTypes.ENUM,
    values: Object.values(SexesPersonnePhysique),
    defaultValue: SexesPersonnePhysique.NON_PRECISE
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
  modelName: MODULE_MODEL_PREFIX + 'Civilite',
  tableName: MODULE_TABLE_PREFIX + 'civilites',
  timestamps: true
});

