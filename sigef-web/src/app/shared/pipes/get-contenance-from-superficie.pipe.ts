import { Pipe, PipeTransform } from '@angular/core';
import { ContenanceUtils } from '../../data/utils/ContenanceUtils';

@Pipe({
  name: 'getContenanceFromSuperficie'
})
export class GetContenanceFromSuperficiePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const { contenanceEnHectare, contenanceEnAre, contenanceEnCentiare } = ContenanceUtils.getInstance().getContenanceFromSuperficie(value)

    return ContenanceUtils.getInstance().getValeurContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare);
  }

}
