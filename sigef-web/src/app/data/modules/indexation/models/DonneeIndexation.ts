import { FormalitePrealable } from "../../gestion-dossiers/models/FormalitePrealable";
import { Opposition } from "../../gestion-dossiers/models/Opposition";
import { Depot } from "../../gestion-dossiers/models/Depot";
import { ProgressionTacheIndexation } from "./ProgressionTacheIndexation";
import { TitreFoncier } from "../../gestion-dossiers/models/TitreFoncier";
import { Region } from "../../commun/models/Region";
import { TypeRegistre } from "../../commun/models/TypeRegistre";
import { ActeRegistre } from "../../gestion-dossiers/models/ActeRegistre";

export class DonneeIndexation {
  declare id?: string
  declare volumeRegistre?: string
  declare folioRegistre?: string
  declare dateValidation?: Date
  declare progressionTacheIndexationId?: ProgressionTacheIndexation['id']
  declare progressionTacheIndexation?: ProgressionTacheIndexation
  declare regionId?: Region['id']
  declare region?: Region
  declare typeRegistreId?: TypeRegistre['id']
  declare typeRegistre?: TypeRegistre

  declare formalitePrealableId?: FormalitePrealable['id']
  declare formalitePrealable?: FormalitePrealable
  declare oppositionId?: Opposition['id']
  declare opposition?: Opposition
  declare depotId?: Depot['id']
  declare depot?: Depot
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier
  declare acteRegistreId?: ActeRegistre['id']
  declare acteRegistre?: ActeRegistre
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}