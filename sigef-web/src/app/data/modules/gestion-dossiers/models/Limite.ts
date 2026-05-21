import { DirectionLimite } from "./DirectionLimite"
import { TitreFoncier } from "./TitreFoncier"

export class Limite {
  declare id?: string
  declare limitrophe?: string
  declare directionLimiteId: DirectionLimite['id']
  declare directionLimite?: DirectionLimite
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}