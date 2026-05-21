import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes
} from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { RoleProfil } from './RoleProfil';

export class Profil extends Model<InferAttributes<Profil>, InferCreationAttributes<Profil>> {
  declare id: CreationOptional<number>;
  declare libelle: string; // Ensure this is the primary property used in logic
  declare description?: string;
  declare rolesProfil?: RoleProfil[];

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Profil.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  libelle: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'titre'
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
  tableName: 'aut_profils',
  timestamps: true
});

Profil.hasMany(RoleProfil, {
  foreignKey: 'profilId',
  as: 'rolesProfil'
});
