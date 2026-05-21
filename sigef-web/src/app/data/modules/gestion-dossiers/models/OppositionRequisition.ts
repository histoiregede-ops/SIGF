import { Opposition } from "./Opposition";

export class OppositionRequisition {
  declare id?: string
  declare numeroRequisition?: string
  declare oppositionId?: Opposition['id']
  declare opposition?: Opposition

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}