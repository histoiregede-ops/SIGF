import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../IndexationModule";
import { Dossier } from "./Dossier";
import { Region } from "../../commun/models/Region";
import { TacheIndexation } from "./TacheIndexation";
import { TypeRegistre } from "../../commun/models/TypeRegistre";

export class Fichier extends Model<InferAttributes<Fichier>, InferCreationAttributes<Fichier>> {
  declare id: CreationOptional<string>
  declare nom: string
  declare description: CreationOptional<string>
  declare tailleEnOctets: CreationOptional<number>
  declare nombrePages: CreationOptional<number>
  declare extension: CreationOptional<string>
  declare indexable: CreationOptional<boolean>
  declare fichier: string
  declare dossierId: ForeignKey<Dossier['id']>
  declare dossier?: NonAttribute<Dossier>
  declare typeRegistreId: ForeignKey<TypeRegistre['id']>
  declare typeRegistre?: NonAttribute<TypeRegistre>
  declare regionId: ForeignKey<Region['id']>
  declare region?: NonAttribute<Region>
  
  declare tacheIndexation?: NonAttribute<TacheIndexation>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    dossier: Association<Fichier, Dossier>,
    typeRegistre: Association<Fichier, TypeRegistre>,
    tacheIndexation: Association<Fichier, TacheIndexation>,
    region: Association<Fichier, Region>,
  }
}

Fichier.init({
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
  tailleEnOctets: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Exprimée en octets'
  },
  nombrePages: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  extension: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  indexable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  fichier: {
    type: new DataTypes.STRING,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'Fichier',
  tableName:  MODULE_TABLE_PREFIX + 'fichiers',
  timestamps: true
})