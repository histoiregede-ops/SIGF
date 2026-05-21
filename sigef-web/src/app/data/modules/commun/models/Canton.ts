import { Commune } from "./Commune";
import { Village } from "./Village";
import { Ville } from "./Ville";

export class Canton {
  declare id?: string
  declare libelle?: string
  declare description?: string

  declare communeId?: Commune['id']
  declare commune?: Commune
  declare villes?: Ville[]
  declare villages?: Village[]

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}