import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { FormalitePrealable } from "./FormalitePrealable";
import { Commune } from "../../commun/models/Commune";
import { Prefecture } from "../../commun/models/Prefecture";
import { Canton } from "../../commun/models/Canton";
import { Region } from "../../commun/models/Region";
import { Quartier } from "../../commun/models/Quartier";
import { TitreFoncier } from "./TitreFoncier";
import { Village } from "../../commun/models/Village";
import { Ville } from "../../commun/models/Ville";

export class SituationPropriete extends Model<InferAttributes<SituationPropriete>, InferCreationAttributes<SituationPropriete>> {
  declare id: CreationOptional<string>
  declare lieudit: CreationOptional<string>
  declare rue: CreationOptional<string>
  declare formalitePrealableId: ForeignKey<FormalitePrealable['id']>
  declare formalitePrealable?: NonAttribute<FormalitePrealable>
  declare titreFoncierId: ForeignKey<TitreFoncier['id']>
  declare titreFoncier?: NonAttribute<TitreFoncier>
  
  declare regionId: ForeignKey<Region['id']>
  declare region?: NonAttribute<Region>
  declare prefectureId: ForeignKey<Prefecture['id']>
  declare prefecture?: NonAttribute<Prefecture>
  declare communeId: ForeignKey<Commune['id']>
  declare commune?: NonAttribute<Commune>
  declare villageId: ForeignKey<Village['id']>
  declare village?: NonAttribute<Village>
  declare villeId: ForeignKey<Ville['id']>
  declare ville?: NonAttribute<Ville>
  declare cantonId: ForeignKey<Canton['id']>
  declare canton?: NonAttribute<Canton>
  declare quartierId: ForeignKey<Quartier['id']>
  declare quartier?: NonAttribute<Quartier>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    formalitePrealable: Association<SituationPropriete, FormalitePrealable>,
    titreFoncier: Association<SituationPropriete, TitreFoncier>,
    region: Association<SituationPropriete, Region>,
    prefecture: Association<SituationPropriete, Prefecture>,
    commune: Association<SituationPropriete, Commune>,
    village: Association<SituationPropriete, Village>,
    ville: Association<SituationPropriete, Ville>,
    canton: Association<SituationPropriete, Canton>,
    quartier: Association<SituationPropriete, Quartier>,
  }
}

SituationPropriete.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  lieudit: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  rue: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'SituationPropriete',
  tableName:  MODULE_TABLE_PREFIX + 'situations_propriete',
  timestamps: true
})