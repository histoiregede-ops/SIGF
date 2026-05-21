import { DemandeTransfert } from "./DemandeTransfert";
import { ActeRegistre } from "./ActeRegistre";
import { StatutsDemandeTransfertActeRegistre } from "../../../enums/StatutsDemandeTransfertActeRegistre";
import { CentreConservationFonciere } from "../../auth/models/CentreConservationFonciere";

export class DemandeTransfertActeRegistre {
  declare id?: string
  declare statut?: StatutsDemandeTransfertActeRegistre
  declare commentaire?: string
  declare dateTraitement?: Date
  declare demandeTransfertId?: DemandeTransfert['id']
  declare demandeTransfert?: DemandeTransfert
  declare acteRegistreId?: ActeRegistre['id']
  declare acteRegistre?: ActeRegistre
  declare centreSourceId: CentreConservationFonciere['id']
  declare centreSource?: CentreConservationFonciere

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}