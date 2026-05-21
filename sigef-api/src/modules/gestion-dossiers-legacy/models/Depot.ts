import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { PartiePrenante } from "./PartiePrenante";
import { PieceDeposee } from "./PieceDeposee";
import { TypeDepot } from "./TypeDepot";
import { TypeOperationPostImmatriculation } from "./TypeOperationPostImmatriculation";
import { DepotTitreFoncier } from "./DepotTitreFoncier";
import { StatutsDepot } from "../../../core/enums/StatutsDepot";
import { DonneeIndexation } from "../../indexation/models/DonneeIndexation";
import { ActeRegistre } from "./ActeRegistre";
import { FormalitePrealable } from "./FormalitePrealable";
import { TitreFoncier } from "./TitreFoncier";

export class Depot extends Model<InferAttributes<Depot>, InferCreationAttributes<Depot>> {
  declare id: CreationOptional<string>
  declare numeroRequisition: CreationOptional<string>
  declare dateDepotRequisition: CreationOptional<Date>
  declare statut: CreationOptional<string>
  declare informationsStatut: CreationOptional<string>
  declare designationDroitReel: CreationOptional<string>
  declare nombrePiecesDeposees: CreationOptional<number>
  declare montantOperation: CreationOptional<number>
  declare dateDepot: CreationOptional<Date>
  declare utilisateurId: ForeignKey<Utilisateur['id']>
  declare utilisateur?: NonAttribute<Utilisateur>
  declare typeDepotId: ForeignKey<TypeDepot['id']>
  declare typeDepot?: NonAttribute<TypeDepot>
  declare typeOperationPostImmatriculationId: ForeignKey<TypeOperationPostImmatriculation['id']>
  declare typeOperationPostImmatriculation?: NonAttribute<TypeOperationPostImmatriculation>
  declare acteRegistreId: ForeignKey<ActeRegistre['id']>
  declare acteRegistre?: NonAttribute<ActeRegistre>
  declare formalitePrealableId: ForeignKey<FormalitePrealable['id']>
  declare formalitePrealable?: NonAttribute<FormalitePrealable>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  declare partiesPrenantes?: NonAttribute<PartiePrenante[]>
  declare piecesDeposees?: NonAttribute<PieceDeposee[]>
  declare depotsTitresFonciers?: NonAttribute<DepotTitreFoncier[]>

  declare donneeIndexation?: NonAttribute<DonneeIndexation>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    utilisateur: Association<Depot, Utilisateur>,
    partiesPrenantes: Association<Depot, PartiePrenante>,
    piecesDeposees: Association<Depot, PieceDeposee>,
    typeDepot: Association<Depot, TypeDepot>,
    typeOperationPostImmatriculation: Association<Depot, TypeOperationPostImmatriculation>,
    depotsTitresFonciers: Association<Depot, DepotTitreFoncier>,
    donneeIndexation: Association<Depot, DonneeIndexation>,
    acteRegistre: Association<Depot, ActeRegistre>,
    formalitePrealable: Association<Depot, FormalitePrealable>,
    titreFoncier: Association<Depot, TitreFoncier>,
  }
}

Depot.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numeroRequisition: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  dateDepotRequisition: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  statut: {
    type: DataTypes.ENUM,
    values: [StatutsDepot.A_VALIDER, StatutsDepot.VALIDE, StatutsDepot.ANNULE],
    defaultValue: StatutsDepot.A_VALIDER
  },
  informationsStatut: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  designationDroitReel: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  nombrePiecesDeposees: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  montantOperation: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  dateDepot: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'Depot',
  tableName: MODULE_TABLE_PREFIX + 'depots',
  timestamps: true
})