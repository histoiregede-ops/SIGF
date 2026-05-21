import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PersonnePhysique } from "./PersonnePhysique";
import { GroupeHeritiers } from "./GroupeHeritiers";

export class PersonneDisposant extends Model<InferAttributes<PersonneDisposant>, InferCreationAttributes<PersonneDisposant>> {
  declare id: CreationOptional<string>
  declare personnePhysiqueId: ForeignKey<PersonnePhysique['id']>
  declare personnePhysique?: NonAttribute<PersonnePhysique>
  declare groupeHeritiersId: ForeignKey<GroupeHeritiers['id']>
  declare groupeHeritiers?: NonAttribute<GroupeHeritiers>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    personnePhysique: Association<PersonneDisposant, PersonnePhysique>,
    groupeHeritiers: Association<PersonneDisposant, GroupeHeritiers>,
  }
}

PersonneDisposant.init({
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
  modelName: MODULE_MODEL_PREFIX + 'PersonneDisposant',
  tableName: MODULE_TABLE_PREFIX + 'personnes_disposants',
  timestamps: true
})