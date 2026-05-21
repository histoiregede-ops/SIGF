import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PersonnePhysique } from "./PersonnePhysique";
import { ConjointPersonneDisposant } from "./ConjointPersonneDisposant";

export class PersonneHeritiere extends Model<InferAttributes<PersonneHeritiere>, InferCreationAttributes<PersonneHeritiere>> {
  declare id: CreationOptional<string>
  declare personnePhysiqueId: ForeignKey<PersonnePhysique['id']>
  declare personnePhysique?: NonAttribute<PersonnePhysique>
  declare conjointPersonneDisposantId: ForeignKey<ConjointPersonneDisposant['id']>
  declare conjointPersonneDisposant?: NonAttribute<ConjointPersonneDisposant>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    personnePhysique: Association<PersonneHeritiere, PersonnePhysique>,
    conjointPersonneDisposant: Association<PersonneHeritiere, ConjointPersonneDisposant>,
  }
}

PersonneHeritiere.init({
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
  modelName: MODULE_MODEL_PREFIX + 'PersonneHeritiere',
  tableName: MODULE_TABLE_PREFIX + 'personnes_heritieres',
  timestamps: true
})