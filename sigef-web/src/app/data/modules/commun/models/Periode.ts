import { Region } from "./Region";

export class Periode {
  declare id?: string
  declare libelle?: string
  declare sigle?: string
  declare description?: string
  
  declare regions?: Region[]

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}