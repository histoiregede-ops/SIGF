import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../TitresFonciersModule";
import { TitreFoncier } from "./TitreFoncier";

export class PrivilegeHypotheque extends Model<InferAttributes<PrivilegeHypotheque>, InferCreationAttributes<PrivilegeHypotheque>> {
  declare id: CreationOptional<number>
  declare dateInscription: Date
  declare annee: number
  declare quinzaine: number
  declare naturePrivilege: string
  declare designationDroitConstitue: string
  declare creancierBeneficiaire: string
  declare sommeGarantie: number
  declare dateRadiation: CreationOptional<Date>
  declare anneeRadiation: CreationOptional<number>
  declare quinzaineRadiation: CreationOptional<number>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

PrivilegeHypotheque.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  dateInscription: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  annee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quinzaine: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  naturePrivilege: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designationDroitConstitue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creancierBeneficiaire: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sommeGarantie: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dateRadiation: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  anneeRadiation: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  quinzaineRadiation: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  titreFoncierId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'PrivilegeHypotheque',
  tableName: MODULE_TABLE_PREFIX + 'privileges_hypotheques',
  timestamps: true
})
