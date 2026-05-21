import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../IndexationModule";
import { Fichier } from "./Fichier";
import { TypeRegistre } from "../../commun/models/TypeRegistre";

export class Dossier extends Model<InferAttributes<Dossier>, InferCreationAttributes<Dossier>> {
  declare id: CreationOptional<string>
  declare nom: string
  declare description: CreationOptional<string>
  declare dossierParentId: ForeignKey<Dossier['id']>
  declare dossierParent?: NonAttribute<Dossier>
  declare sousDossiers?: NonAttribute<Dossier[]>
  declare fichiers?: NonAttribute<Fichier[]>
  declare typeRegistreId: ForeignKey<TypeRegistre['id']>
  declare typeRegistre?: NonAttribute<TypeRegistre>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    dossierParent: Association<Dossier, Dossier>,
    sousDossiers: Association<Dossier, Dossier>,
    fichiers: Association<Dossier, Fichier>,
    typeRegistre: Association<Fichier, TypeRegistre>,
  }
}

Dossier.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    // type: DataTypes.INTEGER.UNSIGNED,
    // autoIncrement: true,
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
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'Dossier',
  tableName:  MODULE_TABLE_PREFIX + 'dossiers',
  timestamps: true
})