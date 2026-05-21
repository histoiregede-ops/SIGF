import { EtatsControleIndexation, EtatsSaisieIndexation } from "../../../enums/EtatsIndexation";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { Fichier } from "./Fichier";
import { ProgressionTacheIndexation } from "./ProgressionTacheIndexation";

export class TacheIndexation {
  declare id?: string
  declare etatSaisie?: EtatsSaisieIndexation
  declare etatControle?: EtatsControleIndexation
  declare fichierId?: Fichier['id']
  declare fichier?: Fichier
  declare indexeurUtilisateurId?: Utilisateur['id']
  declare indexeurUtilisateur?: Utilisateur
  declare controleurUtilisateurId?: Utilisateur['id']
  declare controleurUtilisateur?: Utilisateur
  declare progressionsTacheIndexation?: ProgressionTacheIndexation[]
  
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}