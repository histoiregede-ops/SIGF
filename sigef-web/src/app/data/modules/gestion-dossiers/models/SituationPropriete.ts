import { Canton } from "../../commun/models/Canton";
import { Commune } from "../../commun/models/Commune";
import { Prefecture } from "../../commun/models/Prefecture";
import { Quartier } from "../../commun/models/Quartier";
import { Region } from "../../commun/models/Region";
import { Village } from "../../commun/models/Village";
import { Ville } from "../../commun/models/Ville";
import { FormalitePrealable } from "./FormalitePrealable";
import { TitreFoncier } from "./TitreFoncier";

export class SituationPropriete {
  declare id?: string
  declare lieudit?: string
  declare rue?: string
  declare formalitePrealableId?: FormalitePrealable['id']
  declare formalitePrealable?: FormalitePrealable
  declare titreFoncierId?: TitreFoncier['id']
  declare titreFoncier?: TitreFoncier
  
  declare regionId?: Region['id']
  declare region?: Region
  declare prefectureId?: Prefecture['id']
  declare prefecture?: Prefecture
  declare communeId?: Commune['id']
  declare commune?: Commune
  declare villageId: Village['id']
  declare village?: Village
  declare villeId: Ville['id']
  declare ville?: Ville
  declare cantonId?: Canton['id']
  declare canton?: Canton
  declare quartierId?: Quartier['id']
  declare quartier?: Quartier
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}