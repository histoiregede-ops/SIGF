import { Region } from "../../commun/models/Region";
import { Utilisateur } from "./Utilisateur";

export class CentreConservationFonciere {
  declare id?: string
  declare nom?: string
  declare description?: string
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
  
  declare regionId: Region['id']
  declare region?: Region
  declare utilisateurs?: Utilisateur[]
}