import { Pipe, PipeTransform } from '@angular/core';
import { ContenanceUtils } from '../../data/utils/ContenanceUtils';

@Pipe({
  name: 'getSuperficieContenance'
})
export class GetSuperficieContenancePipe implements PipeTransform {

  transform(value: (number | undefined)[], ...args: unknown[]): unknown {
    console.log("Superf", value.length, value)
    if(value.length == 3) {
      return ContenanceUtils.getInstance().getSuperficieContenance(value[0], value[1], value[2])
    }

    return null;
  }

}
