import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { TypeLienGroupe } from "../../commun/models/TypeLienGroupe";
import { PersonneMembre } from "./PersonneMembre";
import { PartiePrenante } from "./PartiePrenante";

export class GroupePersonnePhysique extends Model<InferAttributes<GroupePersonnePhysique>, InferCreationAttributes<GroupePersonnePhysique>> {
  declare id: CreationOptional<string>
  declare personnesMembres?: NonAttribute<PersonneMembre[]>
  declare typeLienGroupeId: ForeignKey<TypeLienGroupe['id']>
  declare typeLienGroupe?: NonAttribute<TypeLienGroupe>
  declare partiePrenanteId: ForeignKey<PartiePrenante['id']>
  declare partiePrenante?: NonAttribute<PartiePrenante>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    typeLienGroupe: Association<GroupePersonnePhysique, TypeLienGroupe>,
    personnesMembres: Association<GroupePersonnePhysique, PersonneMembre>,
    partiePrenante: Association<GroupePersonnePhysique, PartiePrenante>,
  }
}

GroupePersonnePhysique.init({
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
  modelName: MODULE_MODEL_PREFIX + 'GroupePersonnePhysique',
  tableName: MODULE_TABLE_PREFIX + 'groupes_personnes_physiques',
  timestamps: true
})