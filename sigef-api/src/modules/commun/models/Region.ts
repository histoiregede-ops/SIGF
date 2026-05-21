import { 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  DataTypes,
  ForeignKey 
} from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_TABLE_PREFIX, MODULE_MODEL_PREFIX } from "../CommunModule";
import { Periode } from './Periode';

export class Region extends Model<InferAttributes<Region>, InferCreationAttributes<Region>> {
    declare id: CreationOptional<number>;
    declare libelle: string;
    declare sigle: string;
    declare actuelle: boolean;
    
    declare periodeId: ForeignKey<Periode['id']>;
    declare periode?: Periode;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
}

Region.init({
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
  sigle: {
    type: DataTypes.STRING(10),
    unique: true,
    allowNull: false
  },
  actuelle: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'Region',
  tableName: MODULE_TABLE_PREFIX + 'regions',
  timestamps: true
});

