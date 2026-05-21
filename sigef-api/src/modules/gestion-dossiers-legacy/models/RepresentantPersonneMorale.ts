import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PersonnePhysique } from "./PersonnePhysique";
import { PersonneMorale } from "./PersonneMorale";

export class RepresentantPersonneMorale extends Model<InferAttributes<RepresentantPersonneMorale>, InferCreationAttributes<RepresentantPersonneMorale>> {
  declare id: CreationOptional<string>
  declare personneMoraleId: ForeignKey<PersonneMorale['id']>
  declare personneMorale?: NonAttribute<PersonneMorale>
  declare representantId: ForeignKey<PersonnePhysique['id']>
  declare representant?: NonAttribute<PersonnePhysique>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    personneMorale: Association<RepresentantPersonneMorale, PersonneMorale>,
    representant: Association<RepresentantPersonneMorale, PersonnePhysique>,
  }
}

RepresentantPersonneMorale.init({
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
  modelName: MODULE_MODEL_PREFIX + 'RepresentantPersonneMorale',
  tableName: MODULE_TABLE_PREFIX + 'representants_personne_morale',
  timestamps: true
})