import { CentreConservationFonciere } from "./CentreConservationFonciere";
import { Profil } from "./Profil";

export class Utilisateur {
  declare id?: number
  declare matricule?: string
  declare nom?: string
  declare prenoms?: string
  declare identifiant?: string
  declare email?: string
  declare motDePasse?: string
  declare contact?: string
  declare photoDeProfil?: string
  declare actif?: boolean
  declare dateVerificationEmail?: Date | null
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date

  declare profilId: number
  declare profil?: Profil
  declare centreConservationFonciereId?: number
  declare centreConservationFonciere?: CentreConservationFonciere
}