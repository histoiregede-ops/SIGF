import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../TitresFonciersModule";
import { TitreFoncier } from "./TitreFoncier";

export class CauseIndisponibilite extends Model<InferAttributes<CauseIndisponibilite>, InferCreationAttributes<CauseIndisponibilite>> {
  declare id: CreationOptional<number>
  declare dateInscription: Date
  declare annee: number
  declare quinzaine: number
  declare causeIndisponibilite: string
  declare indicationsObservations: CreationOptional<string>
  declare dateLiberation: CreationOptional<Date>
  declare anneeLiberation: CreationOptional<number>
  declare quinzaineLiberation: CreationOptional<number>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

CauseIndisponibilite.init({
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
  causeIndisponibilite: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  indicationsObservations: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dateLiberation: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  anneeLiberation: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  quinzaineLiberation: {
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
  modelName: MODULE_MODEL_PREFIX + 'CauseIndisponibilite',
  tableName: MODULE_TABLE_PREFIX + 'causes_indisponibilite',
  timestamps: true
})
