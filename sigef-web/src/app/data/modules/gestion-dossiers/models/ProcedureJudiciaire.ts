import { FormalitePrealable } from "./FormalitePrealable";

export class ProcedureJudiciaire {
  declare id?: string
  declare dateJugementEnPremiereInstance?: Date
  declare dateRemiseExpeditionEnPremiereInstance?: Date
  declare dateRecoursEnPremiereInstance?: Date
  declare dateArreEnAppel?: Date
  declare dateRemiseExpeditionEnAppel?: Date
  declare dateRecoursEnAppel?: Date
  declare dateArreEnCassation?: Date
  declare dateRemiseExpeditionEnCassation?: Date
  declare formalitePrealableId?: FormalitePrealable['id']
  declare formalitePrealable?: FormalitePrealable
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}