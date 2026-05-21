import { TitreFoncier } from "./TitreFoncier";
import { Requisition } from "./Requisition";

export class BordereauAnalytique {
  declare id?: string
  declare numero?: string
  declare dateBordereau?: Date
  declare description?: string

  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier

  declare requisitionId?: Requisition['id']
  declare requisition?: Requisition

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}
