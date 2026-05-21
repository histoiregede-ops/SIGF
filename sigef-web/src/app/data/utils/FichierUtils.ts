export class FichierUtils {
  private static instance: FichierUtils

  constructor() {
  }

  public static getInstance(): FichierUtils {
    if (!FichierUtils.instance) {
      FichierUtils.instance = new FichierUtils()
    }
    return FichierUtils.instance
  }

  getNameWithoutExtension(nom: string): string {
    if(nom.startsWith('.')) {
      return nom
    }
    else {
      return nom.substring(
        0,
        nom.lastIndexOf('.')
      )
    }
  }

}