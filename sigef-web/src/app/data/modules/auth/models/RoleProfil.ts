import { Profil } from "./Profil";
import { Role } from "./Role";

export class RoleProfil {
  declare id?: number
  declare profilId: Profil['id']
  declare roleId: Role['id']
  declare actif?: boolean
  declare profil?: Profil
  declare role?: Role
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}