import { 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  DataTypes, 
  ForeignKey, 
  NonAttribute
} from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../IndexationModule";
import { ProgressionTacheIndexation } from "./ProgressionTacheIndexation";
import { Region } from "../../commun/models/Region";
import { TypeRegistre } from "../../commun/models/TypeRegistre";
import { FormalitePrealable } from "../../gestion-dossiers-legacy/models/FormalitePrealable";
import { TitreFoncier } from "../../titres-fonciers/models/TitreFoncier";
import { Depot } from "../../gestion-dossiers-legacy/models/Depot";
import { Opposition } from "../../gestion-dossiers-legacy/models/Opposition";
import { ActeRegistre } from "../../gestion-dossiers-legacy/models/ActeRegistre";

export class DonneeIndexation extends Model<InferAttributes<DonneeIndexation>, InferCreationAttributes<DonneeIndexation>> {
  declare id: CreationOptional<number>;
  declare volumeRegistre?: string | null;
  declare folioRegistre?: string | null;
  declare dateValidation?: Date | null;
  
  declare progressionTacheIndexationId: ForeignKey<ProgressionTacheIndexation['id']>;
  declare progressionTacheIndexation?: NonAttribute<ProgressionTacheIndexation>;
  
  declare regionId: ForeignKey<Region['id']>;
  declare region?: NonAttribute<Region>;
  
  declare typeRegistreId: ForeignKey<TypeRegistre['id']>;
  declare typeRegistre?: NonAttribute<TypeRegistre>;
  
  declare formalitePrealableId?: ForeignKey<FormalitePrealable['id']> | null;
  declare formalitePrealable?: NonAttribute<FormalitePrealable>;
  
  declare depotId?: ForeignKey<Depot['id']> | null;
  declare depot?: NonAttribute<Depot>;
  
  declare oppositionId?: ForeignKey<Opposition['id']> | null;
  declare opposition?: NonAttribute<Opposition>;
  
  declare titreFoncierId?: ForeignKey<TitreFoncier['id']> | null;
  declare titreFoncier?: NonAttribute<TitreFoncier>;

  declare acteRegistreId?: ForeignKey<ActeRegistre['id']> | null;
  declare acteRegistre?: NonAttribute<ActeRegistre>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

DonneeIndexation.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  volumeRegistre: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  folioRegistre: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  dateValidation: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'DonneeIndexation',
  tableName: MODULE_TABLE_PREFIX + 'donnees_indexation',
  timestamps: true,
  indexes: [
    { fields: ['progressionTacheIndexationId'] },
    { fields: ['regionId'] },
    { fields: ['typeRegistreId'] },
    { fields: ['formalitePrealableId'] },
    { fields: ['depotId'] },
    { fields: ['oppositionId'] },
    { fields: ['titreFoncierId'] },
    { fields: ['acteRegistreId'] }
  ]
});

