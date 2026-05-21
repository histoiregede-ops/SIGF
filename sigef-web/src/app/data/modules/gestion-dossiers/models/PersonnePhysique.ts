import { PartiePrenante } from "./PartiePrenante";
import { Civilite } from "../../commun/models/Civilite";
import { Nationalite } from "../../commun/models/Nationalite";
import { Profession } from "../../commun/models/Profession";
import { RepresentantPersonnePhysique } from "./RepresentantPersonnePhysique";
import { PieceIdentite } from "../../commun/models/PieceIdentite";

export class PersonnePhysique {
  declare id?: string
  declare nom?: string
  declare prenoms?: string
  declare telephone?: string
  declare adresseDomicile?: string
  declare adresseResidence?: string
  declare anneeNaissance?: number
  declare dateNaissance?: Date
  declare lieuNaissance?: string
  declare nif?: string
  declare vivant?: boolean
  declare nomEpoux?: string
  declare nomJeuneFille?: string
  declare numeroPieceIdentite?: string

  declare civiliteId?: Civilite['id']
  declare civilite?: Civilite
  declare nationaliteId?: Nationalite['id']
  declare nationalite?: Nationalite
  declare professionId?: Profession['id']
  declare profession?: Profession
  declare pieceIdentiteId?: PieceIdentite['id']
  declare pieceIdentite?: PieceIdentite
  declare partiePrenanteId?: PartiePrenante['id']
  declare partiePrenante?: PartiePrenante
  declare representants?: RepresentantPersonnePhysique[]

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}
