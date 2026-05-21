import { Periode } from "./Periode";
import { Prefecture } from "./Prefecture";

export class Region {
  declare id?: string
  declare libelle?: string
  declare sigle?: string
  declare description?: string
  declare actuelle?: boolean

  declare periodeId?: Periode['id']
  declare periode?: Periode
  declare prefectures?: Prefecture[]

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}