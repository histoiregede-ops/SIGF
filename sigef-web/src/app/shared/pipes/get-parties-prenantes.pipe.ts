import { Pipe, PipeTransform } from '@angular/core';
import { TypesPartiePrenante } from '../../data/enums/TypesPartiePrenante';
import { PartiePrenante } from '../../data/modules/gestion-dossiers/models/PartiePrenante';
import { PartiePrenanteUtils } from '../../data/utils/PartiePrenanteUtils';

@Pipe({
  name: 'getPartiesPrenantes'
})
export class GetPartiesPrenantesPipe implements PipeTransform {

  transform(value: PartiePrenante[] | undefined, typePartiePrenante: TypesPartiePrenante): PartiePrenante[] {
    const partiesPrenantes: PartiePrenante[] = value ? value.filter((element: PartiePrenante) => element.type == typePartiePrenante) : []

    // console.log(typePartiePrenante, partiesPrenantes)

    return partiesPrenantes
  }
}
