import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../DepotsModule";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { StatutsDepot } from "../../../core/enums/StatutsDepot";
import type { DepotPartiePrenante } from "./PartiePrenante";

export class Depot extends Model<InferAttributes<Depot>, InferCreationAttributes<Depot>> {
  declare id: CreationOptional<number>
  declare numeroRequisition: CreationOptional<string>
  declare statut: CreationOptional<string>
  declare informationsStatut: CreationOptional<string>
  declare designationDroitReel: CreationOptional<string>
  declare montantOperation: CreationOptional<number>
  declare dateDepot: CreationOptional<Date>
  
  declare utilisateurId: ForeignKey<Utilisateur['id']>
  declare utilisateur?: NonAttribute<Utilisateur>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare partiesPrenantes?: NonAttribute<DepotPartiePrenante[]>

  declare static associations: {
    partiesPrenantes: Association<Depot, DepotPartiePrenante>,
  }
}

Depot.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  numeroRequisition: {
    type: DataTypes.STRING,
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
  montantOperation: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  dateDepot: {
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
  modelName: MODULE_MODEL_PREFIX + 'Depot',
  tableName: MODULE_TABLE_PREFIX + 'depots',
  timestamps: true
})
