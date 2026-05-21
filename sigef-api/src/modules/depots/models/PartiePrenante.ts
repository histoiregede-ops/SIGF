import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../DepotsModule";
import { Depot } from "./Depot";

export class DepotPartiePrenante extends Model<InferAttributes<DepotPartiePrenante>, InferCreationAttributes<DepotPartiePrenante>> {
  declare id: CreationOptional<number>
  declare nom: string
  declare prenom: CreationOptional<string>
  declare qualite: string // DEPOSANT, MANDATAIRE, etc.
  declare domicile: CreationOptional<string>
  
  declare depotId: ForeignKey<Depot['id']>
  declare depot?: NonAttribute<Depot>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

DepotPartiePrenante.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: true
  },
  qualite: {
    type: DataTypes.STRING,
    allowNull: false
  },
  domicile: {
    type: DataTypes.STRING,
    allowNull: true
  },
  depotId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'PartiePrenante',
  tableName: MODULE_TABLE_PREFIX + 'parties_prenantes',
  timestamps: true
})
