import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../CommunModule";
import { CategoriesPieceIdentite } from "../../../core/enums/CategoriesPieceIdentite";

export class PieceIdentite extends Model<InferAttributes<PieceIdentite>, InferCreationAttributes<PieceIdentite>> {
  declare id: CreationOptional<string>
  declare libelle: string
  declare description: CreationOptional<string>
  declare categorie: CreationOptional<CategoriesPieceIdentite>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
  }
}

PieceIdentite.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  libelle: {
    type: new DataTypes.STRING, 
    allowNull: false,
    unique: true
  },
  description: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  categorie: {
    type: DataTypes.ENUM,
    values: [CategoriesPieceIdentite.PERSONNE_PHYSIQUE, CategoriesPieceIdentite.PERSONNE_MORALE],
    defaultValue: CategoriesPieceIdentite.PERSONNE_PHYSIQUE,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'PieceIdentite',
  tableName:  MODULE_TABLE_PREFIX + 'pieces_identite',
  timestamps: true
})