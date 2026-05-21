import { TacheIndexation } from "./TacheIndexation";
import { QualiteDocument } from "../../commun/models/QualiteDocument";
import { EtatsProgressionIndexation } from "../../../enums/EtatsProgressionIndexation";
import { DonneeIndexation } from "./DonneeIndexation";
import { Utilisateur } from "../../auth/models/Utilisateur";

export class ProgressionTacheIndexation {
  declare id?: string
  declare page?: number
  declare etat?: EtatsProgressionIndexation
  declare motifRejet?: string
  declare commentaire?: string
  declare tacheIndexationId?: TacheIndexation['id']
  declare tacheIndexation?: TacheIndexation
  declare qualiteDocumentId?: QualiteDocument['id']
  declare qualiteDocument?: QualiteDocument

  declare dateSaisie?: Date
  declare dateControle?: Date
  declare indexeurUtilisateurId?: Utilisateur['id']
  declare indexeurUtilisateur?: Utilisateur
  declare controleurUtilisateurId?: Utilisateur['id']
  declare controleurUtilisateur?: Utilisateur

  declare donneeIndexation?: DonneeIndexation
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}