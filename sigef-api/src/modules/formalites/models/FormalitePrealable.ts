import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../FormalitesModule";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { StatutsFormalitePrealable } from "../../../core/enums/StatutsFormalitePrealable";

export class FormalitePrealable extends Model<InferAttributes<FormalitePrealable>, InferCreationAttributes<FormalitePrealable>> {
  declare id: CreationOptional<number>
  declare numeroRequisition: string
  declare statut: CreationOptional<string>
  declare informationsStatut: CreationOptional<string>
  declare dateDeDepot: CreationOptional<Date>
  declare dateForclusion: CreationOptional<Date>
  declare dateRemisePieces: CreationOptional<Date>
  
  declare utilisateurId: ForeignKey<Utilisateur['id']>
  declare utilisateur?: NonAttribute<Utilisateur>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

FormalitePrealable.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  numeroRequisition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statut: {
    type: DataTypes.ENUM,
    values: [StatutsFormalitePrealable.A_VALIDER, StatutsFormalitePrealable.VALIDEE, StatutsFormalitePrealable.REJETEE, StatutsFormalitePrealable.ANNULEE, StatutsFormalitePrealable.SUSPENDUE],
    defaultValue: StatutsFormalitePrealable.A_VALIDER
  },
  informationsStatut: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dateDeDepot: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateForclusion: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateRemisePieces: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  utilisateurId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'FormalitePrealable',
  tableName: MODULE_TABLE_PREFIX + 'formalites_prealables',
  timestamps: true
})
