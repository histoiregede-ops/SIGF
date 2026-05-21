import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PartiePrenante } from "./PartiePrenante";
import { TypeRelationLegale } from "../../commun/models/TypeRelationLegale";
import { PersonneCible } from "./PersonneCible";

export class PersonneRelationLegale extends Model<InferAttributes<PersonneRelationLegale>, InferCreationAttributes<PersonneRelationLegale>> {
  declare id: CreationOptional<string>
  declare personneCible?: NonAttribute<PersonneCible>
  declare typeRelationLegaleId: ForeignKey<TypeRelationLegale['id']>
  declare typeRelationLegale?: NonAttribute<TypeRelationLegale>
  declare partiePrenanteId: ForeignKey<PartiePrenante['id']>
  declare partiePrenante?: NonAttribute<PartiePrenante>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    typeRelationLegale: Association<PersonneRelationLegale, TypeRelationLegale>,
    personneCible: Association<PersonneRelationLegale, PersonneCible>,
    partiePrenante: Association<PersonneRelationLegale, PartiePrenante>,
  }
}

PersonneRelationLegale.init({
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
  modelName: MODULE_MODEL_PREFIX + 'PersonneRelationLegale',
  tableName: MODULE_TABLE_PREFIX + 'personnes_relation_legale',
  timestamps: true
})