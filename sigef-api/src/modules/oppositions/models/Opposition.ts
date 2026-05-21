import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../OppositionsModule";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { StatutsOpposition } from "../../../core/enums/StatutsOpposition";
import type { OppositionPartiePrenante } from "./PartiePrenante";
import type { OppositionRequisition } from "./OppositionRequisition";

export class Opposition extends Model<InferAttributes<Opposition>, InferCreationAttributes<Opposition>> {
  declare id: CreationOptional<number>
  declare statut: CreationOptional<string>
  declare informationsStatut: CreationOptional<string>
  declare description: CreationOptional<string>
  declare designationDroitReel: CreationOptional<string>
  declare dateOpposition: CreationOptional<Date>
  declare dateMainLevee: CreationOptional<Date>
  
  declare utilisateurId: ForeignKey<Utilisateur['id']>
  declare utilisateur?: NonAttribute<Utilisateur>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare partiesPrenantes?: NonAttribute<OppositionPartiePrenante[]>
  declare requisitions?: NonAttribute<OppositionRequisition[]>

  declare static associations: {
    partiesPrenantes: Association<Opposition, OppositionPartiePrenante>,
    requisitions: Association<Opposition, OppositionRequisition>,
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
    type: DataTypes.STRING,
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
  utilisateurId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'Opposition',
  tableName: MODULE_TABLE_PREFIX + 'oppositions',
  timestamps: true
})
