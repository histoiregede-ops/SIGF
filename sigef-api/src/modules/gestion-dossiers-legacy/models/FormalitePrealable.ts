import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { InformationsPropriete } from "./InformationsPropriete";
import { SituationPropriete } from "./SituationPropriete";
import { PublicationDemandes } from "./PublicationDemandes";
import { Bornage } from "./Bornage";
import { ProcedureJudiciaire } from "./ProcedureJudiciaire";
import { PartiePrenante } from "./PartiePrenante";
import { StatutsFormalitePrealable } from "../../../core/enums/StatutsFormalitePrealable";
import { PieceDeposee } from "./PieceDeposee";
import { DonneeIndexation } from "../../indexation/models/DonneeIndexation";
import { ActeRegistre } from "./ActeRegistre";

export class FormalitePrealable extends Model<InferAttributes<FormalitePrealable>, InferCreationAttributes<FormalitePrealable>> {
  declare id: CreationOptional<string>
  declare numeroRequisition: CreationOptional<string>
  declare statut: CreationOptional<string>
  declare informationsStatut: CreationOptional<string>
  declare dateDeDepot: CreationOptional<Date>
  declare dateForclusion: CreationOptional<Date>
  declare nombrePiecesJointes: CreationOptional<Date>
  declare dateSommationDepotDePieces: CreationOptional<Date>
  declare dateDepotDepotDePieces: CreationOptional<Date>
  declare nombreCopiesTitresFonciersEtablies: CreationOptional<number>
  declare nombreCertificatsInscriptionEtablis: CreationOptional<number>
  declare dateRemisePieces: CreationOptional<Date>
  declare utilisateurId: ForeignKey<Utilisateur['id']>
  declare utilisateur?: NonAttribute<Utilisateur>
  declare acteRegistreId: ForeignKey<ActeRegistre['id']>
  declare acteRegistre?: NonAttribute<ActeRegistre>

  declare partiesPrenantes?: NonAttribute<PartiePrenante[]>
  declare informationsPropriete?: NonAttribute<InformationsPropriete>
  declare situationPropriete?: NonAttribute<SituationPropriete>
  declare publicationDemandes?: NonAttribute<PublicationDemandes>
  declare bornage?: NonAttribute<Bornage>
  declare procedureJudiciaire?: NonAttribute<ProcedureJudiciaire>

  declare piecesDeposees?: NonAttribute<PieceDeposee[]>

  declare donneeIndexation?: NonAttribute<DonneeIndexation>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    partiesPrenantes: Association<FormalitePrealable, PartiePrenante>,
    informationsPropriete: Association<FormalitePrealable, InformationsPropriete>,
    situationPropriete: Association<FormalitePrealable, SituationPropriete>,
    publicationDemandes: Association<FormalitePrealable, PublicationDemandes>,
    bornage: Association<FormalitePrealable, Bornage>,
    procedureJudiciaire: Association<FormalitePrealable, ProcedureJudiciaire>,
    
    piecesDeposees: Association<FormalitePrealable, PieceDeposee>,
    donneeIndexation: Association<FormalitePrealable, DonneeIndexation>,
    utilisateur: Association<FormalitePrealable, Utilisateur>,
    acteRegistre: Association<FormalitePrealable, ActeRegistre>,
  }
}

FormalitePrealable.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  numeroRequisition: {
    type: new DataTypes.STRING,
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
  nombrePiecesJointes: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  dateSommationDepotDePieces: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateDepotDepotDePieces: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  nombreCopiesTitresFonciersEtablies: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  nombreCertificatsInscriptionEtablis: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  dateRemisePieces: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'FormalitePrealable',
  tableName: MODULE_TABLE_PREFIX + 'formalites_prealables',
  timestamps: true
})