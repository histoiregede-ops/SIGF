import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../IndexationModule";
import { TacheIndexation } from "./TacheIndexation";
import { QualiteDocument } from "../../commun/models/QualiteDocument";
import { DonneeIndexation } from "./DonneeIndexation";
import { EtatsProgressionIndexation } from "../../../core/enums/EtatsProgressionIndexation";
import { Utilisateur } from "../../auth/models/Utilisateur";

export class ProgressionTacheIndexation extends Model<InferAttributes<ProgressionTacheIndexation>, InferCreationAttributes<ProgressionTacheIndexation>> {
  declare id: CreationOptional<number>
  declare page: number
  declare etat: CreationOptional<EtatsProgressionIndexation>
  declare motifRejet: CreationOptional<string>
  declare commentaire: CreationOptional<string>
  declare tacheIndexationId: ForeignKey<TacheIndexation['id']>
  declare tacheIndexation?: NonAttribute<TacheIndexation>
  declare qualiteDocumentId: ForeignKey<QualiteDocument['id']>
  declare qualiteDocument?: NonAttribute<QualiteDocument>

  declare dateSaisie: CreationOptional<Date>
  declare dateControle: CreationOptional<Date>
  declare indexeurUtilisateurId: ForeignKey<Utilisateur['id']>
  declare indexeurUtilisateur?: NonAttribute<Utilisateur>
  declare controleurUtilisateurId: ForeignKey<Utilisateur['id']>
  declare controleurUtilisateur?: NonAttribute<Utilisateur>

  declare donneeIndexation?: NonAttribute<DonneeIndexation>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    tacheIndexation: Association<ProgressionTacheIndexation, TacheIndexation>,
    qualiteDocument: Association<ProgressionTacheIndexation, QualiteDocument>,
    donneeIndexation: Association<ProgressionTacheIndexation, DonneeIndexation>,
    indexeurUtilisateur: Association<ProgressionTacheIndexation, Utilisateur>,
    controleurUtilisateur: Association<ProgressionTacheIndexation, Utilisateur>,
  }
}

ProgressionTacheIndexation.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  page: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  etat: {
    type: DataTypes.ENUM,
    values: [EtatsProgressionIndexation.INDEXE, EtatsProgressionIndexation.SIGNALE, EtatsProgressionIndexation.REJETE, EtatsProgressionIndexation.VALIDE],
    allowNull: false,
    defaultValue: EtatsProgressionIndexation.INDEXE
  },
  motifRejet: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  commentaire: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dateSaisie: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dateControle: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'ProgressionTacheIndexation',
  tableName:  MODULE_TABLE_PREFIX + 'progressions',
  timestamps: true
})