import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { Limite } from "./Limite";
import { SituationPropriete } from "./SituationPropriete";
import { Augmentation } from "./Augmentation";
import { Diminution } from "./Diminution";
import { DroitReelConstitueParDenombrement } from "./DroitReelConstitueParDenombrement";
import { PrivilegeHypotheque } from "./PrivilegeHypotheque";
import { CauseIndisponibilite } from "./CauseIndisponibilite";
import { OppositionCasInscriptionDifferee } from "./OppositionCasInscriptionDifferee";
import { Mutation } from "./Mutation";
import { StatutsTitreFoncier } from "../../../core/enums/StatutsTitreFoncier";
import { ProcessusCreationTitreFoncier } from "../../../core/enums/ProcessusCreationTitreFoncier";
import { SituationFiscale } from "./SituationFiscale";
import { DivisionEnVolume } from "./DivisionEnVolume";
import { DivisionEnLot } from "./DivisionEnLot";
import { DonneeIndexation } from "../../indexation/models/DonneeIndexation";
import { ActeRegistre } from "./ActeRegistre";

export class TitreFoncier extends Model<InferAttributes<TitreFoncier>, InferCreationAttributes<TitreFoncier>> {
  declare id: CreationOptional<string>
  declare numeroPrefixe: string
  declare numero: number
  declare numeroSuffixe: CreationOptional<string>
  declare processusCreation: CreationOptional<ProcessusCreationTitreFoncier>
  declare numeroRequisition: CreationOptional<string>
  declare numeroTitreFoncierMorcelle: CreationOptional<string>
  declare statut: CreationOptional<string>
  declare informationsStatut: CreationOptional<string>
  declare natureConsistanceImmeuble: CreationOptional<string>
  declare contenanceEnHectare: CreationOptional<number>
  declare contenanceEnAre: CreationOptional<number>
  declare contenanceEnCentiare: CreationOptional<number>

  declare nupParcelleAssise: CreationOptional<string>
  declare titreParcelleAssise: CreationOptional<string>
  declare numeroLot: CreationOptional<string>
  declare numeroVolume: CreationOptional<string>
  declare affectation: CreationOptional<string>
  declare modificationDescription: CreationOptional<string>
  declare descriptionPartiesCommunes: CreationOptional<string>

  declare utilisateurId: ForeignKey<Utilisateur['id']>
  declare utilisateur?: NonAttribute<Utilisateur>
  declare acteRegistreId: ForeignKey<ActeRegistre['id']>
  declare acteRegistre?: NonAttribute<ActeRegistre>

  declare limitesTitreFoncier?: NonAttribute<Limite[]>
  declare situationPropriete?: NonAttribute<SituationPropriete>
  declare augmentations?: NonAttribute<Augmentation[]>
  declare diminutions?: NonAttribute<Diminution[]>
  declare droitsReelsConstituesParDenombrement?: NonAttribute<DroitReelConstitueParDenombrement[]>
  declare privilegesHypotheques?: NonAttribute<PrivilegeHypotheque[]>
  declare causesIndisponibilite?: NonAttribute<CauseIndisponibilite[]>
  declare oppositionsCasInscriptionDifferee?: NonAttribute<OppositionCasInscriptionDifferee[]>
  declare mutations?: NonAttribute<Mutation[]>
  declare situationsFiscales?: NonAttribute<SituationFiscale[]>
  declare divisionsEnVolumes?: NonAttribute<DivisionEnVolume[]>
  declare divisionsEnLots?: NonAttribute<DivisionEnLot[]>

  declare donneeIndexation?: NonAttribute<DonneeIndexation>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    limitesTitreFoncier: Association<TitreFoncier, Limite>,
    situationPropriete: Association<TitreFoncier, SituationPropriete>,
    augmentations: Association<TitreFoncier, Augmentation>,
    diminutions: Association<TitreFoncier, Diminution>,
    droitsReelsConstituesParDenombrement: Association<TitreFoncier, DroitReelConstitueParDenombrement>
    privilegesHypotheques: Association<TitreFoncier, PrivilegeHypotheque>
    causesIndisponibilite: Association<TitreFoncier, CauseIndisponibilite>
    oppositionsCasInscriptionDifferee: Association<TitreFoncier, OppositionCasInscriptionDifferee>
    mutations: Association<TitreFoncier, Mutation>
    situationsFiscales: Association<TitreFoncier, SituationFiscale>
    divisionsEnVolumes: Association<TitreFoncier, DivisionEnVolume>
    divisionsEnLots: Association<TitreFoncier, DivisionEnLot>
  
    donneeIndexation: Association<TitreFoncier, DonneeIndexation>,
    utilisateur: Association<TitreFoncier, Utilisateur>,
    acteRegistre: Association<TitreFoncier, ActeRegistre>,
  }
}

TitreFoncier.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numeroPrefixe: {
    type: new DataTypes.STRING(3),
    allowNull: false,
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  numeroSuffixe: {
    type: new DataTypes.STRING(2),
    allowNull: true,
  },
  processusCreation: {
    type: DataTypes.ENUM,
    values: [ProcessusCreationTitreFoncier.IMMATRICULATION, ProcessusCreationTitreFoncier.MORCELLEMENT, ProcessusCreationTitreFoncier.COPROPRIETE],
    defaultValue: ProcessusCreationTitreFoncier.IMMATRICULATION
  },
  numeroRequisition: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  numeroTitreFoncierMorcelle: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  statut: {
    type: DataTypes.ENUM,
    values: [StatutsTitreFoncier.A_COMPLETER, StatutsTitreFoncier.A_VALIDER, StatutsTitreFoncier.VALIDE, StatutsTitreFoncier.ANNULE],
    defaultValue: StatutsTitreFoncier.A_COMPLETER
  },
  informationsStatut: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  natureConsistanceImmeuble: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  contenanceEnHectare: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  contenanceEnAre: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  contenanceEnCentiare: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  
  nupParcelleAssise: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  titreParcelleAssise: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  numeroLot: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  numeroVolume: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  affectation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  modificationDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  descriptionPartiesCommunes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'TitreFoncier',
  tableName:  MODULE_TABLE_PREFIX + 'titres_fonciers',
  timestamps: true
})