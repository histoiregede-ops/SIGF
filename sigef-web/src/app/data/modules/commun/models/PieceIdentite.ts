import { CategoriesPieceIdentite } from "../../../enums/CategoriesPieceIdentite"

export class PieceIdentite {
  declare id?: string
  declare libelle: string
  declare description?: string
  declare categorie?: CategoriesPieceIdentite

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}
