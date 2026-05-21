import { FormControl, FormGroup } from "@angular/forms"
import { TypesPartiePrenante } from "../enums/TypesPartiePrenante"
import { CategoriesPartiePrenante } from "../enums/CategoriesPartiePrenante"
import { PartiePrenante } from "../modules/gestion-dossiers/models/PartiePrenante"
import { PersonneMembre } from "../modules/gestion-dossiers/models/PersonneMembre"
import { PersonneConjointe } from "../modules/gestion-dossiers/models/PersonneConjointe"

export class PartiePrenanteUtils {
  private static instance: PartiePrenanteUtils

  constructor() {
  }

  public static getInstance(): PartiePrenanteUtils {
    if (!PartiePrenanteUtils.instance) {
      PartiePrenanteUtils.instance = new PartiePrenanteUtils()
    }
    return PartiePrenanteUtils.instance
  }

  getPartiesPrenantes(partiesPrenantes: PartiePrenante[], typePartiePrenante: TypesPartiePrenante): string {
    let partiesPrenantesConcatenees: string[] = []

    for (let index = 0; index < partiesPrenantes.length; index++) {
      const partiePrenante: PartiePrenante = partiesPrenantes[index];

      if (partiePrenante.type == typePartiePrenante) {
        switch (partiePrenante.categorie) {
          case CategoriesPartiePrenante.PERSONNE_PHYSIQUE:
            partiesPrenantesConcatenees.push(((partiePrenante.personnePhysique?.nom ?? '') + ' ' + (partiePrenante.personnePhysique?.prenoms ?? '')).trim())
            break;

          case CategoriesPartiePrenante.PERSONNE_MORALE:
            partiesPrenantesConcatenees.push((partiePrenante.personneMorale?.raisonSocialeOuDenomination ?? '').trim())
            break;

          case CategoriesPartiePrenante.PERSONNE_RELATION_LEGALE:
            partiesPrenantesConcatenees.push(((partiePrenante.personneRelationLegale?.typeRelationLegale?.libelle ?? '') + ' de ' + (partiePrenante.personneRelationLegale?.personneCible?.personnePhysique?.nom ?? '') + ' ' + (partiePrenante.personneRelationLegale?.personneCible?.personnePhysique?.prenoms ?? '')).trim())
            break;

          case CategoriesPartiePrenante.GROUPE_PERSONNE_PHYSIQUE:
            let personnesMembres: string[] = []
            partiePrenante.groupePersonnePhysique?.personnesMembres?.forEach((personneMembre: PersonneMembre) => {
              personnesMembres.push(((personneMembre.personnePhysique?.nom ?? '') + ' ' + (personneMembre.personnePhysique?.prenoms ?? '')).trim())
            })
            partiesPrenantesConcatenees.push(personnesMembres.join(' & '))
            break;

          case CategoriesPartiePrenante.GROUPE_CONJOINTS:
            let personnesConjointes: string[] = []
            partiePrenante.groupeConjoints?.personnesConjointes?.forEach((personneConjointe: PersonneConjointe) => {
              personnesConjointes.push(((personneConjointe.personnePhysique?.nom ?? '') + ' ' + (personneConjointe.personnePhysique?.prenoms ?? '')).trim())
            })
            partiesPrenantesConcatenees.push(personnesConjointes.join(' & '))
            break;

          case CategoriesPartiePrenante.GROUPE_HERITIERS:
            partiesPrenantesConcatenees.push(('Successeurs de ' + (partiePrenante.groupeHeritiers?.personneDisposant?.personnePhysique?.nom ?? '') + ' ' + (partiePrenante.groupeHeritiers?.personneDisposant?.personnePhysique?.prenoms ?? '')).trim())
            break;

          default:
            break;
        }
      }
    }

    partiesPrenantesConcatenees = partiesPrenantesConcatenees.filter(value => value.trim() != '')

    return partiesPrenantesConcatenees.length != 0 ? partiesPrenantesConcatenees.join(', ').trim() : '---'
  }

