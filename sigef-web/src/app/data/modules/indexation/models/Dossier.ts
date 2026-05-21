import { TypeRegistre } from "../../commun/models/TypeRegistre";
import { Fichier } from "./Fichier";

export class Dossier {
  declare id?: string
  declare nom?: string
  declare description?: string
  declare dossierParentId?: Dossier['id']
  declare dossierParent?: Dossier
  declare sousDossiers?: Dossier[]
  declare fichiers?: Fichier[]
  declare typeRegistreId: TypeRegistre['id']
  declare typeRegistre?: TypeRegistre
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}