import { Canton } from "../../commun/models/Canton"

export class Paiement {
  declare id?: string
  declare libelle?: string
  declare description?: string

  declare cantonId?: Canton['id']
  declare canton?: Canton

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}