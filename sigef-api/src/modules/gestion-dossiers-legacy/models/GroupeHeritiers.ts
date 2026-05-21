import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PersonneHeritiere } from "./PersonneHeritiere";
import { PartiePrenante } from "./PartiePrenante";
import { ConjointPersonneDisposant } from "./ConjointPersonneDisposant";
import { PersonneDisposant } from "./PersonneDisposant";

export class GroupeHeritiers extends Model<InferAttributes<GroupeHeritiers>, InferCreationAttributes<GroupeHeritiers>> {
  declare id: CreationOptional<string>
  declare termesSuccession: CreationOptional<string>
  declare description: CreationOptional<string>
  declare personneDisposant?: NonAttribute<PersonneDisposant>
  declare conjointsPersonneDisposant?: NonAttribute<ConjointPersonneDisposant[]>
  declare partiePrenanteId: ForeignKey<PartiePrenante['id']>
  declare partiePrenante?: NonAttribute<PartiePrenante>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    personneDisposant: Association<GroupeHeritiers, PersonneDisposant>,
    conjointsPersonneDisposant: Association<GroupeHeritiers, ConjointPersonneDisposant>,
    partiePrenante: Association<GroupeHeritiers, PartiePrenante>,
  }
}

GroupeHeritiers.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  termesSuccession: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'GroupeHeritiers',
  tableName: MODULE_TABLE_PREFIX + 'groupes_heritiers',
  timestamps: true
})