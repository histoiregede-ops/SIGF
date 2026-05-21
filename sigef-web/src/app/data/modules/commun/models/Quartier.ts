import { Ville } from "./Ville";

export class Quartier {
  declare id?: string
  declare libelle?: string
  declare description?: string

  declare villeId?: Ville['id']
  declare ville?: Ville

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}