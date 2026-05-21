import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PersonnePhysique } from "./PersonnePhysique";
import { GroupeConjoints } from "./GroupeConjoints";

export class PersonneConjointe extends Model<InferAttributes<PersonneConjointe>, InferCreationAttributes<PersonneConjointe>> {
  declare id: CreationOptional<string>
  declare personnePhysiqueId: ForeignKey<PersonnePhysique['id']>
  declare personnePhysique?: NonAttribute<PersonnePhysique>
  declare groupeConjointsId: ForeignKey<GroupeConjoints['id']>
  declare groupeConjoints?: NonAttribute<GroupeConjoints>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    personnePhysique: Association<PersonneConjointe, PersonnePhysique>,
    groupeConjoints: Association<PersonneConjointe, GroupeConjoints>,
  }
}

PersonneConjointe.init({
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
  modelName: MODULE_MODEL_PREFIX + 'PersonneConjointe',
  tableName: MODULE_TABLE_PREFIX + 'personnes_conjointes',
  timestamps: true
})