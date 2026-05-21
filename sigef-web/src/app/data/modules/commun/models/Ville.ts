import { Canton } from "./Canton";
import { Quartier } from "./Quartier";

export class Ville {
  declare id?: string
  declare libelle?: string
  declare description?: string

  declare cantonId?: Canton['id']
  declare canton?: Canton
  declare quartiers?: Quartier[]

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}