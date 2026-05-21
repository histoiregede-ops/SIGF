import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { TitreFoncier } from "./TitreFoncier";

export class PrivilegeHypotheque extends Model<InferAttributes<PrivilegeHypotheque>, InferCreationAttributes<PrivilegeHypotheque>> {
  declare id: CreationOptional<string>
  declare numeroBordereauAnalytiqueConstitution: CreationOptional<string>
  declare dateInscription: CreationOptional<Date>
  declare designationDroitConstitue: CreationOptional<string>
  declare beneficiaire: CreationOptional<string>
  declare montantCharge: CreationOptional<number>
  declare numeroBordereauAnalytiqueRadiation: CreationOptional<string>
  declare dateRadiation: CreationOptional<Date>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    titreFoncier: Association<PrivilegeHypotheque, TitreFoncier>
  }
}

PrivilegeHypotheque.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numeroBordereauAnalytiqueConstitution: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  dateInscription: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  designationDroitConstitue: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  beneficiaire: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  montantCharge: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  numeroBordereauAnalytiqueRadiation: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  dateRadiation: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'PrivilegeHypotheque',
  tableName:  MODULE_TABLE_PREFIX + 'privileges_hypotheques',
  timestamps: true
})