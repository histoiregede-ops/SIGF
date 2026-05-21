import { Utilisateur } from "../modules/auth/models/Utilisateur"

export class NgSelectUtils {
  private static instance: NgSelectUtils

  constructor() {
  }

  public static getInstance(): NgSelectUtils {
    if (!NgSelectUtils.instance) {
      NgSelectUtils.instance = new NgSelectUtils()
    }
    return NgSelectUtils.instance
  }

  customUtilisateurSearchFn(term: string, item: Utilisateur) {
    term = term.toLowerCase();
		return item.nom!.toLowerCase().indexOf(term) > -1 || item.prenoms!.toLowerCase().indexOf(term) > -1
  }

}