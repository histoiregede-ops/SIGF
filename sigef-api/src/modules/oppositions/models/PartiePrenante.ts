import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../OppositionsModule";
import { Opposition } from "./Opposition";

export class OppositionPartiePrenante extends Model<InferAttributes<OppositionPartiePrenante>, InferCreationAttributes<OppositionPartiePrenante>> {
  declare id: CreationOptional<number>
  declare nom: string
  declare prenom: CreationOptional<string>
  declare qualite: string // OPPOSANT, REQUISITIONNAIRE, etc.
  declare domicile: CreationOptional<string>
  
  declare oppositionId: ForeignKey<Opposition['id']>
  declare opposition?: NonAttribute<Opposition>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

OppositionPartiePrenante.init({
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
  oppositionId: {
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
