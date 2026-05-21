import { CentreConservationFonciere } from "../../auth/models/CentreConservationFonciere";
import { Region } from "../../commun/models/Region";
import { TypeRegistre } from "../../commun/models/TypeRegistre";
import { ActeRegistre } from "./ActeRegistre";

export class DossierRegistre {
  declare id?: string
  declare nom?: string
  declare volume?: string
  declare estRegistre?: boolean
  declare description?: string
  declare dossierRegistreParentId?: DossierRegistre['id']
  declare dossierRegistreParent?: DossierRegistre
  declare sousDossiersRegistres?: DossierRegistre[]
  declare typeRegistreId?: TypeRegistre['id']
  declare typeRegistre?: TypeRegistre
  declare regionId?: Region['id']
  declare region?: Region
  declare centreConservationFonciereId?: CentreConservationFonciere['id']
  declare centreConservationFonciere?: CentreConservationFonciere

  declare actesRegistres?: ActeRegistre[]
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}