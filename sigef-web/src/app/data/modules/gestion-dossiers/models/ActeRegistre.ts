import { TypeRegistre } from "../../commun/models/TypeRegistre";
import { DossierRegistre } from "./DossierRegistre";
import { CentreConservationFonciere } from "../../auth/models/CentreConservationFonciere";
import { Region } from "../../commun/models/Region";
import { Depot } from "./Depot";
import { FormalitePrealable } from "./FormalitePrealable";
import { Opposition } from "./Opposition";
import { TitreFoncier } from "./TitreFoncier";

export class ActeRegistre {
  declare id?: string
  declare numeroOrdre?: string
  declare folio?: number
  declare description?: string
  declare dossierRegistreId?: DossierRegistre['id']
  declare dossierRegistre?: DossierRegistre
  declare typeRegistreId?: TypeRegistre['id']
  declare typeRegistre?: TypeRegistre
  declare regionId?: Region['id']
  declare region?: Region
  declare centreConservationFonciereId?: CentreConservationFonciere['id']
  declare centreConservationFonciere?: CentreConservationFonciere

  declare formalitePrealable?: FormalitePrealable
  declare opposition?: Opposition
  declare depot?: Depot
  declare titreFoncier?: TitreFoncier
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}