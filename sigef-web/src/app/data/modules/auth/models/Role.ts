import { Profil } from "./Profil";
import { RoleProfil } from "./RoleProfil";

export class Role {
  declare id?: number
  declare libelle: string
  declare description?: string
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
  
  declare profils?: Profil[]
  declare rolesProfil?: RoleProfil[]

  constructor(libelle?: string, description?: string) {
    this.libelle = libelle || '';
    this.description = description;
  }
}