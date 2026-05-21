import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association, NOW } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { StatutsDemandeTransfertActeRegistre } from "../../../core/enums/StatutsDemandeTransfertActeRegistre";
import { DemandeTransfert } from "./DemandeTransfert";
import { ActeRegistre } from "./ActeRegistre";
import { CentreConservationFonciere } from "../../auth/models/CentreConservationFonciere";

export class DemandeTransfertActeRegistre extends Model<InferAttributes<DemandeTransfertActeRegistre>, InferCreationAttributes<DemandeTransfertActeRegistre>> {
  declare id: CreationOptional<string>
  declare statut: CreationOptional<StatutsDemandeTransfertActeRegistre>
  declare commentaire: CreationOptional<string>
  declare dateTraitement: CreationOptional<Date>
  declare demandeTransfertId: ForeignKey<DemandeTransfert['id']>
  declare demandeTransfert?: NonAttribute<DemandeTransfert>
  declare acteRegistreId: ForeignKey<ActeRegistre['id']>
  declare acteRegistre?: NonAttribute<ActeRegistre>
  declare centreSourceId: ForeignKey<CentreConservationFonciere['id']>
  declare centreSource?: NonAttribute<CentreConservationFonciere>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    demandeTransfert: Association<DemandeTransfertActeRegistre, DemandeTransfert>,
    acteRegistre: Association<DemandeTransfertActeRegistre, ActeRegistre>,
    centreSource: Association<DemandeTransfertActeRegistre, CentreConservationFonciere>,
  }
}

DemandeTransfertActeRegistre.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  statut: {
    type: DataTypes.ENUM,
    values: [StatutsDemandeTransfertActeRegistre.EN_ATTENTE, StatutsDemandeTransfertActeRegistre.VALIDE, StatutsDemandeTransfertActeRegistre.REJETE],
    defaultValue: StatutsDemandeTransfertActeRegistre.EN_ATTENTE,
    allowNull: false,
  },
  commentaire: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  dateTraitement: {
    type: DataTypes.DATE,
    defaultValue: NOW,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'DemandeTransfertActeRegistre',
  tableName: MODULE_TABLE_PREFIX + 'demandes_transferts_actes',
  timestamps: true
})