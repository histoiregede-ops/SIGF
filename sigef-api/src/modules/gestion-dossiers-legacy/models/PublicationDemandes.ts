import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { FormalitePrealable } from "./FormalitePrealable";

export class PublicationDemandes extends Model<InferAttributes<PublicationDemandes>, InferCreationAttributes<PublicationDemandes>> {
  declare id: CreationOptional<string>
  declare referenceJournalOfficiel: CreationOptional<string>
  declare dateTransmissionInsertionJournal: CreationOptional<Date>
  declare dateInsertionJournal: CreationOptional<Date>
  declare dateTransmissionAffichageAudienceTribunal: CreationOptional<Date>
  declare dateAffichageAudienceTribunal: CreationOptional<Date>
  declare dateEnvoiAffichagePublication: CreationOptional<Date>
  declare dateAccuseReceptionAffichagePublication: CreationOptional<Date>
  declare dateEnvoiNotificationsIndividuelles: CreationOptional<Date>
  declare dateRetourAccusesReceptionNotificationsIndividuelles: CreationOptional<Date>
  declare dateNormaleClotureDelais: CreationOptional<Date>
  declare propagationRaisonAbsencesClotureDelais: CreationOptional<Date>
  declare formalitePrealableId: ForeignKey<FormalitePrealable['id']>
  declare formalitePrealable?: NonAttribute<FormalitePrealable>
  
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    formalitePrealable: Association<PublicationDemandes, FormalitePrealable>,
  }
}

PublicationDemandes.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  referenceJournalOfficiel: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  dateTransmissionInsertionJournal: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateInsertionJournal: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateTransmissionAffichageAudienceTribunal: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateAffichageAudienceTribunal: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateEnvoiAffichagePublication: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateAccuseReceptionAffichagePublication: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateEnvoiNotificationsIndividuelles: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateRetourAccusesReceptionNotificationsIndividuelles: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateNormaleClotureDelais: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  propagationRaisonAbsencesClotureDelais: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName:  MODULE_MODEL_PREFIX + 'PublicationDemandes',
  tableName:  MODULE_TABLE_PREFIX + 'publications_demandes',
  timestamps: true
})