import { FormalitePrealable } from "./FormalitePrealable";

export class PublicationDemandes {
  declare id?: string
  declare referenceJournalOfficiel?: string
  declare dateTransmissionInsertionJournal?: Date
  declare dateInsertionJournal?: Date
  declare dateTransmissionAffichageAudienceTribunal?: Date
  declare dateAffichageAudienceTribunal?: Date
  declare dateEnvoiAffichagePublication?: Date
  declare dateAccuseReceptionAffichagePublication?: Date
  declare dateEnvoiNotificationsIndividuelles?: Date
  declare dateRetourAccusesReceptionNotificationsIndividuelles?: Date
  declare dateNormaleClotureDelais?: Date
  declare propagationRaisonAbsencesClotureDelais?: Date
  declare formalitePrealableId?: FormalitePrealable['id']
  declare formalitePrealable?: FormalitePrealable

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}
