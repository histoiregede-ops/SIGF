import { 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  DataTypes 
} from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";

export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id: string;
    declare description: CreationOptional<string>;
    /** @deprecated Présent sur les anciennes bases migrées ; en production l’id sert de code rôle. */
    declare libelle?: CreationOptional<string>;
    
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
}

Role.init({
  id: {
    type: DataTypes.STRING(64),
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  libelle: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  tableName: 'aut_roles',
  timestamps: true
});

