export type CustomMapType = {
  [key: string]: string
}

export class FiltresDonneesUtils {
  private static instance: FiltresDonneesUtils

  constructor() {
  }

  public static getInstance(): FiltresDonneesUtils {
    if (!FiltresDonneesUtils.instance) {
      FiltresDonneesUtils.instance = new FiltresDonneesUtils()
    }
    return FiltresDonneesUtils.instance
  }

  nettoyerChampsVides(filtres: CustomMapType): CustomMapType {
    return Object.fromEntries(
      Object.entries(filtres).filter(([_, v]) => v !== undefined && v !== null && v !== '' && v != 'undefined')
      // .map(([k, v]) => [k, v == 'null' ? null : v]) // Transformation des chaînes "null" en null
    );
  }

  nettoyerFiltres(filtres: any): any {
    if (filtres === null || filtres === '') {
      return undefined;
    }

    if (Array.isArray(filtres)) {
      const arrayNettoye = filtres
        .map(item => FiltresDonneesUtils.getInstance().nettoyerFiltres(item))
        .filter(item => item !== undefined);
      return arrayNettoye.length > 0 ? arrayNettoye : undefined;
    }

    if (typeof filtres === 'object') {
      const filtresNettoye: any = {};

      // Object.keys(filtres).forEach(cle => {
      //   const valeurNettoyee = FiltresDonneesUtils.getInstance().nettoyerFiltres(filtres[cle]);

      //   if (valeurNettoyee !== undefined) {
      //     filtresNettoye[cle] = valeurNettoyee;
      //   }
      // });

      for (const key in filtres) {
        if (!filtres.hasOwnProperty(key)) continue;

        const valeur = filtres[key];

        // Supprimer si la clé commence par "masquer"
        if (key.startsWith('masquerFiltres')) {
          continue;
        }

        // Exception pour la clé "categorie" : toujours la garder, même si la valeur est null
        const whiteListKeys = ['categorie']//, 'type']
        if (whiteListKeys.includes(key)) {
          filtresNettoye[key] = valeur;
          continue;
        }

        const valeurNettoyee = FiltresDonneesUtils.getInstance().nettoyerFiltres(valeur);
        if (valeurNettoyee !== undefined) {
          filtresNettoye[key] = valeurNettoyee;
        }
      }

      return Object.keys(filtresNettoye).length > 0 ? filtresNettoye : undefined;
    }

    return filtres;
  }


}