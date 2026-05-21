import { Role } from "./Role";
import { RoleProfil } from "./RoleProfil";
import { Utilisateur } from "./Utilisateur";

export class Profil {
  declare id?: number
  declare libelle: string
  declare titre?: string // Alias pour libelle (pour compatibilité)
  declare description?: string

  declare utilisateurs?: Utilisateur[]
  declare roles?: Role[]
  declare rolesProfil?: RoleProfil[]

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date

  constructor(libelle?: string, description?: string) {
    this.libelle = libelle || '';
    this.titre = libelle; // Synchroniser titre avec libelle
    this.description = description;
  }
}