  getPartiesPrenantesParCategorie(partiesPrenantes: PartiePrenante[], typePartiePrenante: TypesPartiePrenante): { [key: string]: string } | null {
    let partiesPrenantesRegoupeesParCategorie: { [key: string]: string[] } = {}

    for (let index = 0; index < partiesPrenantes.length; index++) {
      const partiePrenante: PartiePrenante = partiesPrenantes[index];

      // Regrouper les parties par catégorie
      if (partiePrenante.type == typePartiePrenante) {
        switch (partiePrenante.categorie) {
          case CategoriesPartiePrenante.PERSONNE_PHYSIQUE:
            if (partiePrenante.personnePhysique && partiePrenante.personnePhysique.nom && partiePrenante.personnePhysique.prenoms) {
              const personnePhysique: string = partiePrenante.personnePhysique?.nom + ' ' + partiePrenante.personnePhysique?.prenoms

              if (Object.keys(partiesPrenantesRegoupeesParCategorie).includes(CategoriesPartiePrenante.PERSONNE_PHYSIQUE)) {
                partiesPrenantesRegoupeesParCategorie[CategoriesPartiePrenante.PERSONNE_PHYSIQUE].push(personnePhysique)
              }
              else {
                partiesPrenantesRegoupeesParCategorie[CategoriesPartiePrenante.PERSONNE_PHYSIQUE] = [personnePhysique]
              }
            }

            break;

          case CategoriesPartiePrenante.PERSONNE_MORALE:
            if (partiePrenante.personneMorale && partiePrenante.personneMorale.raisonSocialeOuDenomination) {
              const personneMorale: string = partiePrenante.personneMorale?.raisonSocialeOuDenomination

              if (Object.keys(partiesPrenantesRegoupeesParCategorie).includes(CategoriesPartiePrenante.PERSONNE_MORALE)) {
                partiesPrenantesRegoupeesParCategorie[CategoriesPartiePrenante.PERSONNE_MORALE].push(personneMorale)
              }
              else {
                partiesPrenantesRegoupeesParCategorie[CategoriesPartiePrenante.PERSONNE_MORALE] = [personneMorale]
              }
            }
            break;

          case CategoriesPartiePrenante.PERSONNE_RELATION_LEGALE:
            if (partiePrenante.personneRelationLegale
              && partiePrenante.personneRelationLegale.typeRelationLegale && partiePrenante.personneRelationLegale.typeRelationLegale.libelle
              && partiePrenante.personneRelationLegale.personneCible && partiePrenante.personneRelationLegale.personneCible.personnePhysique
              && partiePrenante.personneRelationLegale.personneCible.personnePhysique.nom && partiePrenante.personneRelationLegale.personneCible.personnePhysique.prenoms
            ) {
              const personneRelationLegale: string = partiePrenante.personneRelationLegale.typeRelationLegale.libelle + ' de ' + partiePrenante.personneRelationLegale.personneCible.personnePhysique.nom + ' ' + partiePrenante.personneRelationLegale.personneCible.personnePhysique?.prenoms

              if (Object.keys(partiesPrenantesRegoupeesParCategorie).includes(CategoriesPartiePrenante.PERSONNE_RELATION_LEGALE)) {
                partiesPrenantesRegoupeesParCategorie[CategoriesPartiePrenante.PERSONNE_RELATION_LEGALE].push(personneRelationLegale)
              }
              else {
                partiesPrenantesRegoupeesParCategorie[CategoriesPartiePrenante.PERSONNE_RELATION_LEGALE] = [personneRelationLegale]
              }
            }
            break;

          case CategoriesPartiePrenante.GROUPE_PERSONNE_PHYSIQUE:
            if (partiePrenante.groupePersonnePhysique && partiePrenante.groupePersonnePhysique.personnesMembres) {
              let personnesMembres: string[] = []

              for (let index = 0; index < partiePrenante.groupePersonnePhysique.personnesMembres.length; index++) {
                const personneMembre: PersonneMembre = partiePrenante.groupePersonnePhysique.personnesMembres[index];

                if (personneMembre.personnePhysique && personneMembre.personnePhysique.nom && personneMembre.personnePhysique.prenoms) {
                  personnesMembres.push(personneMembre.personnePhysique.nom + ' ' + personneMembre.personnePhysique.prenoms)
                }
              }

              if (Object.keys(partiesPrenantesRegoupeesParCategorie).includes(CategoriesPartiePrenante.GROUPE_PERSONNE_PHYSIQUE)) {
                partiesPrenantesRegoupeesParCategorie[CategoriesPartiePrenante.GROUPE_PERSONNE_PHYSIQUE].push(personnesMembres.join(' & '))
              }
              else {
                partiesPrenantesRegoupeesParCategorie[CategoriesPartiePrenante.GROUPE_PERSONNE_PHYSIQUE] = [personnesMembres.join(' & ')]
              }
            }
            break;

          case CategoriesPartiePrenante.GROUPE_CONJOINTS:
            if (partiePrenante.groupeConjoints && partiePrenante.groupeConjoints.personnesConjointes) {
              let personnesConjointes: string[] = []

              for (let index = 0; index < partiePrenante.groupeConjoints.personnesConjointes.length; index++) {
                const personneConjointe: PersonneConjointe = partiePrenante.groupeConjoints.personnesConjointes[index];

                if (personneConjointe.personnePhysique && personneConjointe.personnePhysique.nom && personneConjointe.personnePhysique.prenoms) {
                  personnesConjointes.push(personneConjointe.personnePhysique.nom + ' ' + personneConjointe.personnePhysique.prenoms)
                }
              }

              if (Object.keys(partiesPrenantesRegoupeesParCategorie).includes(CategoriesPartiePrenante.GROUPE_CONJOINTS)) {
                partiesPrenantesRegoupeesParCategorie[CategoriesPartiePrenante.GROUPE_CONJOINTS].push(personnesConjointes.join(' & '))
              }
              else {
                partiesPrenantesRegoupeesParCategorie[CategoriesPartiePrenante.GROUPE_CONJOINTS] = [personnesConjointes.join(' & ')]
              }
            }
            break;

          case CategoriesPartiePrenante.GROUPE_HERITIERS:
            if (partiePrenante.groupeHeritiers
              && partiePrenante.groupeHeritiers.personneDisposant && partiePrenante.groupeHeritiers.personneDisposant.personnePhysique
              && partiePrenante.groupeHeritiers.personneDisposant.personnePhysique.nom && partiePrenante.groupeHeritiers.personneDisposant.personnePhysique.prenoms
            ) {
              const groupeHeritiers: string = 'Successeurs de ' + partiePrenante.groupeHeritiers.personneDisposant.personnePhysique.nom + ' ' + partiePrenante.groupeHeritiers.personneDisposant.personnePhysique.prenoms
              if (Object.keys(partiesPrenantesRegoupeesParCategorie).includes(CategoriesPartiePrenante.GROUPE_HERITIERS)) {
                partiesPrenantesRegoupeesParCategorie[CategoriesPartiePrenante.GROUPE_HERITIERS].push(groupeHeritiers)
              }
              else {
                partiesPrenantesRegoupeesParCategorie[CategoriesPartiePrenante.GROUPE_HERITIERS] = [groupeHeritiers]
              }
            }
            break;

          default:
            break;
        }
      }
    }

    // Cancatener par catégorie
    const partiesPrenantesRegoupeesParCategorieKeys: string[] = Object.keys(partiesPrenantesRegoupeesParCategorie)
    let partiesPrenantesConcateneesEtRegoupeesParCategorie: { [key: string]: string } = {}
    for (let index = 0; index < partiesPrenantesRegoupeesParCategorieKeys.length; index++) {
      const categorie: string = partiesPrenantesRegoupeesParCategorieKeys[index];

      if (partiesPrenantesRegoupeesParCategorie[categorie].length > 0) {
        partiesPrenantesConcateneesEtRegoupeesParCategorie[categorie] = partiesPrenantesRegoupeesParCategorie[categorie].join(', ')
      }
    }

    return partiesPrenantesRegoupeesParCategorieKeys.length != 0 ? partiesPrenantesConcateneesEtRegoupeesParCategorie : null
  }

