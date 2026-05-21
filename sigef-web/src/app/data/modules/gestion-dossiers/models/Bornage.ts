import { FormalitePrealable } from "./FormalitePrealable";

export class Bornage {
  declare id?: string
  declare dateInsertionJournalOfficiel?: Date
  declare dateAvisIndividuels?: Date
  declare dateProcesVerbal?: Date
  declare formalitePrealableId?: FormalitePrealable['id']
  declare formalitePrealable?: FormalitePrealable
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}