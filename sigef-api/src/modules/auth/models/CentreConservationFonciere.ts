import { 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  DataTypes,
  ForeignKey 
} from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { Region } from "../../commun/models/Region";

export class CentreConservationFonciere extends Model<InferAttributes<CentreConservationFonciere>, InferCreationAttributes<CentreConservationFonciere>> {
    declare id: CreationOptional<number>;
    declare libelle: string;
    declare adresse: string;
    declare contact?: string;
    
    declare regionId?: ForeignKey<Region['id']>;
    declare region?: Region;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
}

CentreConservationFonciere.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  libelle: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  adresse: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  tableName: 'aut_centres_conservation_fonciere',
  timestamps: true
});

