import { Utilisateur } from "../../auth/models/Utilisateur";
import { DemandeTransfertActeRegistre } from "./DemandeTransfertActeRegistre";
import { CentreConservationFonciere } from "../../auth/models/CentreConservationFonciere";
import { StatutsDemandeTransfert } from "../../../enums/StatutsDemandeTransfert";
import { TypeRegistre } from "../../commun/models/TypeRegistre";

export class DemandeTransfert {
  declare id?: string
  declare message?: string
  declare reponse?: string
  declare statut?: StatutsDemandeTransfert
  declare dateDemande?: Date
  declare dateTraitement?: Date

  declare typeRegistreId?: TypeRegistre['id']
  declare typeRegistre?: TypeRegistre
  declare centreConservationFonciereId?: CentreConservationFonciere['id']
  declare centreConservationFonciere?: CentreConservationFonciere
  declare utilisateurDemandeId?: Utilisateur['id']
  declare utilisateurDemande?: Utilisateur
  declare utilisateurTraitementId?: Utilisateur['id']
  declare utilisateurTraitement?: Utilisateur
  declare demandeTransfertActesRegistres?: DemandeTransfertActeRegistre[]
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}