import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association, NOW } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { TypeRegistre } from "../../commun/models/TypeRegistre";
import { DossierRegistre } from "./DossierRegistre";
import { CentreConservationFonciere } from "../../auth/models/CentreConservationFonciere";
import { Region } from "../../commun/models/Region";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { Depot } from "./Depot";
import { FormalitePrealable } from "./FormalitePrealable";
import { Opposition } from "./Opposition";
import { TitreFoncier } from "./TitreFoncier";
import { Utilisateur } from "../../auth/models/Utilisateur";

export class ActeRegistre extends Model<InferAttributes<ActeRegistre>, InferCreationAttributes<ActeRegistre>> {
  declare id: CreationOptional<string>
  declare numeroOrdre: CreationOptional<string>
  declare folio: CreationOptional<number>
  declare description: CreationOptional<string>
  declare dossierRegistreId: ForeignKey<DossierRegistre['id']>
  declare dossierRegistre?: NonAttribute<DossierRegistre>
  declare typeRegistreId: ForeignKey<TypeRegistre['id']>
  declare typeRegistre?: NonAttribute<TypeRegistre>
  declare regionId: ForeignKey<Region['id']>
  declare region?: NonAttribute<Region>
  declare centreConservationFonciereId: ForeignKey<CentreConservationFonciere['id']>
  declare centreConservationFonciere?: NonAttribute<CentreConservationFonciere>

  declare formalitePrealable?: NonAttribute<FormalitePrealable>
  declare opposition?: NonAttribute<Opposition>
  declare depot?: NonAttribute<Depot>
  declare titreFoncier?: NonAttribute<TitreFoncier>

  // declare dateCreation: CreationOptional<Date>
  declare dateValidation: CreationOptional<Date>
  declare utilisateurCreationId: ForeignKey<Utilisateur['id']>
  declare utilisateurCreation: NonAttribute<Utilisateur>
  declare utilisateurValidationId: ForeignKey<Utilisateur['id']>
  declare utilisateurValidation: NonAttribute<Utilisateur>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    dossierRegistre: Association<ActeRegistre, DossierRegistre>,
    typeRegistre: Association<ActeRegistre, TypeRegistre>,
    region: Association<ActeRegistre, Region>,
    centreConservationFonciere: Association<ActeRegistre, CentreConservationFonciere>,
    formalitePrealable: Association<ActeRegistre, FormalitePrealable>,
    opposition: Association<ActeRegistre, Opposition>,
    depot: Association<ActeRegistre, Depot>,
    titreFoncier: Association<ActeRegistre, TitreFoncier>,
    utilisateurCreation: Association<ActeRegistre, Utilisateur>,
    utilisateurValidation: Association<ActeRegistre, Utilisateur>,
  }
}

ActeRegistre.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    // type: DataTypes.INTEGER.UNSIGNED,
    // autoIncrement: true,
    primaryKey: true
  },
  numeroOrdre: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  folio: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // dateCreation: {
  //   type: DataTypes.DATE,
  //   allowNull: true,
  //   defaultValue: NOW
  // },
  dateValidation: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'ActeRegistre',
  tableName: MODULE_TABLE_PREFIX + 'actes_registres',
  timestamps: true
})