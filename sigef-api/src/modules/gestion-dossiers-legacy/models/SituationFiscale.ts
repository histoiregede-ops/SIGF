import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { TitreFoncier } from "./TitreFoncier";

export class SituationFiscale extends Model<InferAttributes<SituationFiscale>, InferCreationAttributes<SituationFiscale>> {
  declare id: CreationOptional<string>
  declare annee: CreationOptional<string>
  declare valeurVenale: CreationOptional<number>
  declare valeurLocative: CreationOptional<number>
  declare exoneration: CreationOptional<number>
  declare taxeLiquidee: CreationOptional<number>
  declare taxePayee: CreationOptional<number>
  declare taxeRestanteDue: CreationOptional<number>

  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    titreFoncier: Association<SituationFiscale, TitreFoncier>,
  }
}

SituationFiscale.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  annee: {
    type: new DataTypes.STRING,
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
  exoneration: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  taxeLiquidee: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  taxePayee: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  taxeRestanteDue: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'SituationFiscale',
  tableName: MODULE_TABLE_PREFIX + 'situations_fiscales',
  timestamps: true
})