  private getPartiesPrenantesFromFormArray(formArrayValues: any[], type: TypesPartiePrenante, removeIds: boolean): PartiePrenante[] {
    let partiesPrenantes: PartiePrenante[] = []

    for (let index = 0; index < formArrayValues.length; index++) {
      const value = formArrayValues[index];
      let partiePrenante: PartiePrenante = new PartiePrenante()
      // partiePrenante.formalitePrealableId = formalitePrealableId
      partiePrenante.type = type
      partiePrenante.categorie = value.categorie
      if (!removeIds) {
        partiePrenante.id = value.partiePrenanteId
      }

      switch (value.categorie) {
        case CategoriesPartiePrenante.PERSONNE_MORALE:
          partiePrenante.personneMorale = value
          break;

        case CategoriesPartiePrenante.PERSONNE_RELATION_LEGALE:
          partiePrenante.personneRelationLegale = value
          break;

        case CategoriesPartiePrenante.GROUPE_PERSONNE_PHYSIQUE:
          partiePrenante.groupePersonnePhysique = value
          break;

        case CategoriesPartiePrenante.GROUPE_CONJOINTS:
          partiePrenante.groupeConjoints = value
          break;

        case CategoriesPartiePrenante.GROUPE_HERITIERS:
          partiePrenante.groupeHeritiers = value
          break;

        default:
          partiePrenante.personnePhysique = value
          break;
      }

      partiesPrenantes.push(partiePrenante)
    }

    return partiesPrenantes
  }

