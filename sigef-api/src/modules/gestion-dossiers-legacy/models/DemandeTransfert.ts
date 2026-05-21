import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association, NOW } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { StatutsDemandeTransfert } from "../../../core/enums/StatutsDemandeTransfert";
import { DemandeTransfertActeRegistre } from "./DemandeTransfertActeRegistre";
import { CentreConservationFonciere } from "../../auth/models/CentreConservationFonciere";
import { TypeRegistre } from "../../commun/models/TypeRegistre";

export class DemandeTransfert extends Model<InferAttributes<DemandeTransfert>, InferCreationAttributes<DemandeTransfert>> {
  declare id: CreationOptional<string>
  declare message: CreationOptional<string>
  declare reponse: CreationOptional<string>
  declare statut: CreationOptional<StatutsDemandeTransfert>
  declare dateDemande: CreationOptional<Date>
  declare dateTraitement: CreationOptional<Date>

  declare typeRegistreId: ForeignKey<TypeRegistre['id']>
  declare typeRegistre?: NonAttribute<TypeRegistre>
  declare centreConservationFonciereId: ForeignKey<CentreConservationFonciere['id']>
  declare centreConservationFonciere?: NonAttribute<CentreConservationFonciere>
  declare utilisateurDemandeId: ForeignKey<Utilisateur['id']>
  declare utilisateurDemande?: NonAttribute<Utilisateur>
  declare utilisateurTraitementId: ForeignKey<Utilisateur['id']>
  declare utilisateurTraitement?: NonAttribute<Utilisateur>
  declare demandeTransfertActesRegistres?: NonAttribute<DemandeTransfertActeRegistre[]>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    centreConservationFonciere: Association<DemandeTransfert, CentreConservationFonciere>,
    utilisateurDemande: Association<DemandeTransfert, Utilisateur>,
    utilisateurTraitement: Association<DemandeTransfert, Utilisateur>,
    demandeTransfertActesRegistres: Association<DemandeTransfert, DemandeTransfertActeRegistre>
  }
}

DemandeTransfert.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  message: {
    type: new DataTypes.STRING, 
    allowNull: true,
  },
  reponse: {
    type: new DataTypes.STRING, 
    allowNull: true,
  },
  statut: {
    type: DataTypes.ENUM,
    values: [StatutsDemandeTransfert.A_TRAITER, StatutsDemandeTransfert.EN_COURS, StatutsDemandeTransfert.TRAITEE, StatutsDemandeTransfert.ANNULEE, StatutsDemandeTransfert.REJETEE],
    defaultValue: StatutsDemandeTransfert.A_TRAITER,
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
  modelName:  MODULE_MODEL_PREFIX + 'DemandeTransfert',
  tableName:  MODULE_TABLE_PREFIX + 'demandes_transferts',
  timestamps: true
})