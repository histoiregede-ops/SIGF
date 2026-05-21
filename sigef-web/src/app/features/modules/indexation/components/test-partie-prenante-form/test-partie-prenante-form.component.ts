import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';
import { CategoriesPartiePrenante } from '../../../../../data/enums/CategoriesPartiePrenante';
import { FormeJuridique } from '../../../../../data/modules/commun/models/FormeJuridique';
import { TypePersonneMorale } from '../../../../../data/modules/commun/models/TypePersonneMorale';
import { TypeRelationLegale } from '../../../../../data/modules/commun/models/TypeRelationLegale';
import { FormeJuridiqueService } from '../../../../../data/modules/commun/services/forme-juridique.service';
import { TypePersonneMoraleService } from '../../../../../data/modules/commun/services/type-personne-morale.service';
import { TypeRelationLegaleService } from '../../../../../data/modules/commun/services/type-relation-legale.service';
import { PartiePrenante } from '../../../../../data/modules/gestion-dossiers/models/PartiePrenante';
import { PartiePrenanteUtils } from '../../../../../data/utils/PartiePrenanteUtils';
import { CiviliteService } from '../../../../../data/modules/commun/services/civilite.service';
import { NationaliteService } from '../../../../../data/modules/commun/services/nationalite.service';
import { ProfessionService } from '../../../../../data/modules/commun/services/profession.service';
import { Civilite } from '../../../../../data/modules/commun/models/Civilite';
import { Nationalite } from '../../../../../data/modules/commun/models/Nationalite';
import { Profession } from '../../../../../data/modules/commun/models/Profession';
import { SecteurActivite } from '../../../../../data/modules/commun/models/SecteurActivite';
import { SecteurActiviteService } from '../../../../../data/modules/commun/services/secteur-activite.service';
import { TypeLienGroupe } from '../../../../../data/modules/commun/models/TypeLienGroupe';
import { TypeLienGroupeService } from '../../../../../data/modules/commun/services/type-lien-groupe.service';
import { PersonneMembre } from '../../../../../data/modules/gestion-dossiers/models/PersonneMembre';
import { ProgressionTacheIndexation } from '../../../../../data/modules/indexation/models/ProgressionTacheIndexation';
import { PersonneConjointe } from '../../../../../data/modules/gestion-dossiers/models/PersonneConjointe';
import { ConjointPersonneDisposant } from '../../../../../data/modules/gestion-dossiers/models/ConjointPersonneDisposant';
import { PersonneHeritiere } from '../../../../../data/modules/gestion-dossiers/models/PersonneHeritiere';
import { PartiePrenanteService } from '../../../../../data/modules/gestion-dossiers/services/partie-prenante.service';
import { PersonneMembreService } from '../../../../../data/modules/gestion-dossiers/services/personne-membre.service';
import { PersonneConjointeService } from '../../../../../data/modules/gestion-dossiers/services/personne-conjointe.service';
import { ConjointPersonneDisposantService } from '../../../../../data/modules/gestion-dossiers/services/conjoint-personne-disposant.service';
import { PersonneHeritiereService } from '../../../../../data/modules/gestion-dossiers/services/personne-heritiere.service';
import { RepresentantPersonnePhysiqueService } from '../../../../../data/modules/gestion-dossiers/services/representant-personne-physique.service';
import { RepresentantPersonneMoraleService } from '../../../../../data/modules/gestion-dossiers/services/representant-personne-morale.service';
import { RepresentantPersonneMorale } from '../../../../../data/modules/gestion-dossiers/models/RepresentantPersonneMorale';
import { RepresentantPersonnePhysique } from '../../../../../data/modules/gestion-dossiers/models/RepresentantPersonnePhysique';

