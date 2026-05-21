import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { TypeRegistre } from "../../commun/models/TypeRegistre";
import { Fichier } from "../../indexation/models/Fichier";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { Region } from "../../commun/models/Region";
import { CentreConservationFonciere } from "../../auth/models/CentreConservationFonciere";
import { ActeRegistre } from "./ActeRegistre";

export class DossierRegistre extends Model<InferAttributes<DossierRegistre>, InferCreationAttributes<DossierRegistre>> {
  declare id: CreationOptional<string>
  declare nom: string
  declare volume: CreationOptional<string>
  declare estRegistre: CreationOptional<boolean>
  declare description: CreationOptional<string>
  declare dossierRegistreParentId: ForeignKey<DossierRegistre['id']>
  declare dossierRegistreParent?: NonAttribute<DossierRegistre>
  declare sousDossiersRegistres?: NonAttribute<DossierRegistre[]>
  declare typeRegistreId: ForeignKey<TypeRegistre['id']>
  declare typeRegistre?: NonAttribute<TypeRegistre>
  declare regionId: ForeignKey<Region['id']>
  declare region?: NonAttribute<Region>
  declare centreConservationFonciereId: ForeignKey<CentreConservationFonciere['id']>
  declare centreConservationFonciere?: NonAttribute<CentreConservationFonciere>

  declare actesRegistres?: NonAttribute<ActeRegistre[]>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    dossierRegistreParent: Association<DossierRegistre, DossierRegistre>,
    sousDossiersRegistres: Association<DossierRegistre, DossierRegistre>,
    typeRegistre: Association<DossierRegistre, TypeRegistre>,
    region: Association<DossierRegistre, Region>,
    centreConservationFonciere: Association<DossierRegistre, CentreConservationFonciere>,
    actesRegistres: Association<DossierRegistre, ActeRegistre>,
  }
}

DossierRegistre.init({
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
  volume: {
    type: new DataTypes.STRING, 
    allowNull: true,
  },
  estRegistre: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
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
  modelName:  MODULE_MODEL_PREFIX + 'DossierRegistre',
  tableName:  MODULE_TABLE_PREFIX + 'dossiers_registres',
  timestamps: true
})