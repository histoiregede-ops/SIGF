import { Region } from "../../commun/models/Region";
import { TypeRegistre } from "../../commun/models/TypeRegistre";
import { Dossier } from "./Dossier";
import { TacheIndexation } from "./TacheIndexation";

export class Fichier {
  declare id?: string
  declare nom: string
  declare description?: string
  declare tailleEnOctets?: number
  declare nombrePages?: number
  declare extension?: string
  declare indexable?: boolean
  declare typeRegistreId?: TypeRegistre['id']
  declare typeRegistre?: TypeRegistre
  declare fichier?: string
  declare dossierId?: Dossier['id']
  declare dossier?: Dossier
  declare regionId?: Region['id']
  declare region?: Region

  declare tacheIndexation?: TacheIndexation
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}