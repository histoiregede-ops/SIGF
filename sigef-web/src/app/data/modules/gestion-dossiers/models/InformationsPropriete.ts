import { FormalitePrealable } from "./FormalitePrealable";
import { NatureEtatImmeuble } from "./NatureEtatImmeuble";
import { NatureTypeImmeuble } from "./NatureTypeImmeuble";

export class InformationsPropriete {
  declare id?: string
  declare description?: string
  declare contenanceEnHectare?: number
  declare contenanceEnAre?: number
  declare contenanceEnCentiare?: number
  declare valeurVenale?: number
  declare valeurLocative?: number

  declare natureTypeImmeubleId: NatureTypeImmeuble['id']
  declare natureTypeImmeuble?: NatureTypeImmeuble
  declare natureEtatImmeubleId: NatureEtatImmeuble['id']
  declare natureEtatImmeuble?: NatureEtatImmeuble
  declare formalitePrealableId: FormalitePrealable['id']
  declare formalitePrealable?: FormalitePrealable

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}