@Component({
  selector: 'app-test-partie-prenante-form',
  templateUrl: './test-partie-prenante-form.component.html',
  styleUrl: './test-partie-prenante-form.component.scss'
})
export class TestPartiePrenanteFormComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  @Input() formulaireEtatActif: boolean = true
  @Input() progressionTacheIndexation?: ProgressionTacheIndexation
  // @Output() partiesPrenantesChange: EventEmitter<PartiePrenante[]> = new EventEmitter<PartiePrenante[]>();

  showSuppressionPartiePrenanteModal: boolean = false
  showSuppressionPersonneMembreModal: boolean = false
  showSuppressionPersonneConjointeModal: boolean = false
  showSuppressionConjointPersonneDisposantModal: boolean = false
  showSuppressionPersonneHeritiereModal: boolean = false
  showSuppressionRepresentantPersonnePhysiqueModal: boolean = false
  showSuppressionRepresentantPersonneMoraleModal: boolean = false
  showSuppressionRepresentantPersonneMembreModal: boolean = false
  showSuppressionRepresentantPersonneConjointeModal: boolean = false
  showSuppressionRepresentantPersonneHeritiereModal: boolean = false

  error: boolean = false
  nouvellePartiePrenanteArrayForm: FormGroup = new FormGroup({
    requerants: new FormArray([]),
    proprietaires: new FormArray([]),
  })

  partiesPrenantes(typePartiePrenante: TypesPartiePrenante): FormArray {
    if (typePartiePrenante == TypesPartiePrenante.REQUERANT) {
      return this.nouvellePartiePrenanteArrayForm.controls['requerants'] as FormArray
    }
    else {
      return this.nouvellePartiePrenanteArrayForm.controls['proprietaires'] as FormArray
    }

  }

  representantsPersonnePhysique(typePartiePrenante: TypesPartiePrenante, personnePhysiqueIndex: number): FormArray {
    return this.partiesPrenantes(typePartiePrenante).at(personnePhysiqueIndex).get('representants') as FormArray
  }

  representantsPersonneMorale(typePartiePrenante: TypesPartiePrenante, personneMoraleIndex: number): FormArray {
    return this.partiesPrenantes(typePartiePrenante).at(personneMoraleIndex).get('representants') as FormArray
  }

  personnesMembres(typePartiePrenante: TypesPartiePrenante, groupePersonnePhysiqueIndex: number): FormArray {
    return this.partiesPrenantes(typePartiePrenante).at(groupePersonnePhysiqueIndex).get('personnesMembres') as FormArray
  }

  representantsPersonneMembre(typePartiePrenante: TypesPartiePrenante, groupePersonnePhysiqueIndex: number, personneMembreIndex: number): FormArray {
    return this.personnesMembres(typePartiePrenante, groupePersonnePhysiqueIndex).at(personneMembreIndex).get('personnePhysique')!.get('representants') as FormArray
  }

  personnesConjointes(typePartiePrenante: TypesPartiePrenante, groupeConjointsIndex: number): FormArray {
    return this.partiesPrenantes(typePartiePrenante).at(groupeConjointsIndex).get('personnesConjointes') as FormArray
  }

  representantsPersonneConjointe(typePartiePrenante: TypesPartiePrenante, groupeConjointsIndex: number, personneConjointeIndex: number): FormArray {
    return this.personnesConjointes(typePartiePrenante, groupeConjointsIndex).at(personneConjointeIndex).get('personnePhysique')!.get('representants') as FormArray
  }

  conjointsPersonneDisposant(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number): FormArray {
    return this.partiesPrenantes(typePartiePrenante).at(groupeHeritiersIndex).get('conjointsPersonneDisposant') as FormArray
  }

  personnesHeritieres(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number): FormArray {
    return this.conjointsPersonneDisposant(typePartiePrenante, groupeHeritiersIndex).at(conjointPersonneDisposantIndex).get('personnesHeritieres') as FormArray
  }

  representantsPersonneHeritiere(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number): FormArray {
    return this.personnesHeritieres(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex).at(personneHeritiereIndex).get('personnePhysique')!.get('representants') as FormArray
  }

  suppressionPartiePrenanteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
  })

  suppressionPersonneMembreForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupePersonnePhysiqueIndex: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
  })

  suppressionPersonneConjointeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupeConjointsIndex: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
  })

  suppressionConjointPersonneDisposantForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupeHeritiersIndex: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
  })

  suppressionPersonneHeritiereForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupeHeritiersIndex: new FormControl(null, [Validators.required]),
    conjointPersonneDisposantIndex: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
  })

  suppressionRepresentantPersonnePhysiqueForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    personnePhysiqueIndex: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
  })

  suppressionRepresentantPersonneMoraleForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    personneMoraleIndex: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
  })

  suppressionRepresentantPersonneMembreForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupePersonnePhysiqueIndex: new FormControl(null, [Validators.required]),
    personneMembreIndex: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
  })

  suppressionRepresentantPersonneConjointeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupeConjointsIndex: new FormControl(null, [Validators.required]),
    personneConjointeIndex: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
  })

  suppressionRepresentantPersonneHeritiereForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupeHeritiersIndex: new FormControl(null, [Validators.required]),
    conjointPersonneDisposantIndex: new FormControl(null, [Validators.required]),
    personneHeritiereIndex: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
  })

  typesPersonneMorale: TypePersonneMorale[] = []
  formesJuridiques: FormeJuridique[] = []
  typesRelationLegale: TypeRelationLegale[] = []
  typesLienGroupe: TypeLienGroupe[] = []
  civilites: Civilite[] = []
  nationalites: Nationalite[] = []
  professions: Profession[] = []
  secteursActivite: SecteurActivite[] = []

  readonly categoriesPartiePrenante = CategoriesPartiePrenante
  readonly typesPartiePrenante = TypesPartiePrenante

  constructor(
    private router: Router,
    private formeJuridiqueService: FormeJuridiqueService,
    private typePersonneMoraleService: TypePersonneMoraleService,
    private typeRelationLegaleService: TypeRelationLegaleService,
    private typeLienGroupeService: TypeLienGroupeService,
    private civiliteService: CiviliteService,
    private nationaliteService: NationaliteService,
    private professionService: ProfessionService,
    private secteurActiviteService: SecteurActiviteService,
    private partiePrenanteService: PartiePrenanteService,
    private personneMembreService: PersonneMembreService,
    private personneConjointeService: PersonneConjointeService,
    private conjointPersonneDisposantService: ConjointPersonneDisposantService,
    private personneHeritiereService: PersonneHeritiereService,
    private representantPersonnePhysiqueService: RepresentantPersonnePhysiqueService,
    private representantPersonneMoraleService: RepresentantPersonneMoraleService,
  ) {
    // Écouter les changements de valeurs du formulaire et émettre un événement
    // this.nouvellePartiePrenanteArrayForm.valueChanges.subscribe(value => {
    //   console.log("Modif: ",value)
    //   this.partiesPrenantesChange.emit(this.partiesPrenantes.value);
    // });
  }

  ngOnInit(): void {
    // this.getCivilites()
  }

  getFormesJuridiques(): void {
    this.formeJuridiqueService.getAllData()
      .subscribe({
        next: (value: FormeJuridique[]) => {
          this.formesJuridiques = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      })
  }

  getTypesPersonneMorale(): void {
    this.typePersonneMoraleService.getAllData()
      .subscribe({
        next: (value: TypePersonneMorale[]) => {
          this.typesPersonneMorale = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      })
  }

  getTypesRelationLegale(): void {
    this.typeRelationLegaleService.getAllData()
      .subscribe({
        next: (value: TypeRelationLegale[]) => {
          this.typesRelationLegale = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      })
  }

  getTypesLienGroupe(): void {
    this.typeLienGroupeService.getAllData()
      .subscribe({
        next: (value: TypeLienGroupe[]) => {
          this.typesLienGroupe = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      })
  }

  getCivilites(): void {
    this.civiliteService.getAllData()
      .subscribe({
        next: (value: Civilite[]) => {
          this.civilites = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      })
  }

  getNationalites(): void {
    this.nationaliteService.getAllData()
      .subscribe({
        next: (value: Nationalite[]) => {
          this.nationalites = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      })
  }

  getProfessions(): void {
    this.professionService.getAllData()
      .subscribe({
        next: (value: Profession[]) => {
          this.professions = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      })
  }

  getSecteursActivite(): void {
    this.secteurActiviteService.getAllData()
      .subscribe({
        next: (value: SecteurActivite[]) => {
          this.secteursActivite = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      })
  }

  validerSaisie(): void {
    console.log(this.getPartiesPrenantes(false))
  }

  supprimerPartiePrenante(): void {
    if (this.suppressionPartiePrenanteForm.valid) {
      let partiePrenanteId: string = this.suppressionPartiePrenanteForm.get('id')?.value
      console.log(partiePrenanteId)

      this.partiePrenanteService.delete(partiePrenanteId)
        .subscribe({
          next: () => {
            let partiePrenanteIndex: number = this.suppressionPartiePrenanteForm.get('index')?.value
            let partiePrenanteType: TypesPartiePrenante = this.suppressionPartiePrenanteForm.get('type')?.value

            this.removePartiePrenanteAtIndex(partiePrenanteType, partiePrenanteIndex)
            this.closeSuppressionPartiePrenanteModal()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        })
    }
  }

  supprimerPersonneMembre(): void {
    if (this.suppressionPersonneMembreForm.valid) {
      let personneMembreId: string = this.suppressionPersonneMembreForm.get('id')?.value
      console.log(personneMembreId)

      this.personneMembreService.delete(personneMembreId)
        .subscribe({
          next: () => {
            let personneMembreIndex: number = this.suppressionPersonneMembreForm.get('index')?.value
            let groupePersonnePhysiqueIndex: number = this.suppressionPersonneMembreForm.get('groupePersonnePhysiqueIndex')?.value
            let partiePrenanteType: TypesPartiePrenante = this.suppressionPersonneMembreForm.get('type')?.value

            this.removePersonneMembreAtIndex(partiePrenanteType, groupePersonnePhysiqueIndex, personneMembreIndex)
            this.closeSuppressionPersonneMembreModal()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        })
    }
  }

  supprimerPersonneConjointe(): void {
    if (this.suppressionPersonneConjointeForm.valid) {
      let personneConjointeId: string = this.suppressionPersonneConjointeForm.get('id')?.value
      console.log(personneConjointeId)

      this.personneConjointeService.delete(personneConjointeId)
        .subscribe({
          next: () => {
            let personneConjointeIndex: number = this.suppressionPersonneConjointeForm.get('index')?.value
            let groupeConjointsIndex: number = this.suppressionPersonneConjointeForm.get('groupeConjointsIndex')?.value
            let partiePrenanteType: TypesPartiePrenante = this.suppressionPersonneConjointeForm.get('type')?.value

            this.removePersonneConjointeAtIndex(partiePrenanteType, groupeConjointsIndex, personneConjointeIndex)
            this.closeSuppressionPersonneConjointeModal()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        })
    }
  }

  supprimerConjointPersonneDisposant(): void {
    if (this.suppressionConjointPersonneDisposantForm.valid) {
      let conjointPersonneDisposantId: string = this.suppressionConjointPersonneDisposantForm.get('id')?.value
      console.log(conjointPersonneDisposantId)

      this.conjointPersonneDisposantService.delete(conjointPersonneDisposantId)
        .subscribe({
          next: () => {
            let conjointPersonneDisposantIndex: number = this.suppressionConjointPersonneDisposantForm.get('index')?.value
            let groupeHeritiersIndex: number = this.suppressionConjointPersonneDisposantForm.get('groupeHeritiersIndex')?.value
            let partiePrenanteType: TypesPartiePrenante = this.suppressionConjointPersonneDisposantForm.get('type')?.value

            this.removeConjointPersonneDisposantAtIndex(partiePrenanteType, groupeHeritiersIndex, conjointPersonneDisposantIndex)
            this.closeSuppressionConjointPersonneDisposantModal()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        })
    }
  }

  supprimerPersonneHeritiere(): void {
    if (this.suppressionPersonneHeritiereForm.valid) {
      let personneHeritiereId: string = this.suppressionPersonneHeritiereForm.get('id')?.value
      console.log(personneHeritiereId)

      this.personneHeritiereService.delete(personneHeritiereId)
        .subscribe({
          next: () => {
            let personneHeritiereIndex: number = this.suppressionPersonneHeritiereForm.get('index')?.value
            let groupeHeritiersIndex: number = this.suppressionPersonneHeritiereForm.get('groupeHeritiersIndex')?.value
            let conjointPersonneDisposantIndex: number = this.suppressionPersonneHeritiereForm.get('conjointPersonneDisposantIndex')?.value
            let partiePrenanteType: TypesPartiePrenante = this.suppressionPersonneHeritiereForm.get('type')?.value

            this.removePersonneHeritiereAtIndex(partiePrenanteType, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex)
            this.closeSuppressionPersonneHeritiereModal()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        })
    }
  }

  supprimerRepresentantPersonnePhysique(): void {
    if (this.suppressionRepresentantPersonnePhysiqueForm.valid) {
      let representantPersonnePhysiqueId: string = this.suppressionRepresentantPersonnePhysiqueForm.get('id')?.value
      console.log(representantPersonnePhysiqueId)

      this.representantPersonnePhysiqueService.delete(representantPersonnePhysiqueId)
        .subscribe({
          next: () => {
            let representantPersonnePhysiqueIndex: number = this.suppressionRepresentantPersonnePhysiqueForm.get('index')?.value
            let personnePhysiqueIndex: number = this.suppressionRepresentantPersonnePhysiqueForm.get('personnePhysiqueIndex')?.value
            let partiePrenanteType: TypesPartiePrenante = this.suppressionRepresentantPersonnePhysiqueForm.get('type')?.value

            this.removeRepresentantPersonnePhysiqueAtIndex(partiePrenanteType, personnePhysiqueIndex, representantPersonnePhysiqueIndex)
            this.closeSuppressionRepresentantPersonnePhysiqueModal()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        })
    }
  }

  supprimerRepresentantPersonneMorale(): void {
    if (this.suppressionRepresentantPersonneMoraleForm.valid) {
      let representantPersonneMoraleId: string = this.suppressionRepresentantPersonneMoraleForm.get('id')?.value
      console.log(representantPersonneMoraleId)

      this.representantPersonneMoraleService.delete(representantPersonneMoraleId)
        .subscribe({
          next: () => {
            let representantPersonneMoraleIndex: number = this.suppressionRepresentantPersonneMoraleForm.get('index')?.value
            let personneMoraleIndex: number = this.suppressionRepresentantPersonneMoraleForm.get('personneMoraleIndex')?.value
            let partiePrenanteType: TypesPartiePrenante = this.suppressionRepresentantPersonneMoraleForm.get('type')?.value

            this.removeRepresentantPersonneMoraleAtIndex(partiePrenanteType, personneMoraleIndex, representantPersonneMoraleIndex)
            this.closeSuppressionRepresentantPersonneMoraleModal()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        })
    }
  }

  supprimerRepresentantPersonneMembre(): void {
    if (this.suppressionRepresentantPersonneMembreForm.valid) {
      let representantPersonneMembreId: string = this.suppressionRepresentantPersonneMembreForm.get('id')?.value
      console.log(representantPersonneMembreId)

      this.representantPersonnePhysiqueService.delete(representantPersonneMembreId)
        .subscribe({
          next: () => {
            let representantPersonneMembreIndex: number = this.suppressionRepresentantPersonneMembreForm.get('index')?.value
            let groupePersonnePhysiqueIndex: number = this.suppressionRepresentantPersonneMembreForm.get('groupePersonnePhysiqueIndex')?.value
            let personneMembreIndex: number = this.suppressionRepresentantPersonneMembreForm.get('personneMembreIndex')?.value
            let partiePrenanteType: TypesPartiePrenante = this.suppressionRepresentantPersonneMembreForm.get('type')?.value

            this.removeRepresentantPersonneMembreAtIndex(partiePrenanteType, groupePersonnePhysiqueIndex, personneMembreIndex, representantPersonneMembreIndex)
            this.closeSuppressionRepresentantPersonneMembreModal()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        })
    }
  }

  supprimerRepresentantPersonneConjointe(): void {
    if (this.suppressionRepresentantPersonneConjointeForm.valid) {
      let representantPersonneConjointeId: string = this.suppressionRepresentantPersonneConjointeForm.get('id')?.value
      console.log(representantPersonneConjointeId)

      this.representantPersonnePhysiqueService.delete(representantPersonneConjointeId)
        .subscribe({
          next: () => {
            let representantPersonneConjointeIndex: number = this.suppressionRepresentantPersonneConjointeForm.get('index')?.value
            let groupeConjointsIndex: number = this.suppressionRepresentantPersonneConjointeForm.get('groupeConjointsIndex')?.value
            let personneConjointeIndex: number = this.suppressionRepresentantPersonneConjointeForm.get('personneConjointeIndex')?.value
            let partiePrenanteType: TypesPartiePrenante = this.suppressionRepresentantPersonneConjointeForm.get('type')?.value

            this.removeRepresentantPersonneConjointeAtIndex(partiePrenanteType, groupeConjointsIndex, personneConjointeIndex, representantPersonneConjointeIndex)
            this.closeSuppressionRepresentantPersonneConjointeModal()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        })
    }
  }

  supprimerRepresentantPersonneHeritiere(): void {
    if (this.suppressionRepresentantPersonneHeritiereForm.valid) {
      let representantPersonneHeritiereId: string = this.suppressionRepresentantPersonneHeritiereForm.get('id')?.value
      console.log(representantPersonneHeritiereId)

      this.representantPersonnePhysiqueService.delete(representantPersonneHeritiereId)
        .subscribe({
          next: () => {
            let representantPersonneHeritiereIndex: number = this.suppressionRepresentantPersonneHeritiereForm.get('index')?.value
            let groupeHeritiersIndex: number = this.suppressionRepresentantPersonneHeritiereForm.get('groupeHeritiersIndex')?.value
            let conjointPersonneDisposantIndex: number = this.suppressionRepresentantPersonneHeritiereForm.get('conjointPersonneDisposantIndex')?.value
            let personneHeritiereIndex: number = this.suppressionRepresentantPersonneHeritiereForm.get('personneHeritiereIndex')?.value
            let partiePrenanteType: TypesPartiePrenante = this.suppressionRepresentantPersonneHeritiereForm.get('type')?.value

            this.removeRepresentantPersonneHeritiereAtIndex(partiePrenanteType, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex, representantPersonneHeritiereIndex)
            this.closeSuppressionRepresentantPersonneHeritiereModal()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        })
    }
  }

  // Utils
  getPartiesPrenantes(removeIds: boolean = true): PartiePrenante[] {
    return PartiePrenanteUtils.getInstance().getPartiesPrenantesFromFormGroup(this.nouvellePartiePrenanteArrayForm, removeIds)
  }

  addPartiePrenante(typePartiePrenante: TypesPartiePrenante, categorie: CategoriesPartiePrenante, removeIds: boolean, value?: PartiePrenante): void {
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      let partiePrenanteFormGroup: FormGroup

      switch (categorie) {
        case CategoriesPartiePrenante.PERSONNE_PHYSIQUE:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, [Validators.required]),
            nom: new FormControl(value ? value.personnePhysique?.nom : null, [Validators.required]),
            prenoms: new FormControl(value ? value.personnePhysique?.prenoms : null, [Validators.required]),
            telephone: new FormControl(value ? value.personnePhysique?.telephone : null, []),
            adresseDomicile: new FormControl(value ? value.personnePhysique?.adresseDomicile : null, []),
            adresseResidence: new FormControl(value ? value.personnePhysique?.adresseResidence : null, []),
            anneeNaissance: new FormControl(value ? value.personnePhysique?.anneeNaissance : null, []),
            dateNaissance: new FormControl(value ? value.personnePhysique?.dateNaissance : null, []),
            lieuNaissance: new FormControl(value ? value.personnePhysique?.lieuNaissance : null, []),
            nif: new FormControl(value ? value.personnePhysique?.nif : null, []),
            nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
            vivant: new FormControl(value ? value.personnePhysique?.vivant : 1, []),
            civiliteId: new FormControl(value ? value.personnePhysique?.civiliteId : null, []),
            nationaliteId: new FormControl(value ? value.personnePhysique?.nationaliteId : null, []),
            professionId: new FormControl(value ? value.personnePhysique?.professionId : null, []),
            representants: new FormArray([]),
          })

          // En cas de modification d'un existant
          if (!removeIds) {
            partiePrenanteFormGroup.addControl('partiePrenanteId', new FormControl(value ? value.id : null, []))
            partiePrenanteFormGroup.addControl('id', new FormControl(value ? value.personnePhysique?.id : null, []))
          }
          break;

        case CategoriesPartiePrenante.PERSONNE_MORALE:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, [Validators.required]),
            raisonSocialeOuDenomination: new FormControl(value ? value.personneMorale?.raisonSocialeOuDenomination : null, [Validators.required]),
            formeJuridiqueId: new FormControl(value ? value.personneMorale?.formeJuridiqueId : null, [Validators.required]),
            typePersonneMoraleId: new FormControl(value ? value.personneMorale?.typePersonneMoraleId : null, [Validators.required]),
            secteurActiviteId: new FormControl(value ? value.personneMorale?.secteurActiviteId : null, []),
            adresse: new FormControl(value ? value.personneMorale?.adresse : null, []),
            telephone: new FormControl(value ? value.personneMorale?.telephone : null, []),
            representants: new FormArray([]),
          })

          // En cas de modification d'un existant
          if (!removeIds) {
            partiePrenanteFormGroup.addControl('partiePrenanteId', new FormControl(value ? value.id : null, []))
            partiePrenanteFormGroup.addControl('id', new FormControl(value ? value.personneMorale?.id : null, []))
          }
          break;

        case CategoriesPartiePrenante.PERSONNE_RELATION_LEGALE:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, [Validators.required]),
            typeRelationLegaleId: new FormControl(value ? value.personneRelationLegale?.typeRelationLegaleId : null, [Validators.required]),
            personneCible: new FormGroup({
              personnePhysique: new FormGroup({
                nom: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.nom : null, [Validators.required]),
                prenoms: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.prenoms : null, [Validators.required]),
                telephone: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.telephone : null, []),
                adresseDomicile: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.adresseDomicile : null, []),
                adresseResidence: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.adresseResidence : null, []),
                anneeNaissance: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.anneeNaissance : null, []),
                dateNaissance: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.dateNaissance : null, []),
                lieuNaissance: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.lieuNaissance : null, []),
                nif: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.nif : null, []),
                nomEpoux: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.nomEpoux : null, []),
                vivant: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.vivant : 1, []),
                civiliteId: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.civiliteId : null, []),
                nationaliteId: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.nationaliteId : null, []),
                professionId: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.professionId : null, []),
              })
            })
          })

          // En cas de modification d'un existant
          if (!removeIds) {
            partiePrenanteFormGroup.addControl('partiePrenanteId', new FormControl(value ? value.id : null, []))
            partiePrenanteFormGroup.addControl('id', new FormControl(value ? value.personneRelationLegale?.id : null, []))
          }
          break;

        case CategoriesPartiePrenante.GROUPE_PERSONNE_PHYSIQUE:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, [Validators.required]),
            typeLienGroupeId: new FormControl(value ? value.groupePersonnePhysique?.typeLienGroupeId : null, [Validators.required]),
            personnesMembres: new FormArray([]),
          })

          // En cas de modification d'un existant
          if (!removeIds) {
            partiePrenanteFormGroup.addControl('partiePrenanteId', new FormControl(value ? value.id : null, []))
            partiePrenanteFormGroup.addControl('id', new FormControl(value ? value.groupePersonnePhysique?.id : null, []))
          }
          break;

        case CategoriesPartiePrenante.GROUPE_CONJOINTS:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, [Validators.required]),
            personnesConjointes: new FormArray([]),
          })

          // En cas de modification d'un existant
          if (!removeIds) {
            partiePrenanteFormGroup.addControl('partiePrenanteId', new FormControl(value ? value.id : null, []))
            partiePrenanteFormGroup.addControl('id', new FormControl(value ? value.groupeConjoints?.id : null, []))
          }
          break;

        case CategoriesPartiePrenante.GROUPE_HERITIERS:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, [Validators.required]),
            termesSuccession: new FormControl(value ? value.groupeHeritiers?.termesSuccession : null, []),
            description: new FormControl(value ? value.groupeHeritiers?.description : null, []),
            personneDisposant: new FormGroup({
              personnePhysique: new FormGroup({
                nom: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.nom : null, [Validators.required]),
                prenoms: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.prenoms : null, [Validators.required]),
                telephone: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.telephone : null, []),
                adresseDomicile: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.adresseDomicile : null, []),
                adresseResidence: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.adresseResidence : null, []),
                anneeNaissance: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.anneeNaissance : null, []),
                dateNaissance: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.dateNaissance : null, []),
                lieuNaissance: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.lieuNaissance : null, []),
                nif: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.nif : null, []),
                nomEpoux: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.nomEpoux : null, []),
                vivant: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.vivant : 0, []),
                civiliteId: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.civiliteId : null, []),
                nationaliteId: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.nationaliteId : null, []),
                professionId: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.professionId : null, []),
              })
            }),
            conjointsPersonneDisposant: new FormArray([]),
          })

          // En cas de modification d'un existant
          if (!removeIds) {
            partiePrenanteFormGroup.addControl('partiePrenanteId', new FormControl(value ? value.id : null, []))
            partiePrenanteFormGroup.addControl('id', new FormControl(value ? value.groupeHeritiers?.id : null, []))
          }
          break;
      }

      if (!this.formulaireEtatActif) {
        partiePrenanteFormGroup.disable()
      }

      this.partiesPrenantes(typePartiePrenante).push(partiePrenanteFormGroup)
    }
  }

  removePartiePrenante(typePartiePrenante: TypesPartiePrenante, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionPartiePrenanteForm.get('index')?.setValue(index)
      this.suppressionPartiePrenanteForm.get('type')?.setValue(typePartiePrenante)
      this.suppressionPartiePrenanteForm.get('id')?.setValue(this.partiesPrenantes(typePartiePrenante).at(index).get('partiePrenanteId')?.value)

      this.openSuppressionPartiePrenanteModal()
    }
    else {
      this.removePartiePrenanteAtIndex(typePartiePrenante, index)
    }
  }

  private removePartiePrenanteAtIndex(typePartiePrenante: TypesPartiePrenante, index: number): void {
    this.partiesPrenantes(typePartiePrenante).removeAt(index)
  }

  addPersonneMembre(typePartiePrenante: TypesPartiePrenante, groupePersonnePhysiqueIndex: number, removeIds: boolean, value?: PersonneMembre): void {
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      if (this.partiesPrenantes(typePartiePrenante).at(groupePersonnePhysiqueIndex).valid) {
        let personneMembreFormGroup: FormGroup = new FormGroup({
          personnePhysique: new FormGroup({
            nom: new FormControl(value ? value.personnePhysique?.nom : null, [Validators.required]),
            prenoms: new FormControl(value ? value.personnePhysique?.prenoms : null, [Validators.required]),
            telephone: new FormControl(value ? value.personnePhysique?.telephone : null, []),
            adresseDomicile: new FormControl(value ? value.personnePhysique?.adresseDomicile : null, []),
            adresseResidence: new FormControl(value ? value.personnePhysique?.adresseResidence : null, []),
            anneeNaissance: new FormControl(value ? value.personnePhysique?.anneeNaissance : null, []),
            dateNaissance: new FormControl(value ? value.personnePhysique?.dateNaissance : null, []),
            lieuNaissance: new FormControl(value ? value.personnePhysique?.lieuNaissance : null, []),
            nif: new FormControl(value ? value.personnePhysique?.nif : null, []),
            nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
            vivant: new FormControl(value ? value.personnePhysique?.vivant : 1, []),
            civiliteId: new FormControl(value ? value.personnePhysique?.civiliteId : null, []),
            nationaliteId: new FormControl(value ? value.personnePhysique?.nationaliteId : null, []),
            professionId: new FormControl(value ? value.personnePhysique?.professionId : null, []),
            representants: new FormArray([]),
          })
        })

        if (!removeIds) {
          personneMembreFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
        }

        if (!this.formulaireEtatActif) {
          personneMembreFormGroup.disable()
        }

        this.personnesMembres(typePartiePrenante, groupePersonnePhysiqueIndex).push(personneMembreFormGroup)
      }
    }
  }

  removePersonneMembre(typePartiePrenante: TypesPartiePrenante, groupePersonnePhysiqueIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionPersonneMembreForm.get('index')?.setValue(index)
      this.suppressionPersonneMembreForm.get('groupePersonnePhysiqueIndex')?.setValue(groupePersonnePhysiqueIndex)
      this.suppressionPersonneMembreForm.get('id')?.setValue(this.personnesMembres(typePartiePrenante, groupePersonnePhysiqueIndex).at(index).get('id')?.value)
      this.suppressionPersonneMembreForm.get('type')?.setValue(typePartiePrenante)

      this.openSuppressionPersonneMembreModal()
    }
    else {
      this.removePersonneMembreAtIndex(typePartiePrenante, groupePersonnePhysiqueIndex, index)
    }
  }

  private removePersonneMembreAtIndex(typePartiePrenante: TypesPartiePrenante, groupePersonnePhysiqueIndex: number, index: number): void {
    this.personnesMembres(typePartiePrenante, groupePersonnePhysiqueIndex).removeAt(index)
  }

  addRepresentantPersonnePhysique(typePartiePrenante: TypesPartiePrenante, personnePhysiqueIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique): void {
    console.log(this.representantsPersonnePhysique(typePartiePrenante, personnePhysiqueIndex).valid)
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      if (this.representantsPersonnePhysique(typePartiePrenante, personnePhysiqueIndex).valid) {
        let representantPersonnePhysiqueFormGroup: FormGroup = new FormGroup({
          representant: new FormGroup({
            nom: new FormControl(value ? value.representant?.nom : null, [Validators.required]),
            prenoms: new FormControl(value ? value.representant?.prenoms : null, [Validators.required]),
            telephone: new FormControl(value ? value.representant?.telephone : null, []),
            adresseDomicile: new FormControl(value ? value.representant?.adresseDomicile : null, []),
            adresseResidence: new FormControl(value ? value.representant?.adresseResidence : null, []),
            anneeNaissance: new FormControl(value ? value.representant?.anneeNaissance : null, []),
            dateNaissance: new FormControl(value ? value.representant?.dateNaissance : null, []),
            lieuNaissance: new FormControl(value ? value.representant?.lieuNaissance : null, []),
            nif: new FormControl(value ? value.representant?.nif : null, []),
            nomEpoux: new FormControl(value ? value.representant?.nomEpoux : null, []),
            vivant: new FormControl(value ? value.representant?.vivant : 1, []),
            civiliteId: new FormControl(value ? value.representant?.civiliteId : null, []),
            nationaliteId: new FormControl(value ? value.representant?.nationaliteId : null, []),
            professionId: new FormControl(value ? value.representant?.professionId : null, []),
          })
        })

        if (!removeIds) {
          representantPersonnePhysiqueFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
        }

        if (!this.formulaireEtatActif) {
          representantPersonnePhysiqueFormGroup.disable()
        }

        this.representantsPersonnePhysique(typePartiePrenante, personnePhysiqueIndex).push(representantPersonnePhysiqueFormGroup)
      }
    }
  }

  removeRepresentantPersonnePhysique(typePartiePrenante: TypesPartiePrenante, personnePhysiqueIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionRepresentantPersonnePhysiqueForm.get('index')?.setValue(index)
      this.suppressionRepresentantPersonnePhysiqueForm.get('personnePhysiqueIndex')?.setValue(personnePhysiqueIndex)
      this.suppressionRepresentantPersonnePhysiqueForm.get('id')?.setValue(this.representantsPersonnePhysique(typePartiePrenante, personnePhysiqueIndex).at(index).get('id')?.value)
      this.suppressionRepresentantPersonnePhysiqueForm.get('type')?.setValue(typePartiePrenante)

      this.openSuppressionRepresentantPersonnePhysiqueModal()
    }
    else {
      this.removeRepresentantPersonnePhysiqueAtIndex(typePartiePrenante, personnePhysiqueIndex, index)
    }
  }

  private removeRepresentantPersonnePhysiqueAtIndex(typePartiePrenante: TypesPartiePrenante, personnePhysiqueIndex: number, index: number): void {
    this.representantsPersonnePhysique(typePartiePrenante, personnePhysiqueIndex).removeAt(index)
  }

  addRepresentantPersonneMorale(typePartiePrenante: TypesPartiePrenante, personneMoraleIndex: number, removeIds: boolean, value?: RepresentantPersonneMorale): void {
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      console.log(this.representantsPersonneMorale(typePartiePrenante, personneMoraleIndex).valid)
      if (this.representantsPersonneMorale(typePartiePrenante, personneMoraleIndex).valid) {
        let representantPersonneMoraleFormGroup: FormGroup = new FormGroup({
          representant: new FormGroup({
            nom: new FormControl(value ? value.representant?.nom : null, [Validators.required]),
            prenoms: new FormControl(value ? value.representant?.prenoms : null, [Validators.required]),
            telephone: new FormControl(value ? value.representant?.telephone : null, []),
            adresseDomicile: new FormControl(value ? value.representant?.adresseDomicile : null, []),
            adresseResidence: new FormControl(value ? value.representant?.adresseResidence : null, []),
            anneeNaissance: new FormControl(value ? value.representant?.anneeNaissance : null, []),
            dateNaissance: new FormControl(value ? value.representant?.dateNaissance : null, []),
            lieuNaissance: new FormControl(value ? value.representant?.lieuNaissance : null, []),
            nif: new FormControl(value ? value.representant?.nif : null, []),
            nomEpoux: new FormControl(value ? value.representant?.nomEpoux : null, []),
            vivant: new FormControl(value ? value.representant?.vivant : 1, []),
            civiliteId: new FormControl(value ? value.representant?.civiliteId : null, []),
            nationaliteId: new FormControl(value ? value.representant?.nationaliteId : null, []),
            professionId: new FormControl(value ? value.representant?.professionId : null, []),
          })
        })

        if (!removeIds) {
          representantPersonneMoraleFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
        }

        if (!this.formulaireEtatActif) {
          representantPersonneMoraleFormGroup.disable()
        }

        this.representantsPersonneMorale(typePartiePrenante, personneMoraleIndex).push(representantPersonneMoraleFormGroup)
      }
    }
  }

  removeRepresentantPersonneMorale(typePartiePrenante: TypesPartiePrenante, personneMoraleIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionRepresentantPersonneMoraleForm.get('index')?.setValue(index)
      this.suppressionRepresentantPersonneMoraleForm.get('personneMoraleIndex')?.setValue(personneMoraleIndex)
      this.suppressionRepresentantPersonneMoraleForm.get('id')?.setValue(this.representantsPersonneMorale(typePartiePrenante, personneMoraleIndex).at(index).get('id')?.value)
      this.suppressionRepresentantPersonneMoraleForm.get('type')?.setValue(typePartiePrenante)

      this.openSuppressionRepresentantPersonneMoraleModal()
    }
    else {
      this.removeRepresentantPersonneMoraleAtIndex(typePartiePrenante, personneMoraleIndex, index)
    }
  }

  private removeRepresentantPersonneMoraleAtIndex(typePartiePrenante: TypesPartiePrenante, personneMoraleIndex: number, index: number): void {
    this.representantsPersonneMorale(typePartiePrenante, personneMoraleIndex).removeAt(index)
  }

  addPersonneConjointe(typePartiePrenante: TypesPartiePrenante, groupeConjointsIndex: number, removeIds: boolean, value?: PersonneConjointe): void {
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      if (this.partiesPrenantes(typePartiePrenante).at(groupeConjointsIndex).valid) {
        let personneConjointeFormGroup: FormGroup = new FormGroup({
          personnePhysique: new FormGroup({
            nom: new FormControl(value ? value.personnePhysique?.nom : null, [Validators.required]),
            prenoms: new FormControl(value ? value.personnePhysique?.prenoms : null, [Validators.required]),
            telephone: new FormControl(value ? value.personnePhysique?.telephone : null, []),
            adresseDomicile: new FormControl(value ? value.personnePhysique?.adresseDomicile : null, []),
            adresseResidence: new FormControl(value ? value.personnePhysique?.adresseResidence : null, []),
            anneeNaissance: new FormControl(value ? value.personnePhysique?.anneeNaissance : null, []),
            dateNaissance: new FormControl(value ? value.personnePhysique?.dateNaissance : null, []),
            lieuNaissance: new FormControl(value ? value.personnePhysique?.lieuNaissance : null, []),
            nif: new FormControl(value ? value.personnePhysique?.nif : null, []),
            nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
            vivant: new FormControl(value ? value.personnePhysique?.vivant : 1, []),
            civiliteId: new FormControl(value ? value.personnePhysique?.civiliteId : null, []),
            nationaliteId: new FormControl(value ? value.personnePhysique?.nationaliteId : null, []),
            professionId: new FormControl(value ? value.personnePhysique?.professionId : null, []),
            representants: new FormArray([]),
          })
        })

        if (!removeIds) {
          personneConjointeFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
        }

        if (!this.formulaireEtatActif) {
          personneConjointeFormGroup.disable()
        }

        this.personnesConjointes(typePartiePrenante, groupeConjointsIndex).push(personneConjointeFormGroup)
      }
    }
  }

  removePersonneConjointe(typePartiePrenante: TypesPartiePrenante, groupeConjointsIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionPersonneConjointeForm.get('index')?.setValue(index)
      this.suppressionPersonneConjointeForm.get('groupeConjointsIndex')?.setValue(groupeConjointsIndex)
      this.suppressionPersonneConjointeForm.get('id')?.setValue(this.personnesConjointes(typePartiePrenante, groupeConjointsIndex).at(index).get('id')?.value)
      this.suppressionPersonneConjointeForm.get('type')?.setValue(typePartiePrenante)

      this.openSuppressionPersonneConjointeModal()
    }
    else {
      this.removePersonneConjointeAtIndex(typePartiePrenante, groupeConjointsIndex, index)
    }
  }

  private removePersonneConjointeAtIndex(typePartiePrenante: TypesPartiePrenante, groupeConjointsIndex: number, index: number): void {
    this.personnesConjointes(typePartiePrenante, groupeConjointsIndex).removeAt(index)
  }

  addRepresentantPersonneMembre(typePartiePrenante: TypesPartiePrenante, groupePersonnePhysiqueIndex: number, personneMembreIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique): void {
    console.log(this.representantsPersonneMembre(typePartiePrenante, groupePersonnePhysiqueIndex, personneMembreIndex).valid)
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      if (this.representantsPersonneMembre(typePartiePrenante, groupePersonnePhysiqueIndex, personneMembreIndex).valid) {
        let representantPersonneMembreFormGroup: FormGroup = new FormGroup({
          representant: new FormGroup({
            nom: new FormControl(value ? value.representant?.nom : null, [Validators.required]),
            prenoms: new FormControl(value ? value.representant?.prenoms : null, [Validators.required]),
            telephone: new FormControl(value ? value.representant?.telephone : null, []),
            adresseDomicile: new FormControl(value ? value.representant?.adresseDomicile : null, []),
            adresseResidence: new FormControl(value ? value.representant?.adresseResidence : null, []),
            anneeNaissance: new FormControl(value ? value.representant?.anneeNaissance : null, []),
            dateNaissance: new FormControl(value ? value.representant?.dateNaissance : null, []),
            lieuNaissance: new FormControl(value ? value.representant?.lieuNaissance : null, []),
            nif: new FormControl(value ? value.representant?.nif : null, []),
            nomEpoux: new FormControl(value ? value.representant?.nomEpoux : null, []),
            vivant: new FormControl(value ? value.representant?.vivant : 1, []),
            civiliteId: new FormControl(value ? value.representant?.civiliteId : null, []),
            nationaliteId: new FormControl(value ? value.representant?.nationaliteId : null, []),
            professionId: new FormControl(value ? value.representant?.professionId : null, []),
          })
        })

        if (!removeIds) {
          representantPersonneMembreFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
        }

        if (!this.formulaireEtatActif) {
          representantPersonneMembreFormGroup.disable()
        }

        this.representantsPersonneMembre(typePartiePrenante, groupePersonnePhysiqueIndex, personneMembreIndex).push(representantPersonneMembreFormGroup)
      }
    }
  }

  removeRepresentantPersonneMembre(typePartiePrenante: TypesPartiePrenante, groupePersonnePhysiqueIndex: number, personneMembreIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionRepresentantPersonneMembreForm.get('index')?.setValue(index)
      this.suppressionRepresentantPersonneMembreForm.get('groupePersonnePhysiqueIndex')?.setValue(groupePersonnePhysiqueIndex)
      this.suppressionRepresentantPersonneMembreForm.get('personneMembreIndex')?.setValue(personneMembreIndex)
      this.suppressionRepresentantPersonneMembreForm.get('id')?.setValue(this.representantsPersonneMembre(typePartiePrenante, groupePersonnePhysiqueIndex, personneMembreIndex).at(index).get('id')?.value)
      this.suppressionRepresentantPersonneMembreForm.get('type')?.setValue(typePartiePrenante)

      this.openSuppressionRepresentantPersonneMembreModal()
    }
    else {
      this.removeRepresentantPersonneMembreAtIndex(typePartiePrenante, groupePersonnePhysiqueIndex, personneMembreIndex, index)
    }
  }

  private removeRepresentantPersonneMembreAtIndex(typePartiePrenante: TypesPartiePrenante, groupePersonnePhysiqueIndex: number, personneMembreIndex: number, index: number): void {
    this.representantsPersonneMembre(typePartiePrenante, groupePersonnePhysiqueIndex, personneMembreIndex).removeAt(index)
  }

  addRepresentantPersonneConjointe(typePartiePrenante: TypesPartiePrenante, groupeConjointsIndex: number, personneConjointeIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique): void {
    console.log(this.representantsPersonneConjointe(typePartiePrenante, groupeConjointsIndex, personneConjointeIndex).valid)
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      if (this.representantsPersonneConjointe(typePartiePrenante, groupeConjointsIndex, personneConjointeIndex).valid) {
        let representantPersonneConjointeFormGroup: FormGroup = new FormGroup({
          representant: new FormGroup({
            nom: new FormControl(value ? value.representant?.nom : null, [Validators.required]),
            prenoms: new FormControl(value ? value.representant?.prenoms : null, [Validators.required]),
            telephone: new FormControl(value ? value.representant?.telephone : null, []),
            adresseDomicile: new FormControl(value ? value.representant?.adresseDomicile : null, []),
            adresseResidence: new FormControl(value ? value.representant?.adresseResidence : null, []),
            anneeNaissance: new FormControl(value ? value.representant?.anneeNaissance : null, []),
            dateNaissance: new FormControl(value ? value.representant?.dateNaissance : null, []),
            lieuNaissance: new FormControl(value ? value.representant?.lieuNaissance : null, []),
            nif: new FormControl(value ? value.representant?.nif : null, []),
            nomEpoux: new FormControl(value ? value.representant?.nomEpoux : null, []),
            vivant: new FormControl(value ? value.representant?.vivant : 1, []),
            civiliteId: new FormControl(value ? value.representant?.civiliteId : null, []),
            nationaliteId: new FormControl(value ? value.representant?.nationaliteId : null, []),
            professionId: new FormControl(value ? value.representant?.professionId : null, []),
          })
        })

        if (!removeIds) {
          representantPersonneConjointeFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
        }

        if (!this.formulaireEtatActif) {
          representantPersonneConjointeFormGroup.disable()
        }

        this.representantsPersonneConjointe(typePartiePrenante, groupeConjointsIndex, personneConjointeIndex).push(representantPersonneConjointeFormGroup)
      }
    }
  }

  removeRepresentantPersonneConjointe(typePartiePrenante: TypesPartiePrenante, groupeConjointsIndex: number, personneConjointeIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionRepresentantPersonneConjointeForm.get('index')?.setValue(index)
      this.suppressionRepresentantPersonneConjointeForm.get('groupeConjointsIndex')?.setValue(groupeConjointsIndex)
      this.suppressionRepresentantPersonneConjointeForm.get('personneConjointeIndex')?.setValue(personneConjointeIndex)
      this.suppressionRepresentantPersonneConjointeForm.get('id')?.setValue(this.representantsPersonneConjointe(typePartiePrenante, groupeConjointsIndex, personneConjointeIndex).at(index).get('id')?.value)
      this.suppressionRepresentantPersonneConjointeForm.get('type')?.setValue(typePartiePrenante)

      this.openSuppressionRepresentantPersonneConjointeModal()
    }
    else {
      this.removeRepresentantPersonneConjointeAtIndex(typePartiePrenante, groupeConjointsIndex, personneConjointeIndex, index)
    }
  }

  private removeRepresentantPersonneConjointeAtIndex(typePartiePrenante: TypesPartiePrenante, groupeConjointsIndex: number, personneConjointeIndex: number, index: number): void {
    this.representantsPersonneConjointe(typePartiePrenante, groupeConjointsIndex, personneConjointeIndex).removeAt(index)
  }

  addConjointPersonneDisposant(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, removeIds: boolean, value?: ConjointPersonneDisposant): void {
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      if (this.partiesPrenantes(typePartiePrenante).at(groupeHeritiersIndex).valid) {
        let conjointPersonneDisposantFormGroup: FormGroup = new FormGroup({
          personnePhysique: new FormGroup({
            nom: new FormControl(value ? value.personnePhysique?.nom : null, [Validators.required]),
            prenoms: new FormControl(value ? value.personnePhysique?.prenoms : null, [Validators.required]),
            telephone: new FormControl(value ? value.personnePhysique?.telephone : null, []),
            adresseDomicile: new FormControl(value ? value.personnePhysique?.adresseDomicile : null, []),
            adresseResidence: new FormControl(value ? value.personnePhysique?.adresseResidence : null, []),
            anneeNaissance: new FormControl(value ? value.personnePhysique?.anneeNaissance : null, []),
            dateNaissance: new FormControl(value ? value.personnePhysique?.dateNaissance : null, []),
            lieuNaissance: new FormControl(value ? value.personnePhysique?.lieuNaissance : null, []),
            nif: new FormControl(value ? value.personnePhysique?.nif : null, []),
            nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
            vivant: new FormControl(value ? value.personnePhysique?.vivant : 1, []),
            civiliteId: new FormControl(value ? value.personnePhysique?.civiliteId : null, []),
            nationaliteId: new FormControl(value ? value.personnePhysique?.nationaliteId : null, []),
            professionId: new FormControl(value ? value.personnePhysique?.professionId : null, []),
          }),
          personnesHeritieres: new FormArray([]),
        })

        if (!removeIds) {
          conjointPersonneDisposantFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
        }

        if (!this.formulaireEtatActif) {
          conjointPersonneDisposantFormGroup.disable()
        }

        this.conjointsPersonneDisposant(typePartiePrenante, groupeHeritiersIndex).push(conjointPersonneDisposantFormGroup)
      }
    }
  }

  removeConjointPersonneDisposant(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionConjointPersonneDisposantForm.get('index')?.setValue(index)
      this.suppressionConjointPersonneDisposantForm.get('groupeHeritiersIndex')?.setValue(groupeHeritiersIndex)
      this.suppressionConjointPersonneDisposantForm.get('id')?.setValue(this.conjointsPersonneDisposant(typePartiePrenante, groupeHeritiersIndex).at(index).get('id')?.value)

      this.openSuppressionConjointPersonneDisposantModal()
    }
    else {
      this.removeConjointPersonneDisposantAtIndex(typePartiePrenante, groupeHeritiersIndex, index)
    }
  }

  private removeConjointPersonneDisposantAtIndex(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, index: number): void {
    this.conjointsPersonneDisposant(typePartiePrenante, groupeHeritiersIndex).removeAt(index)
  }


  addPersonneHeritiere(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, removeIds: boolean, value?: PersonneHeritiere): void {
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      if (this.conjointsPersonneDisposant(typePartiePrenante, groupeHeritiersIndex).at(conjointPersonneDisposantIndex).valid) {
        let personneHeritiereFormGroup: FormGroup = new FormGroup({
          personnePhysique: new FormGroup({
            nom: new FormControl(value ? value.personnePhysique?.nom : null, [Validators.required]),
            prenoms: new FormControl(value ? value.personnePhysique?.prenoms : null, [Validators.required]),
            telephone: new FormControl(value ? value.personnePhysique?.telephone : null, []),
            adresseDomicile: new FormControl(value ? value.personnePhysique?.adresseDomicile : null, []),
            adresseResidence: new FormControl(value ? value.personnePhysique?.adresseResidence : null, []),
            anneeNaissance: new FormControl(value ? value.personnePhysique?.anneeNaissance : null, []),
            dateNaissance: new FormControl(value ? value.personnePhysique?.dateNaissance : null, []),
            lieuNaissance: new FormControl(value ? value.personnePhysique?.lieuNaissance : null, []),
            nif: new FormControl(value ? value.personnePhysique?.nif : null, []),
            nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
            vivant: new FormControl(value ? value.personnePhysique?.vivant : 1, []),
            civiliteId: new FormControl(value ? value.personnePhysique?.civiliteId : null, []),
            nationaliteId: new FormControl(value ? value.personnePhysique?.nationaliteId : null, []),
            professionId: new FormControl(value ? value.personnePhysique?.professionId : null, []),
            representants: new FormArray([]),
          })
        })

        if (!removeIds) {
          personneHeritiereFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
        }

        if (!this.formulaireEtatActif) {
          personneHeritiereFormGroup.disable()
        }

        this.personnesHeritieres(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex).push(personneHeritiereFormGroup)
      }
    }
  }

  removePersonneHeritiere(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionPersonneHeritiereForm.get('index')?.setValue(index)
      this.suppressionPersonneHeritiereForm.get('groupeHeritiersIndex')?.setValue(groupeHeritiersIndex)
      this.suppressionPersonneHeritiereForm.get('conjointPersonneDisposantIndex')?.setValue(conjointPersonneDisposantIndex)
      this.suppressionPersonneHeritiereForm.get('id')?.setValue(this.personnesHeritieres(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex).at(index).get('id')?.value)
      this.suppressionPersonneHeritiereForm.get('type')?.setValue(typePartiePrenante)

      this.openSuppressionPersonneHeritiereModal()
    }
    else {
      this.removePersonneHeritiereAtIndex(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex, index)
    }
  }

  private removePersonneHeritiereAtIndex(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, index: number): void {
    this.personnesHeritieres(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex).removeAt(index)
  }

  addRepresentantPersonneHeritiere(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique): void {
    console.log(this.representantsPersonneHeritiere(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).valid)
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      if (this.representantsPersonneHeritiere(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).valid) {
        let representantPersonneHeritiereFormGroup: FormGroup = new FormGroup({
          representant: new FormGroup({
            nom: new FormControl(value ? value.representant?.nom : null, [Validators.required]),
            prenoms: new FormControl(value ? value.representant?.prenoms : null, [Validators.required]),
            telephone: new FormControl(value ? value.representant?.telephone : null, []),
            adresseDomicile: new FormControl(value ? value.representant?.adresseDomicile : null, []),
            adresseResidence: new FormControl(value ? value.representant?.adresseResidence : null, []),
            anneeNaissance: new FormControl(value ? value.representant?.anneeNaissance : null, []),
            dateNaissance: new FormControl(value ? value.representant?.dateNaissance : null, []),
            lieuNaissance: new FormControl(value ? value.representant?.lieuNaissance : null, []),
            nif: new FormControl(value ? value.representant?.nif : null, []),
            nomEpoux: new FormControl(value ? value.representant?.nomEpoux : null, []),
            vivant: new FormControl(value ? value.representant?.vivant : 1, []),
            civiliteId: new FormControl(value ? value.representant?.civiliteId : null, []),
            nationaliteId: new FormControl(value ? value.representant?.nationaliteId : null, []),
            professionId: new FormControl(value ? value.representant?.professionId : null, []),
          })
        })

        if (!removeIds) {
          representantPersonneHeritiereFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
        }

        if (!this.formulaireEtatActif) {
          representantPersonneHeritiereFormGroup.disable()
        }

        this.representantsPersonneHeritiere(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).push(representantPersonneHeritiereFormGroup)
      }
    }
  }

  removeRepresentantPersonneHeritiere(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionRepresentantPersonneHeritiereForm.get('index')?.setValue(index)
      this.suppressionRepresentantPersonneHeritiereForm.get('groupeHeritiersIndex')?.setValue(groupeHeritiersIndex)
      this.suppressionRepresentantPersonneHeritiereForm.get('conjointPersonneDisposantIndex')?.setValue(conjointPersonneDisposantIndex)
      this.suppressionRepresentantPersonneHeritiereForm.get('personneHeritiereIndex')?.setValue(personneHeritiereIndex)
      this.suppressionRepresentantPersonneHeritiereForm.get('id')?.setValue(this.representantsPersonneHeritiere(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).at(index).get('id')?.value)
      this.suppressionRepresentantPersonneHeritiereForm.get('type')?.setValue(typePartiePrenante)

      this.openSuppressionRepresentantPersonneHeritiereModal()
    }
    else {
      this.removeRepresentantPersonneHeritiereAtIndex(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex, index)
    }
  }

  private removeRepresentantPersonneHeritiereAtIndex(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number, index: number): void {
    this.representantsPersonneHeritiere(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).removeAt(index)
  }

  // Modals
  openSuppressionPartiePrenanteModal(): void {
    this.showSuppressionPartiePrenanteModal = true
  }

  closeSuppressionPartiePrenanteModal(): void {
    this.suppressionPartiePrenanteForm.reset()
    this.showSuppressionPartiePrenanteModal = false
  }

  openSuppressionPersonneMembreModal(): void {
    this.showSuppressionPersonneMembreModal = true
  }

  closeSuppressionPersonneMembreModal(): void {
    this.suppressionPersonneMembreForm.reset()
    this.showSuppressionPersonneMembreModal = false
  }

  openSuppressionPersonneConjointeModal(): void {
    this.showSuppressionPersonneConjointeModal = true
  }

  closeSuppressionPersonneConjointeModal(): void {
    this.suppressionPersonneConjointeForm.reset()
    this.showSuppressionPersonneConjointeModal = false
  }

  openSuppressionConjointPersonneDisposantModal(): void {
    this.showSuppressionConjointPersonneDisposantModal = true
  }

  closeSuppressionConjointPersonneDisposantModal(): void {
    this.suppressionConjointPersonneDisposantForm.reset()
    this.showSuppressionConjointPersonneDisposantModal = false
  }

  openSuppressionPersonneHeritiereModal(): void {
    this.showSuppressionPersonneHeritiereModal = true
  }

  closeSuppressionPersonneHeritiereModal(): void {
    this.suppressionPersonneHeritiereForm.reset()
    this.showSuppressionPersonneHeritiereModal = false
  }

  openSuppressionRepresentantPersonnePhysiqueModal(): void {
    this.showSuppressionRepresentantPersonnePhysiqueModal = true
  }

  closeSuppressionRepresentantPersonnePhysiqueModal(): void {
    this.suppressionRepresentantPersonnePhysiqueForm.reset()
    this.showSuppressionRepresentantPersonnePhysiqueModal = false
  }

  openSuppressionRepresentantPersonneMoraleModal(): void {
    this.showSuppressionRepresentantPersonneMoraleModal = true
  }

  closeSuppressionRepresentantPersonneMoraleModal(): void {
    this.suppressionRepresentantPersonneMoraleForm.reset()
    this.showSuppressionRepresentantPersonneMoraleModal = false
  }

  openSuppressionRepresentantPersonneMembreModal(): void {
    this.showSuppressionRepresentantPersonneMembreModal = true
  }

  closeSuppressionRepresentantPersonneMembreModal(): void {
    this.suppressionRepresentantPersonneMembreForm.reset()
    this.showSuppressionRepresentantPersonneMembreModal = false
  }

  openSuppressionRepresentantPersonneConjointeModal(): void {
    this.showSuppressionRepresentantPersonneConjointeModal = true
  }

  closeSuppressionRepresentantPersonneConjointeModal(): void {
    this.suppressionRepresentantPersonneConjointeForm.reset()
    this.showSuppressionRepresentantPersonneConjointeModal = false
  }

  openSuppressionRepresentantPersonneHeritiereModal(): void {
    this.showSuppressionRepresentantPersonneHeritiereModal = true
  }

  closeSuppressionRepresentantPersonneHeritiereModal(): void {
    this.suppressionRepresentantPersonneHeritiereForm.reset()
    this.showSuppressionRepresentantPersonneHeritiereModal = false
  }
}
