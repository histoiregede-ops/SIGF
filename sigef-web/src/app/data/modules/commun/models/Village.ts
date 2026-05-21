import { Canton } from "./Canton";

export class Village {
  declare id?: string
  declare libelle?: string
  declare description?: string

  declare cantonId?: Canton['id']
  declare canton?: Canton

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}