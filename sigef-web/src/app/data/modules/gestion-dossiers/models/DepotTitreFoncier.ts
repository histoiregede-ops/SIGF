import { Depot } from "./Depot";

export class DepotTitreFoncier {
  declare id?: string
  declare numeroTitreFoncier?: string
  declare depotId?: Depot['id']
  declare depot?: Depot

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}