  getPartiesPrenantesFromFormGroup(formGroup: FormGroup, removeIds: boolean): PartiePrenante[] {
    let partiesPrenantes: PartiePrenante[] = []

    if (formGroup.value.requerants) {
      partiesPrenantes = partiesPrenantes.concat(this.getPartiesPrenantesFromFormArray(formGroup.value.requerants, TypesPartiePrenante.REQUERANT, removeIds))
    }

    if (formGroup.value.proprietaires) {
      partiesPrenantes = partiesPrenantes.concat(this.getPartiesPrenantesFromFormArray(formGroup.value.proprietaires, TypesPartiePrenante.PROPRIETAIRE, removeIds))
    }

    if (formGroup.value.alienateurs) {
      partiesPrenantes = partiesPrenantes.concat(this.getPartiesPrenantesFromFormArray(formGroup.value.alienateurs, TypesPartiePrenante.ALIENATEUR, removeIds))
    }

    if (formGroup.value.acquereurs) {
      partiesPrenantes = partiesPrenantes.concat(this.getPartiesPrenantesFromFormArray(formGroup.value.acquereurs, TypesPartiePrenante.ACQUEREUR, removeIds))
    }

    if (formGroup.value.intervenants) {
      partiesPrenantes = partiesPrenantes.concat(this.getPartiesPrenantesFromFormArray(formGroup.value.intervenants, TypesPartiePrenante.INTERVENANT, removeIds))
    }

    if (formGroup.value.proprietairesSuccessifs) {
      partiesPrenantes = partiesPrenantes.concat(this.getPartiesPrenantesFromFormArray(formGroup.value.proprietairesSuccessifs, TypesPartiePrenante.PROPRIETAIRE_SUCCESSIF, removeIds))
    }

    return partiesPrenantes
  }

  // getCategoriePartiePrenante(partiePrenante: PartiePrenante): CategoriesPartiePrenante {
  //   if (partiePrenante.personneMorale != undefined) {
  //     return CategoriesPartiePrenante.PERSONNE_MORALE
  //   }
  //   else if (partiePrenante.personneRelationLegale != undefined) {
  //     return CategoriesPartiePrenante.PERSONNE_RELATION_LEGALE
  //   }
  //   else {
  //     return CategoriesPartiePrenante.PERSONNE_PHYSIQUE
  //   }
  // }

  getPartiePrenateFilterFormGroup(): FormGroup {
    return new FormGroup({
      categorie: new FormControl(null, []),
      personnePhysique: new FormGroup({
        civilite: new FormControl(null, []),
        nom: new FormControl(null, []),
        prenoms: new FormControl(null, []),
        nationalite: new FormControl(null, []),
        profession: new FormControl(null, []),
        nif: new FormControl(null, []),
      }),
      personneMorale: new FormGroup({
        type: new FormControl(null, []),
        forme: new FormControl(null, []),
        denomination: new FormControl(null, []),
        secteur: new FormControl(null, []),
        adresse: new FormControl(null, []),
      }),
      personneRelationLegale: new FormGroup({
        relation: new FormControl(null, []),
        civilite: new FormControl(null, []),
        nom: new FormControl(null, []),
        prenoms: new FormControl(null, []),
        nationalite: new FormControl(null, []),
        profession: new FormControl(null, []),
        nif: new FormControl(null, []),
      }),
      groupePersonnePhysique: new FormGroup({
        lien: new FormControl(null, []),
        civilite: new FormControl(null, []),
        nom: new FormControl(null, []),
        prenoms: new FormControl(null, []),
        nationalite: new FormControl(null, []),
        profession: new FormControl(null, []),
        nif: new FormControl(null, []),
      }),
      groupeConjoints: new FormGroup({
        civilite: new FormControl(null, []),
        nom: new FormControl(null, []),
        prenoms: new FormControl(null, []),
        nationalite: new FormControl(null, []),
        profession: new FormControl(null, []),
        nif: new FormControl(null, []),
      }),
      groupeHeritiers: new FormGroup({
        civilite: new FormControl(null, []),
        nom: new FormControl(null, []),
        prenoms: new FormControl(null, []),
        nationalite: new FormControl(null, []),
        profession: new FormControl(null, []),
        nif: new FormControl(null, []),
      }),
    })
  }

}