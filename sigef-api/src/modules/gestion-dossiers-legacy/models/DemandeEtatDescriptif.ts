import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association, NOW } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { StatutsDemandeEtatDescriptif } from "../../../core/enums/StatutsDemandeEtatDescriptif";
import { TitreFoncier } from "./TitreFoncier";

export class DemandeEtatDescriptif extends Model<InferAttributes<DemandeEtatDescriptif>, InferCreationAttributes<DemandeEtatDescriptif>> {
  declare id: CreationOptional<string>
  declare requerant: CreationOptional<string>
  declare reponse: CreationOptional<string>
  declare statut: CreationOptional<StatutsDemandeEtatDescriptif>
  declare dateDemande: CreationOptional<Date>
  declare dateTraitement: CreationOptional<Date>

  declare utilisateurDemandeId: ForeignKey<Utilisateur['id']>
  declare utilisateurDemande?: NonAttribute<Utilisateur>
  declare utilisateurTraitementId: ForeignKey<Utilisateur['id']>
  declare utilisateurTraitement?: NonAttribute<Utilisateur>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    utilisateurDemande: Association<DemandeEtatDescriptif, Utilisateur>,
    utilisateurTraitement: Association<DemandeEtatDescriptif, Utilisateur>,
    titreFoncier: Association<DemandeEtatDescriptif, TitreFoncier>,
  }
}

DemandeEtatDescriptif.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  requerant: {
    type: new DataTypes.STRING, 
    allowNull: true,
  },
  reponse: {
    type: new DataTypes.STRING, 
    allowNull: true,
  },
  statut: {
    type: DataTypes.ENUM,
    values: [StatutsDemandeEtatDescriptif.A_TRAITER, StatutsDemandeEtatDescriptif.EN_COURS, StatutsDemandeEtatDescriptif.TRAITEE, StatutsDemandeEtatDescriptif.ANNULEE, StatutsDemandeEtatDescriptif.REJETEE],
    defaultValue: StatutsDemandeEtatDescriptif.A_TRAITER,
    allowNull: false,
  },
  dateDemande: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: NOW,
  },
  dateTraitement: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'DemandeEtatDescriptif',
  tableName:  MODULE_TABLE_PREFIX + 'demandes_etats_descriptifs',
  timestamps: true
})