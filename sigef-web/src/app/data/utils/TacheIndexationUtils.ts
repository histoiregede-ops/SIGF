import { EtatsProgressionIndexation } from "../enums/EtatsProgressionIndexation"
import { ProgressionTacheIndexation } from "../modules/indexation/models/ProgressionTacheIndexation"
import { TacheIndexation } from "../modules/indexation/models/TacheIndexation"

export class TacheIndexationUtils {
  private static instance: TacheIndexationUtils

  constructor() {
  }

  public static getInstance(): TacheIndexationUtils {
    if (!TacheIndexationUtils.instance) {
      TacheIndexationUtils.instance = new TacheIndexationUtils()
    }
    return TacheIndexationUtils.instance
  }

  getEtatSignalisationOuRejetTacheIndexation(tacheIndexation?: TacheIndexation): boolean {
    if (tacheIndexation) {
      const progressionsTacheIndexation = tacheIndexation.progressionsTacheIndexation ?? []
      if (progressionsTacheIndexation.length == 0) {
        return false
      }

      let pagesSignaleesOuRejetees: ProgressionTacheIndexation[] = []
      for (let index = 0; index < progressionsTacheIndexation.length; index++) {
        const progressionTacheIndexation = progressionsTacheIndexation[index];
        
        if (progressionTacheIndexation.etat == EtatsProgressionIndexation.REJETE || progressionTacheIndexation.etat == EtatsProgressionIndexation.SIGNALE) {
          pagesSignaleesOuRejetees.push(progressionTacheIndexation)
        }
      }
      
      return pagesSignaleesOuRejetees.length > 0 // != progressionsTacheIndexation.length
    }
    else {
      return false
    }
  }

  getPagesSignaleesOuRejetees(progressionsTacheIndexation: ProgressionTacheIndexation[]): ProgressionTacheIndexation[] {
    let pagesSignaleesOuRejetees: ProgressionTacheIndexation[] = []

    progressionsTacheIndexation.forEach(progressionTacheIndexation => {
      if (progressionTacheIndexation.etat == EtatsProgressionIndexation.REJETE || progressionTacheIndexation.etat == EtatsProgressionIndexation.SIGNALE) {
        pagesSignaleesOuRejetees.push(progressionTacheIndexation)
      }
    })

    return pagesSignaleesOuRejetees
  }

}