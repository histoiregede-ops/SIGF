export class ContenanceUtils {
  private static instance: ContenanceUtils

  constructor() {
  }

  public static getInstance(): ContenanceUtils {
    if (!ContenanceUtils.instance) {
      ContenanceUtils.instance = new ContenanceUtils()
    }
    return ContenanceUtils.instance
  }

  getValeurContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): string {
    let valeursContenance: string[] = []

    if (contenanceEnHectare == undefined && contenanceEnAre == undefined && contenanceEnCentiare == undefined) {
      valeursContenance.push('-- -- --')
    }
    else {
      if (contenanceEnHectare != undefined) {
        valeursContenance.push(contenanceEnHectare + ' ha')
      }
      if (contenanceEnAre != undefined) {
        valeursContenance.push(contenanceEnAre + ' a')
      }
      if (contenanceEnCentiare != undefined) {
        valeursContenance.push(contenanceEnCentiare + ' ca')
      }
    }

    return valeursContenance.join(' ')
  }

  getContenanceFromSuperficie(superficie: number): { contenanceEnHectare: number, contenanceEnAre: number, contenanceEnCentiare: number } {
    const contenanceEnHectare = Math.floor(superficie / 10000);
    const resteContenanceEnHectare = superficie % 10000;

    const contenanceEnAre = Math.floor(resteContenanceEnHectare / 100);
    const contenanceEnCentiare = resteContenanceEnHectare % 100;

    return { contenanceEnHectare: contenanceEnHectare, contenanceEnAre: contenanceEnAre, contenanceEnCentiare: contenanceEnCentiare }
  }

  getSuperficieContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): number {
    let superficie: number = 0

    if (contenanceEnHectare != undefined) {
      superficie += contenanceEnHectare * 10000
    }
    if (contenanceEnAre != undefined) {
      superficie += contenanceEnAre * 100
    }
    if (contenanceEnCentiare != undefined) {
      superficie += contenanceEnCentiare
    }

    return superficie
  }

}