import { PartiePrenante } from "./PartiePrenante";
import { Opposition } from "./Opposition";
import { Depot } from "./Depot";

export class PieceDeposee {
  declare id?: string
  declare nom?: string
  declare description?: string
  declare tailleEnOctets?: number
  declare extension?: string
  declare fichier?: number
  declare oppositionId?: Opposition['id']
  declare opposition?: Opposition
  declare depotId?: Depot['id']
  declare depot?: Depot

  declare partiesPrenantes?: PartiePrenante[]
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}