import { Pipe, PipeTransform } from '@angular/core';
import { PartiePrenante } from '../../data/modules/gestion-dossiers/models/PartiePrenante';
import { TypesPartiePrenante } from '../../data/enums/TypesPartiePrenante';
import { PartiePrenanteUtils } from '../../data/utils/PartiePrenanteUtils';

@Pipe({
  name: 'getPartiesPrenatesParCategorie'
})
export class GetPartiesPrenatesParCategoriePipe implements PipeTransform {

  transform(value: PartiePrenante[], typePartiePrenante: TypesPartiePrenante): { [key: string]: string } | string {
    const partiesPrenantesParCategorie: { [key: string]: string } | null = value.length > 0 ? PartiePrenanteUtils.getInstance().getPartiesPrenantesParCategorie(value, typePartiePrenante) : null

    // console.log(typePartiePrenante, partiesPrenantesParCategorie)

    return partiesPrenantesParCategorie != null ? partiesPrenantesParCategorie : 'null'
  }

}
