import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PersonneConjointe } from "./PersonneConjointe";
import { PartiePrenante } from "./PartiePrenante";

export class GroupeConjoints extends Model<InferAttributes<GroupeConjoints>, InferCreationAttributes<GroupeConjoints>> {
  declare id: CreationOptional<string>
  declare personnesConjointes?: NonAttribute<PersonneConjointe[]>
  declare partiePrenanteId: ForeignKey<PartiePrenante['id']>
  declare partiePrenante?: NonAttribute<PartiePrenante>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    personnesConjointes: Association<GroupeConjoints, PersonneConjointe>,
    partiePrenante: Association<GroupeConjoints, PartiePrenante>,
  }
}

GroupeConjoints.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'GroupeConjoints',
  tableName: MODULE_TABLE_PREFIX + 'groupes_conjoints',
  timestamps: true
})