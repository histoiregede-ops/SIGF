import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { PartiePrenante } from "./PartiePrenante";
import { PieceDeposee } from "./PieceDeposee";
import { OppositionRequisition } from "./OppositionRequisition";
import { StatutsOpposition } from "../../../core/enums/StatutsOpposition";
import { DonneeIndexation } from "../../indexation/models/DonneeIndexation";
import { ActeRegistre } from "./ActeRegistre";

export class Opposition extends Model<InferAttributes<Opposition>, InferCreationAttributes<Opposition>> {
  declare id: CreationOptional<string>
  declare statut: CreationOptional<string>
  declare informationsStatut: CreationOptional<string>
  declare description: CreationOptional<string>
  declare designationDroitReel: CreationOptional<string>
  declare nombrePiecesDeposees: CreationOptional<number>
  declare dateOpposition: CreationOptional<Date>
  declare dateMainLevee: CreationOptional<Date>
  declare utilisateurId: ForeignKey<Utilisateur['id']>
  declare utilisateur?: NonAttribute<Utilisateur>
  declare acteRegistreId: ForeignKey<ActeRegistre['id']>
  declare acteRegistre?: NonAttribute<ActeRegistre>

  declare partiesPrenantes?: NonAttribute<PartiePrenante[]>
  declare piecesDeposees?: NonAttribute<PieceDeposee[]>
  declare oppositionsRequisitions?: NonAttribute<OppositionRequisition[]>

  declare donneeIndexation?: NonAttribute<DonneeIndexation>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    utilisateur: Association<Opposition, Utilisateur>,
    partiesPrenantes: Association<Opposition, PartiePrenante>,
    piecesDeposees: Association<Opposition, PieceDeposee>,
    oppositionsRequisitions: Association<Opposition, OppositionRequisition>,
    donneeIndexation: Association<Opposition, DonneeIndexation>,
    acteRegistre: Association<Opposition, ActeRegistre>,
  }
}

Opposition.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  statut: {
    type: DataTypes.ENUM,
    values: [StatutsOpposition.A_VALIDER, StatutsOpposition.RECEVABLE, StatutsOpposition.REJETEE, StatutsOpposition.LEVEE],
    defaultValue: StatutsOpposition.A_VALIDER
  },
  informationsStatut: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  designationDroitReel: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  nombrePiecesDeposees: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  dateOpposition: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateMainLevee: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'Opposition',
  tableName: MODULE_TABLE_PREFIX + 'oppositions',
  timestamps: true
})