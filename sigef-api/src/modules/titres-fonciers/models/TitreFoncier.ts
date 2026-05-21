import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../TitresFonciersModule";
import { Utilisateur } from "../../../modules/auth/models/Utilisateur";
// import { ActeRegistre } from "../../../modules/actes-registres/models/ActeRegistre"; // Future module - commented to avoid import error
import { StatutsTitreFoncier } from "../../../core/enums/StatutsTitreFoncier";
import { ProcessusCreationTitreFoncier } from "../../../core/enums/ProcessusCreationTitreFoncier";

import { Augmentation } from "./Augmentation";
import { Diminution } from "./Diminution";
import { DroitReelConstitue } from "./DroitReelConstitue";
import { CauseIndisponibilite } from "./CauseIndisponibilite";
import { Mutation } from "./Mutation";
import { PrivilegeHypotheque } from "./PrivilegeHypotheque";

export class TitreFoncier extends Model<InferAttributes<TitreFoncier>, InferCreationAttributes<TitreFoncier>> {
  declare id: CreationOptional<number>;
  declare numeroPrefixe: string;
  declare numero: number | null;
  declare numeroSuffixe: string | null;
  declare processusCreation: ProcessusCreationTitreFoncier;
  declare numeroRequisition: string | null;
  declare numeroTitreFoncierMorcelle: string | null;
  declare statut: StatutsTitreFoncier;
  declare informationsStatut: string | null;
  declare natureConsistanceImmeuble: string | null;
  declare contenanceEnHectare: number | null;
  declare contenanceEnAre: number | null;
  declare contenanceEnCentiare: number | null;
  declare nupParcelleAssise: string | null;
  declare titreParcelleAssise: string | null;
  declare numeroLot: string | null;
  declare numeroVolume: string | null;
  declare affectation: string | null;
  declare modificationDescription: string | null;
  declare descriptionPartiesCommunes: string | null;

  declare utilisateurId: ForeignKey<Utilisateur['id']>;
  declare utilisateur?: NonAttribute<Utilisateur>;
  declare acteRegistreId: number | null;
  declare acteRegistre?: NonAttribute<any>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  declare augmentations?: NonAttribute<Augmentation[]>;
  declare diminutions?: NonAttribute<Diminution[]>;
  declare droitsReels?: NonAttribute<DroitReelConstitue[]>;
  declare causesIndisponibilite?: NonAttribute<CauseIndisponibilite[]>;
  declare mutations?: NonAttribute<Mutation[]>;
  declare privilegesHypotheques?: NonAttribute<PrivilegeHypotheque[]>;

  declare static associations: {
    augmentations: Association<TitreFoncier, Augmentation>;
    diminutions: Association<TitreFoncier, Diminution>;
    droitsReels: Association<TitreFoncier, DroitReelConstitue>;
    causesIndisponibilite: Association<TitreFoncier, CauseIndisponibilite>;
    mutations: Association<TitreFoncier, Mutation>;
    privilegesHypotheques: Association<TitreFoncier, PrivilegeHypotheque>;
  }
}

TitreFoncier.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numeroPrefixe: {
    type: DataTypes.STRING(3),
    allowNull: false,
  },
  numero: DataTypes.INTEGER,
  numeroSuffixe: DataTypes.STRING(2),
  processusCreation: {
    type: DataTypes.ENUM,
    values: Object.values(ProcessusCreationTitreFoncier),
    defaultValue: ProcessusCreationTitreFoncier.IMMATRICULATION
  },
  numeroRequisition: DataTypes.STRING,
  numeroTitreFoncierMorcelle: DataTypes.STRING,
  statut: {
    type: DataTypes.ENUM,
    values: Object.values(StatutsTitreFoncier),
    defaultValue: StatutsTitreFoncier.A_COMPLETER
  },
  informationsStatut: DataTypes.TEXT,
  natureConsistanceImmeuble: DataTypes.TEXT,
  contenanceEnHectare: DataTypes.FLOAT,
  contenanceEnAre: DataTypes.FLOAT,
  contenanceEnCentiare: DataTypes.FLOAT,
  nupParcelleAssise: DataTypes.STRING,
  titreParcelleAssise: DataTypes.STRING,
  numeroLot: DataTypes.STRING,
  numeroVolume: DataTypes.STRING,
  affectation: DataTypes.TEXT,
  modificationDescription: DataTypes.TEXT,
  descriptionPartiesCommunes: DataTypes.TEXT,
  acteRegistreId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
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
  modelName: `${MODULE_MODEL_PREFIX}TitreFoncier`,
  tableName: `${MODULE_TABLE_PREFIX}titres_fonciers`,
  timestamps: true
});

// Associations
TitreFoncier.hasMany(Augmentation, { foreignKey: 'titreFoncierId', as: 'augmentations' });
Augmentation.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' });

TitreFoncier.hasMany(Diminution, { foreignKey: 'titreFoncierId', as: 'diminutions' });
Diminution.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' });

TitreFoncier.hasMany(DroitReelConstitue, { foreignKey: 'titreFoncierId', as: 'droitsReels' });
DroitReelConstitue.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' });

TitreFoncier.hasMany(CauseIndisponibilite, { foreignKey: 'titreFoncierId', as: 'causesIndisponibilite' });
CauseIndisponibilite.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' });

TitreFoncier.hasMany(Mutation, { foreignKey: 'titreFoncierId', as: 'mutations' });
Mutation.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' });

TitreFoncier.hasMany(PrivilegeHypotheque, { foreignKey: 'titreFoncierId', as: 'privilegesHypotheques' });
PrivilegeHypotheque.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' });

