import { Prefecture } from "./Prefecture";
import { Canton } from "./Canton";

export class Commune {
  declare id?: string
  declare libelle?: string
  declare description?: string

  declare prefectureId?: Prefecture['id']
  declare prefecture?: Prefecture
  declare cantons?: Canton[]

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}