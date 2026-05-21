import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PartiePrenante } from "./PartiePrenante";
import { Opposition } from "./Opposition";
import { Depot } from "./Depot";
import { FormalitePrealable } from "./FormalitePrealable";

export class PieceDeposee extends Model<InferAttributes<PieceDeposee>, InferCreationAttributes<PieceDeposee>> {
  declare id: CreationOptional<string>
  declare nom: CreationOptional<string>
  declare description: CreationOptional<string>
  declare tailleEnOctets: CreationOptional<number>
  declare extension: CreationOptional<string>
  declare fichier: CreationOptional<string>
  declare formalitePrealableId: ForeignKey<FormalitePrealable['id']>
  declare formalitePrealable?: NonAttribute<FormalitePrealable>
  declare oppositionId: ForeignKey<Opposition['id']>
  declare opposition?: NonAttribute<Opposition>
  declare depotId: ForeignKey<Depot['id']>
  declare depot?: NonAttribute<Depot>

  declare partiesPrenantes?: NonAttribute<PartiePrenante[]>
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    formalitePrealable: Association<PieceDeposee, FormalitePrealable>,
    opposition: Association<PieceDeposee, Opposition>,
    depot: Association<PieceDeposee, Depot>,
  }
}

PieceDeposee.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  nom: {
    type: new DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  tailleEnOctets: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Exprimée en octets'
  },
  extension: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  fichier: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'PieceDeposee',
  tableName: MODULE_TABLE_PREFIX + 'pieces_deposees',
  timestamps: true
})