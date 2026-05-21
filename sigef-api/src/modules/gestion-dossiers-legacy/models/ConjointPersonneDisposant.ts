import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PersonnePhysique } from "./PersonnePhysique";
import { GroupeHeritiers } from "./GroupeHeritiers";
import { PersonneHeritiere } from "./PersonneHeritiere";

export class ConjointPersonneDisposant extends Model<InferAttributes<ConjointPersonneDisposant>, InferCreationAttributes<ConjointPersonneDisposant>> {
  declare id: CreationOptional<string>
  declare informationsDisponibles: CreationOptional<boolean>
  declare groupeHeritiersId: ForeignKey<GroupeHeritiers['id']>
  declare groupeHeritiers?: NonAttribute<GroupeHeritiers>
  declare personnePhysiqueId: ForeignKey<PersonnePhysique['id']>
  declare personnePhysique?: NonAttribute<PersonnePhysique>
  declare personnesHeritieres?: NonAttribute<PersonneHeritiere[]>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    groupeHeritiers: Association<ConjointPersonneDisposant, GroupeHeritiers>,
    personnePhysique: Association<ConjointPersonneDisposant, PersonnePhysique>,
    personnesHeritieres: Association<ConjointPersonneDisposant, PersonneHeritiere>,
  }
}

ConjointPersonneDisposant.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  informationsDisponibles: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'ConjointPersonneDisposant',
  tableName: MODULE_TABLE_PREFIX + 'conjoints_personnes_disposants',
  timestamps: true
})