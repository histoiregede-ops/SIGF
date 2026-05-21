import { Pipe, PipeTransform } from '@angular/core';
import { TypesPartiePrenante } from '../../data/enums/TypesPartiePrenante';
import { PartiePrenanteUtils } from '../../data/utils/PartiePrenanteUtils';
import { PartiePrenante } from '../../data/modules/gestion-dossiers/models/PartiePrenante';
import { Mutation } from '../../data/modules/gestion-dossiers/models/Mutation';

@Pipe({
  name: 'getProprietaireActuel'
})
export class GetProprietaireActuelPipe implements PipeTransform {

  transform(value: Mutation[] | undefined): PartiePrenante[] {
    if (value != undefined) {
      let orderedMutations: Mutation[] = value.filter(mutation => mutation.dateInscription).sort((a, b) => (new Date(b.dateInscription!)).getTime() - (new Date(a.dateInscription!)).getTime())
      console.log("Actu proprio: ", orderedMutations)
      const lastMutation: Mutation | undefined = orderedMutations[0]

      return lastMutation && lastMutation.partiesPrenantes ? lastMutation.partiesPrenantes : []
    }
    else {
      return []
    }
  }

}
