import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../IndexationModule";
import { EtatsSaisieIndexation, EtatsControleIndexation } from "../../../core/enums/EtatsIndexation";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { Fichier } from "./Fichier";
import { ProgressionTacheIndexation } from "./ProgressionTacheIndexation";

export class TacheIndexation extends Model<InferAttributes<TacheIndexation>, InferCreationAttributes<TacheIndexation>> {
  declare id: CreationOptional<number>
  declare etatSaisie: CreationOptional<EtatsSaisieIndexation>
  declare etatControle: CreationOptional<EtatsControleIndexation>
  declare fichierId: ForeignKey<Fichier['id']>
  declare fichier?: NonAttribute<Fichier>
  declare dateAttributionSaisie: CreationOptional<Date>
  declare dateAttributionControle: CreationOptional<Date>
  declare indexeurUtilisateurId: ForeignKey<Utilisateur['id']>
  declare indexeurUtilisateur?: NonAttribute<Utilisateur>
  declare controleurUtilisateurId: ForeignKey<Utilisateur['id']>
  declare controleurUtilisateur?: NonAttribute<Utilisateur>
  declare progressionsTacheIndexation?: NonAttribute<ProgressionTacheIndexation[]>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    fichier: Association<TacheIndexation, Fichier>,
    indexeurUtilisateur: Association<TacheIndexation, Utilisateur>,
    controleurUtilisateur: Association<TacheIndexation, Utilisateur>,
    progressionsTacheIndexation: Association<TacheIndexation, ProgressionTacheIndexation>,
  }
}

TacheIndexation.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  etatSaisie: {
    type: DataTypes.ENUM,
    values: [EtatsSaisieIndexation.A_INDEXER, EtatsSaisieIndexation.EN_COURS, EtatsSaisieIndexation.INDEXE],
    allowNull: false,
    defaultValue: EtatsSaisieIndexation.A_INDEXER
  },
  etatControle: {
    type: DataTypes.ENUM,
    values: [EtatsControleIndexation.EN_ATTENTE, EtatsControleIndexation.A_CONTROLER, EtatsControleIndexation.EN_COURS, EtatsControleIndexation.CONTROLE],
    allowNull: false,
    defaultValue: EtatsControleIndexation.A_CONTROLER
  },
  dateAttributionSaisie: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dateAttributionControle: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'TacheIndexation',
  tableName:  MODULE_TABLE_PREFIX + 'taches_indexation',
  timestamps: true
})