import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { FormalitePrealable } from "./FormalitePrealable";
import { NatureEtatImmeuble } from "./NatureEtatImmeuble";
import { NatureTypeImmeuble } from "./NatureTypeImmeuble";

export class InformationsPropriete extends Model<InferAttributes<InformationsPropriete>, InferCreationAttributes<InformationsPropriete>> {
  declare id: CreationOptional<string>
  declare description: CreationOptional<string>
  declare contenanceEnHectare: CreationOptional<number>
  declare contenanceEnAre: CreationOptional<number>
  declare contenanceEnCentiare: CreationOptional<number>
  declare valeurVenale: CreationOptional<number>
  declare valeurLocative: CreationOptional<number>

  declare natureTypeImmeubleId: ForeignKey<NatureTypeImmeuble['id']>
  declare natureTypeImmeuble?: NonAttribute<NatureTypeImmeuble>
  declare natureEtatImmeubleId: ForeignKey<NatureEtatImmeuble['id']>
  declare natureEtatImmeuble?: NonAttribute<NatureEtatImmeuble>
  declare formalitePrealableId: ForeignKey<FormalitePrealable['id']>
  declare formalitePrealable?: NonAttribute<FormalitePrealable>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    natureTypeImmeuble: Association<InformationsPropriete, NatureTypeImmeuble>,
    natureEtatImmeuble: Association<InformationsPropriete, NatureEtatImmeuble>,
    formalitePrealable: Association<InformationsPropriete, FormalitePrealable>,
  }
}

InformationsPropriete.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  contenanceEnHectare: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  contenanceEnAre: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  contenanceEnCentiare: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  valeurVenale: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  valeurLocative: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'InformationsPropriete',
  tableName: MODULE_TABLE_PREFIX + 'informations_propriete',
  timestamps: true
})