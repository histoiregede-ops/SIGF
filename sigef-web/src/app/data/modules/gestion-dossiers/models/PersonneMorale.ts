import { PartiePrenante } from "./PartiePrenante";
import { FormeJuridique } from "../../commun/models/FormeJuridique";
import { TypePersonneMorale } from "../../commun/models/TypePersonneMorale";
import { SecteurActivite } from "../../commun/models/SecteurActivite";
import { RepresentantPersonneMorale } from "./RepresentantPersonneMorale";
import { PieceIdentite } from "../../commun/models/PieceIdentite";

export class PersonneMorale {
  declare id?: string
  declare raisonSocialeOuDenomination?: string
  declare adresse?: string
  declare telephone?: string
  declare numeroPieceIdentite?: string

  declare partiePrenanteId?: PartiePrenante['id']
  declare partiePrenante?: PartiePrenante
  declare formeJuridiqueId?: FormeJuridique['id']
  declare formeJuridique?: FormeJuridique
  declare secteurActiviteId?: SecteurActivite['id']
  declare secteurActivite?: SecteurActivite
  declare typePersonneMoraleId?: TypePersonneMorale['id']
  declare typePersonneMorale?: TypePersonneMorale
  declare pieceIdentiteId?: PieceIdentite['id']
  declare pieceIdentite?: PieceIdentite
  declare representants?: RepresentantPersonneMorale[]

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}
