import { Region } from "./Region";
import { Commune } from "./Commune";

export class Prefecture {
  declare id?: string
  declare libelle?: string
  declare description?: string

  declare regionId?: Region['id']
  declare region?: Region
  declare communes?: Commune[]

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}