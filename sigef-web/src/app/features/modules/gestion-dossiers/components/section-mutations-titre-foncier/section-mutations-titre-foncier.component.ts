import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Mutation } from '../../../../../data/modules/gestion-dossiers/models/Mutation';
import { ModeAcquisition } from '../../../../../data/modules/gestion-dossiers/models/ModeAcquisition';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { MutationService } from '../../../../../data/modules/gestion-dossiers/services/mutation.service';
import { ModeAcquisitionService } from '../../../../../data/modules/gestion-dossiers/services/mode-acquisition.service';
import { ContenanceUtils } from '../../../../../data/utils/ContenanceUtils';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';
import { CiviliteService } from '../../../../../data/modules/commun/services/civilite.service';
import { FormeJuridiqueService } from '../../../../../data/modules/commun/services/forme-juridique.service';
import { NationaliteService } from '../../../../../data/modules/commun/services/nationalite.service';
import { ProfessionService } from '../../../../../data/modules/commun/services/profession.service';
import { SecteurActiviteService } from '../../../../../data/modules/commun/services/secteur-activite.service';
import { TypeLienGroupeService } from '../../../../../data/modules/commun/services/type-lien-groupe.service';
import { TypePersonneMoraleService } from '../../../../../data/modules/commun/services/type-personne-morale.service';
import { TypeRelationLegaleService } from '../../../../../data/modules/commun/services/type-relation-legale.service';
import { PartiePrenante } from '../../../../../data/modules/gestion-dossiers/models/PartiePrenante';
import { PartiePrenanteUtils } from '../../../../../data/utils/PartiePrenanteUtils';
import { CategoriesPartiePrenante } from '../../../../../data/enums/CategoriesPartiePrenante';
import { Civilite } from '../../../../../data/modules/commun/models/Civilite';
import { FormeJuridique } from '../../../../../data/modules/commun/models/FormeJuridique';
import { Nationalite } from '../../../../../data/modules/commun/models/Nationalite';
import { Profession } from '../../../../../data/modules/commun/models/Profession';
import { SecteurActivite } from '../../../../../data/modules/commun/models/SecteurActivite';
import { TypeLienGroupe } from '../../../../../data/modules/commun/models/TypeLienGroupe';
import { TypePersonneMorale } from '../../../../../data/modules/commun/models/TypePersonneMorale';
import { TypeRelationLegale } from '../../../../../data/modules/commun/models/TypeRelationLegale';
import { ConjointPersonneDisposant } from '../../../../../data/modules/gestion-dossiers/models/ConjointPersonneDisposant';
import { PersonneConjointe } from '../../../../../data/modules/gestion-dossiers/models/PersonneConjointe';
import { PersonneHeritiere } from '../../../../../data/modules/gestion-dossiers/models/PersonneHeritiere';
import { PersonneMembre } from '../../../../../data/modules/gestion-dossiers/models/PersonneMembre';
import { RepresentantPersonneMorale } from '../../../../../data/modules/gestion-dossiers/models/RepresentantPersonneMorale';
import { RepresentantPersonnePhysique } from '../../../../../data/modules/gestion-dossiers/models/RepresentantPersonnePhysique';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-section-mutations-titre-foncier',
  templateUrl: './section-mutations-titre-foncier.component.html',
  styleUrl: './section-mutations-titre-foncier.component.scss'
})
export class SectionMutationsTitreFoncierComponent  implements OnChanges {

  @Input() titreFoncier?: TitreFoncier

  modesAcquisition: ModeAcquisition[] = []

  showNouvelleMutationModal: boolean = false
  showModificationMutationModal: boolean = false
  showSuppressionMutationModal: boolean = false

  showListeProprietairesMutationModal: boolean = false
  selectedListeProprietairesMutation?: Mutation

  listeMutations: PagingData<Mutation> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  filtresListeMutationsForm: FormGroup = new FormGroup({
    titreFoncierId: new FormControl(null, [Validators.required]),
    search: new FormControl(null, []),
    dateInscription: new FormControl(null, []),
    mode: new FormControl(null, []),
  })

  nouvelleMutationForm: FormGroup = new FormGroup({
    numeroBordereauAnalytique: new FormControl(null, [Validators.required]),
    dateInscription: new FormControl(null, [Validators.required]),
    modeAcquisitionId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    prixAcquisition: new FormControl(null, []),
    valeurVenaleOuEstimee: new FormControl(null, []),
    // proprietairesSuccessifs: new FormArray([])
  })

  modificationMutationForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    numeroBordereauAnalytique: new FormControl(null, [Validators.required]),
    dateInscription: new FormControl(null, [Validators.required]),
    modeAcquisitionId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    prixAcquisition: new FormControl(null, []),
    valeurVenaleOuEstimee: new FormControl(null, []),
    // proprietairesSuccessifs: new FormArray([])
  })

  suppressionMutationForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  proprietairesSuccessifsForm: FormGroup = new FormGroup({
    proprietairesSuccessifs: new FormArray([])
  })

  constructor(
    private notificationsHandlerService: NotificationsHandlerService,
    private modeAcquisitionService: ModeAcquisitionService,
    private mutationService: MutationService,
    // Parties prenantes
    private formeJuridiqueService: FormeJuridiqueService,
    private typePersonneMoraleService: TypePersonneMoraleService,
    private typeRelationLegaleService: TypeRelationLegaleService,
    private typeLienGroupeService: TypeLienGroupeService,
    private civiliteService: CiviliteService,
    private nationaliteService: NationaliteService,
    private professionService: ProfessionService,
    private secteurActiviteService: SecteurActiviteService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titreFoncier'].previousValue != changes['titreFoncier'].currentValue) {
      if(this.titreFoncier) {
      this.filtresListeMutationsForm.get('titreFoncierId')!.setValue(this.titreFoncier.id)
      this.getMutations()
      }
    }
  }

  getModesAcquisition(): void {
    this.modeAcquisitionService.getAllData()
      .subscribe({
        next: (value: ModeAcquisition[]) => {
          // console.log(value)
          this.modesAcquisition = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des modes d\'acquisition' })
        }
      })
  }

  getMutations(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    if (this.filtresListeMutationsForm.valid) {
      const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeMutationsForm.value)

      this.mutationService.getAll(event.page, event.paginationSize, filtres)
        .subscribe({
          next: (value: PagingData<Mutation>) => {
            console.log("Mutation: ", value)
            this.listeMutations = value
          },
          error: (err: HttpErrorResponse) => {
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des mutations' })
          }
        })
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des mutations' })
    }

  }

  filtrerListeMutations(): void {
    // console.log(this.filtresListeMutationsForm.value)
    this.getMutations({ page: this.listeMutations.currentPage, paginationSize: this.listeMutations.paginationSize! })
  }

  effacerFiltresListeMutations(): void {
    this.filtresListeMutationsForm.reset()

    this.filtrerListeMutations()
  }

  validerCreationMutation(): void {
    this.nouvelleMutationForm.markAllAsTouched()
    // console.log(this.nouvelleMutationForm.value)
    if (this.nouvelleMutationForm.valid && this.titreFoncier) {
      let mutation: Mutation = this.nouvelleMutationForm.value
      mutation.partiesPrenantes = this.getPartiesPrenantes(true, this.nouvelleMutationForm)
      mutation.titreFoncierId = this.titreFoncier.id

      this.mutationService.create(mutation)
        .subscribe({
          next: (value: Mutation) => {
            this.getMutations()
            this.closeNouvelleMutationModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette mutation a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerCreationMutation(): void {
    this.closeNouvelleMutationModal()
  }

  validerModificationMutation(): void {
    console.log(this.modificationMutationForm.value)
    this.modificationMutationForm.markAllAsTouched()

    if (this.modificationMutationForm.valid) {
      let mutation: Mutation = this.modificationMutationForm.value
      mutation.partiesPrenantes = this.getPartiesPrenantes(true, this.modificationMutationForm)

      this.mutationService.update(mutation)
        .subscribe({
          next: (value: Mutation) => {
            this.getMutations()
            this.closeModificationMutationModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette mutation a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerModificationMutation(): void {
    this.closeModificationMutationModal()
  }

  validerSuppressionMutation(): void {
    console.log(this.suppressionMutationForm.value)
    this.suppressionMutationForm.markAllAsTouched()

    if (this.suppressionMutationForm.valid) {
      let mutationId: Mutation['id'] = this.suppressionMutationForm.get('id')!.value

      this.mutationService.delete(mutationId!)
        .subscribe({
          next: (value: Mutation) => {
            this.getMutations()
            this.closeSuppressionMutationModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette mutation a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la région' })
          },
        })
    }
  }

  annulerSuppressionMutation(): void {
    this.closeSuppressionMutationModal()
  }

  // Modals
  openNouvelleMutationModal(): void {
    this.showNouvelleMutationModal = true
  }

  closeNouvelleMutationModal(): void {
    this.showNouvelleMutationModal = false
    this.proprietairesSuccessifs().clear()
    this.nouvelleMutationForm.reset()
  }

  openListeProprietairesMutationModal(index: number): void {
    const selectedMutation: Mutation | undefined = this.listeMutations.data[index]

    if (selectedMutation != undefined) {
      this.selectedListeProprietairesMutation = selectedMutation
      this.showListeProprietairesMutationModal = true
    }
  }

  closeListeProprietairesMutationModal(): void {
    this.selectedListeProprietairesMutation = undefined
    this.showListeProprietairesMutationModal = false
  }

  openModificationMutationModal(index: number): void {
    const selectedMutation: Mutation | undefined = this.listeMutations.data[index]

    if (selectedMutation != undefined) {
      this.getModesAcquisition()
      this.modificationMutationForm.patchValue(selectedMutation)
      // // Initialiser les parties prenantes
      // if (selectedMutation.partiesPrenantes && selectedMutation.partiesPrenantes?.length > 0) {
      //   selectedMutation.partiesPrenantes?.forEach((partiePrenante: PartiePrenante) => {
      //     this.addPartiePrenante(partiePrenante.categorie!, false, partiePrenante)
      //   })
      // }
      this.showModificationMutationModal = true
    }
  }

  closeModificationMutationModal(): void {
    this.showModificationMutationModal = false
    this.proprietairesSuccessifs().clear()
    this.modificationMutationForm.reset()
  }

  openSuppressionMutationModal(index: number): void {
    const selectedMutation: Mutation | undefined = this.listeMutations.data[index]

    if (selectedMutation != undefined) {
      this.suppressionMutationForm.get('id')?.setValue(selectedMutation.id)

      this.showSuppressionMutationModal = true
    }
  }

  closeSuppressionMutationModal(): void {
    this.showSuppressionMutationModal = false
    this.suppressionMutationForm.reset()
  }

  // Utils
  getPartiesPrenantes(removeIds: boolean = true, mutationFormGroup: FormGroup): PartiePrenante[] {
    return PartiePrenanteUtils.getInstance().getPartiesPrenantesFromFormGroup(mutationFormGroup, removeIds)
  }

  getValeurContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): string {
    return ContenanceUtils.getInstance().getValeurContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

  getSuperficieContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): number {
    return ContenanceUtils.getInstance().getSuperficieContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

  // Parties Prenantes
  proprietairesSuccessifs(): FormArray {
    return this.proprietairesSuccessifsForm.get('proprietairesSuccessifs') as FormArray
  }

  representantsPersonnePhysique(personnePhysiqueIndex: number): FormArray {
    return this.proprietairesSuccessifs().at(personnePhysiqueIndex).get('representants') as FormArray
  }

  representantsPersonneMorale(personneMoraleIndex: number): FormArray {
    return this.proprietairesSuccessifs().at(personneMoraleIndex).get('representants') as FormArray
  }

  personnesMembres(groupePersonnePhysiqueIndex: number): FormArray {
    return this.proprietairesSuccessifs().at(groupePersonnePhysiqueIndex).get('personnesMembres') as FormArray
  }

  representantsPersonneMembre(groupePersonnePhysiqueIndex: number, personneMembreIndex: number): FormArray {
    return this.personnesMembres(groupePersonnePhysiqueIndex).at(personneMembreIndex).get('personnePhysique')!.get('representants') as FormArray
  }

  personnesConjointes(groupeConjointsIndex: number): FormArray {
    return this.proprietairesSuccessifs().at(groupeConjointsIndex).get('personnesConjointes') as FormArray
  }

  representantsPersonneConjointe(groupeConjointsIndex: number, personneConjointeIndex: number): FormArray {
    return this.personnesConjointes(groupeConjointsIndex).at(personneConjointeIndex).get('personnePhysique')!.get('representants') as FormArray
  }

  conjointsPersonneDisposant(groupeHeritiersIndex: number): FormArray {
    return this.proprietairesSuccessifs().at(groupeHeritiersIndex).get('conjointsPersonneDisposant') as FormArray
  }

  personnesHeritieres(groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number): FormArray {
    return this.conjointsPersonneDisposant(groupeHeritiersIndex).at(conjointPersonneDisposantIndex).get('personnesHeritieres') as FormArray
  }

  representantsPersonneHeritiere(groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number): FormArray {
    return this.personnesHeritieres(groupeHeritiersIndex, conjointPersonneDisposantIndex).at(personneHeritiereIndex).get('personnePhysique')!.get('representants') as FormArray
  }


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

  getFormesJuridiques(): void {
    this.formeJuridiqueService.getAllData()
      .subscribe({
        next: (value: FormeJuridique[]) => {
          this.formesJuridiques = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des formes juridiques' })
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

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des types de personne morale' })
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

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des types de relation légale' })
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

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des types de lien de groupe' })
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

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des civilités' })
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

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des nationalités' })
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

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des professions' })
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

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des secteurs d\'activité' })
        }
      })
  }

  addPartiePrenante(categorie: CategoriesPartiePrenante, removeIds: boolean, value?: PartiePrenante): void {
    this.proprietairesSuccessifs().markAllAsTouched()

    console.log(categorie)

    if (this.proprietairesSuccessifs().valid) {
      const proprietairesSuccessifsNextIndex: number = this.proprietairesSuccessifs().controls.length
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
            nomJeuneFille: new FormControl(value ? value.personnePhysique?.nomJeuneFille : null, []),
            vivant: new FormControl(value ? value.personnePhysique?.vivant : true, []),
            civiliteId: new FormControl(value ? value.personnePhysique?.civiliteId : null, []),
            nationaliteId: new FormControl(value ? value.personnePhysique?.nationaliteId : null, []),
            professionId: new FormControl(value ? value.personnePhysique?.professionId : null, []),
            representants: new FormArray([]),
          })
          // Initialiser les représentants
          if (value?.personnePhysique?.representants && value?.personnePhysique?.representants?.length > 0) {
            value?.personnePhysique?.representants.forEach((representant: RepresentantPersonnePhysique) => {
              this.addRepresentantPersonnePhysique(proprietairesSuccessifsNextIndex, removeIds, representant, partiePrenanteFormGroup)
            })
          }

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
          // Initialiser les représentants
          if (value?.personneMorale?.representants && value?.personneMorale?.representants?.length > 0) {
            value?.personneMorale?.representants.forEach((representant: RepresentantPersonneMorale) => {
              this.addRepresentantPersonneMorale(proprietairesSuccessifsNextIndex, removeIds, representant, partiePrenanteFormGroup)
            })
          }

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
                nomJeuneFille: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.nomJeuneFille : null, []),
                vivant: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.vivant : true, []),
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
          // Initialiser les membres
          if (value?.groupePersonnePhysique?.personnesMembres && value?.groupePersonnePhysique?.personnesMembres?.length > 0) {
            value?.groupePersonnePhysique?.personnesMembres.forEach((personneMembre: PersonneMembre) => {
              this.addPersonneMembre(proprietairesSuccessifsNextIndex, removeIds, personneMembre, partiePrenanteFormGroup)
            })
          }

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
          // Initialiser les conjoints
          if (value?.groupeConjoints?.personnesConjointes && value?.groupeConjoints?.personnesConjointes?.length > 0) {
            value?.groupeConjoints?.personnesConjointes.forEach((personneConjointe: PersonneConjointe) => {
              this.addPersonneConjointe(proprietairesSuccessifsNextIndex, removeIds, personneConjointe, partiePrenanteFormGroup)
            })
          }

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
                nom: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.nom : null, [Validators.required]),
                prenoms: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.prenoms : null, [Validators.required]),
                telephone: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.telephone : null, []),
                adresseDomicile: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.adresseDomicile : null, []),
                adresseResidence: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.adresseResidence : null, []),
                anneeNaissance: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.anneeNaissance : null, []),
                dateNaissance: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.dateNaissance : null, []),
                lieuNaissance: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.lieuNaissance : null, []),
                nif: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.nif : null, []),
                nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
                nomJeuneFille: new FormControl(value ? value.personnePhysique?.nomJeuneFille : null, []),
                vivant: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.vivant : false, []),
                civiliteId: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.civiliteId : null, []),
                nationaliteId: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.nationaliteId : null, []),
                professionId: new FormControl(value ? value.groupeHeritiers?.personneDisposant?.personnePhysique?.professionId : null, []),
              })
            }),
            conjointsPersonneDisposant: new FormArray([]),
          })

          // Initialiser les unions
          if (value?.groupeHeritiers?.conjointsPersonneDisposant && value?.groupeHeritiers?.conjointsPersonneDisposant?.length > 0) {
            value?.groupeHeritiers?.conjointsPersonneDisposant.forEach((conjointPersonneDisposant: ConjointPersonneDisposant) => {
              this.addConjointPersonneDisposant(proprietairesSuccessifsNextIndex, removeIds, conjointPersonneDisposant, partiePrenanteFormGroup)
            })
          }

          // En cas de modification d'un existant
          if (!removeIds) {
            partiePrenanteFormGroup.addControl('partiePrenanteId', new FormControl(value ? value.id : null, []))
            partiePrenanteFormGroup.addControl('id', new FormControl(value ? value.groupeHeritiers?.id : null, []))
          }
          break;
      }

      partiePrenanteFormGroup.addControl('type', new FormControl(TypesPartiePrenante.PROPRIETAIRE_SUCCESSIF, []))

      this.proprietairesSuccessifs().push(partiePrenanteFormGroup)

    }
  }

  removePartiePrenante(index: number): void {
    this.proprietairesSuccessifs().removeAt(index)
  }

  addPersonneMembre(groupePersonnePhysiqueIndex: number, removeIds: boolean, value?: PersonneMembre, groupePersonnePhysiqueFormGroup?: FormGroup): void {
    this.proprietairesSuccessifs().markAllAsTouched()

    if (this.proprietairesSuccessifs().valid) {
      // if (this.proprietairesSuccessifs().at(groupePersonnePhysiqueIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.personnePhysique?.nomJeuneFille : null, []),
          vivant: new FormControl(value ? value.personnePhysique?.vivant : true, []),
          civiliteId: new FormControl(value ? value.personnePhysique?.civiliteId : null, []),
          nationaliteId: new FormControl(value ? value.personnePhysique?.nationaliteId : null, []),
          professionId: new FormControl(value ? value.personnePhysique?.professionId : null, []),
          representants: new FormArray([]),
        })
      })

      if (!removeIds) {
        personneMembreFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!groupePersonnePhysiqueFormGroup) {
        this.personnesMembres(groupePersonnePhysiqueIndex).push(personneMembreFormGroup)
      }
      else {
        (groupePersonnePhysiqueFormGroup.get('personnesMembres') as FormArray).push(personneMembreFormGroup)

        // Initialiser les représentants
        if (value?.personnePhysique?.representants && value?.personnePhysique?.representants?.length > 0) {
          value?.personnePhysique?.representants.forEach((representant: RepresentantPersonnePhysique) => {
            this.addRepresentantPersonneMembre(groupePersonnePhysiqueIndex, NaN, removeIds, representant, personneMembreFormGroup)
          })
        }
      }
      // }
    }
  }

  removePersonneMembre(groupePersonnePhysiqueIndex: number, index: number): void {
    this.personnesMembres(groupePersonnePhysiqueIndex).removeAt(index)
  }

  addRepresentantPersonnePhysique(personnePhysiqueIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique, personnePhysiqueFormGroup?: FormGroup): void {
    // console.log(this.representantsPersonnePhysique(personnePhysiqueIndex).valid)
    this.proprietairesSuccessifs().markAllAsTouched()

    if (this.proprietairesSuccessifs().valid) {
      // if (this.representantsPersonnePhysique(personnePhysiqueIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.representant?.nomJeuneFille : null, []),
          vivant: new FormControl(value ? value.representant?.vivant : true, []),
          civiliteId: new FormControl(value ? value.representant?.civiliteId : null, []),
          nationaliteId: new FormControl(value ? value.representant?.nationaliteId : null, []),
          professionId: new FormControl(value ? value.representant?.professionId : null, []),
        })
      })

      if (!removeIds) {
        representantPersonnePhysiqueFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!personnePhysiqueFormGroup) {
        this.representantsPersonnePhysique(personnePhysiqueIndex).push(representantPersonnePhysiqueFormGroup)
      }
      else {
        (personnePhysiqueFormGroup.get('representants') as FormArray).push(representantPersonnePhysiqueFormGroup)
      }
      // }
    }
  }

  removeRepresentantPersonnePhysique(personnePhysiqueIndex: number, index: number): void {
    this.representantsPersonnePhysique(personnePhysiqueIndex).removeAt(index)
  }

  addRepresentantPersonneMorale(personneMoraleIndex: number, removeIds: boolean, value?: RepresentantPersonneMorale, personneMoraleFormGroup?: FormGroup): void {
    this.proprietairesSuccessifs().markAllAsTouched()

    if (this.proprietairesSuccessifs().valid) {
      // console.log(this.representantsPersonneMorale(personneMoraleIndex).valid)
      // if (this.representantsPersonneMorale(personneMoraleIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.representant?.nomJeuneFille : null, []),
          vivant: new FormControl(value ? value.representant?.vivant : true, []),
          civiliteId: new FormControl(value ? value.representant?.civiliteId : null, []),
          nationaliteId: new FormControl(value ? value.representant?.nationaliteId : null, []),
          professionId: new FormControl(value ? value.representant?.professionId : null, []),
        })
      })

      if (!removeIds) {
        representantPersonneMoraleFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!personneMoraleFormGroup) {
        this.representantsPersonneMorale(personneMoraleIndex).push(representantPersonneMoraleFormGroup)
      }
      else {
        (personneMoraleFormGroup.get('representants') as FormArray).push(representantPersonneMoraleFormGroup)
      }
      // }
    }
  }

  removeRepresentantPersonneMorale(personneMoraleIndex: number, index: number): void {
    this.representantsPersonneMorale(personneMoraleIndex).removeAt(index)
  }

  addPersonneConjointe(groupeConjointsIndex: number, removeIds: boolean, value?: PersonneConjointe, groupeConjointsFormGroup?: FormGroup): void {
    this.proprietairesSuccessifs().markAllAsTouched()

    if (this.proprietairesSuccessifs().valid) {
      // if (this.proprietairesSuccessifs().at(groupeConjointsIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.personnePhysique?.nomJeuneFille : null, []),
          vivant: new FormControl(value ? value.personnePhysique?.vivant : true, []),
          civiliteId: new FormControl(value ? value.personnePhysique?.civiliteId : null, []),
          nationaliteId: new FormControl(value ? value.personnePhysique?.nationaliteId : null, []),
          professionId: new FormControl(value ? value.personnePhysique?.professionId : null, []),
          representants: new FormArray([]),
        })
      })

      if (!removeIds) {
        personneConjointeFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!groupeConjointsFormGroup) {
        this.personnesConjointes(groupeConjointsIndex).push(personneConjointeFormGroup)
      }
      else {
        (groupeConjointsFormGroup.get('personnesConjointes') as FormArray).push(personneConjointeFormGroup)

        // Initialiser les représentants
        if (value?.personnePhysique?.representants && value?.personnePhysique?.representants?.length > 0) {
          value?.personnePhysique?.representants.forEach((representant: RepresentantPersonnePhysique) => {
            this.addRepresentantPersonneConjointe(groupeConjointsIndex, NaN, removeIds, representant, personneConjointeFormGroup)
          })
        }
      }
      // }
    }
  }

  removePersonneConjointe(groupeConjointsIndex: number, index: number): void {
    this.personnesConjointes(groupeConjointsIndex).removeAt(index)
  }

  addRepresentantPersonneMembre(groupePersonnePhysiqueIndex: number, personneMembreIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique, personneMembreFormGroup?: FormGroup): void {
    // console.log(this.representantsPersonneMembre(groupePersonnePhysiqueIndex, personneMembreIndex).valid)
    this.proprietairesSuccessifs().markAllAsTouched()

    if (this.proprietairesSuccessifs().valid) {
      // if (this.representantsPersonneMembre(groupePersonnePhysiqueIndex, personneMembreIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.representant?.nomJeuneFille : null, []),
          vivant: new FormControl(value ? value.representant?.vivant : true, []),
          civiliteId: new FormControl(value ? value.representant?.civiliteId : null, []),
          nationaliteId: new FormControl(value ? value.representant?.nationaliteId : null, []),
          professionId: new FormControl(value ? value.representant?.professionId : null, []),
        })
      })

      if (!removeIds) {
        representantPersonneMembreFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!personneMembreFormGroup) {
        this.representantsPersonneMembre(groupePersonnePhysiqueIndex, personneMembreIndex).push(representantPersonneMembreFormGroup)
      }
      else {
        (personneMembreFormGroup.get('personnePhysique')!.get('representants') as FormArray).push(representantPersonneMembreFormGroup)
      }
      // }
    }
  }

  removeRepresentantPersonneMembre(groupePersonnePhysiqueIndex: number, personneMembreIndex: number, index: number): void {
    this.representantsPersonneMembre(groupePersonnePhysiqueIndex, personneMembreIndex).removeAt(index)
  }

  addRepresentantPersonneConjointe(groupeConjointsIndex: number, personneConjointeIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique, personneConjointeFormGroup?: FormGroup): void {
    // console.log(this.representantsPersonneConjointe(groupeConjointsIndex, personneConjointeIndex).valid)
    this.proprietairesSuccessifs().markAllAsTouched()

    if (this.proprietairesSuccessifs().valid) {
      // if (this.representantsPersonneConjointe(groupeConjointsIndex, personneConjointeIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.representant?.nomJeuneFille : null, []),
          vivant: new FormControl(value ? value.representant?.vivant : true, []),
          civiliteId: new FormControl(value ? value.representant?.civiliteId : null, []),
          nationaliteId: new FormControl(value ? value.representant?.nationaliteId : null, []),
          professionId: new FormControl(value ? value.representant?.professionId : null, []),
        })
      })

      if (!removeIds) {
        representantPersonneConjointeFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!personneConjointeFormGroup) {
        this.representantsPersonneConjointe(groupeConjointsIndex, personneConjointeIndex).push(representantPersonneConjointeFormGroup)
      }
      else {
        (personneConjointeFormGroup.get('personnePhysique')!.get('representants') as FormArray).push(representantPersonneConjointeFormGroup)
      }
      // }
    }
  }

  removeRepresentantPersonneConjointe(groupeConjointsIndex: number, personneConjointeIndex: number, index: number): void {
    this.representantsPersonneConjointe(groupeConjointsIndex, personneConjointeIndex).removeAt(index)
  }

  addConjointPersonneDisposant(groupeHeritiersIndex: number, removeIds: boolean, value?: ConjointPersonneDisposant, groupeHeritiersFormGroup?: FormGroup): void {
    this.proprietairesSuccessifs().markAllAsTouched()

    if (this.proprietairesSuccessifs().valid) {
      // if (this.proprietairesSuccessifs().at(groupeHeritiersIndex).valid) {
      let conjointPersonneDisposantFormGroup: FormGroup = new FormGroup({
        personnePhysique: new FormGroup({
          nom: new FormControl(value ? value.personnePhysique?.nom : null, []),
          prenoms: new FormControl(value ? value.personnePhysique?.prenoms : null, []),
          telephone: new FormControl(value ? value.personnePhysique?.telephone : null, []),
          adresseDomicile: new FormControl(value ? value.personnePhysique?.adresseDomicile : null, []),
          adresseResidence: new FormControl(value ? value.personnePhysique?.adresseResidence : null, []),
          anneeNaissance: new FormControl(value ? value.personnePhysique?.anneeNaissance : null, []),
          dateNaissance: new FormControl(value ? value.personnePhysique?.dateNaissance : null, []),
          lieuNaissance: new FormControl(value ? value.personnePhysique?.lieuNaissance : null, []),
          nif: new FormControl(value ? value.personnePhysique?.nif : null, []),
          nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
          nomJeuneFille: new FormControl(value ? value.personnePhysique?.nomJeuneFille : null, []),
          vivant: new FormControl(value ? value.personnePhysique?.vivant : true, []),
          civiliteId: new FormControl(value ? value.personnePhysique?.civiliteId : null, []),
          nationaliteId: new FormControl(value ? value.personnePhysique?.nationaliteId : null, []),
          professionId: new FormControl(value ? value.personnePhysique?.professionId : null, []),
        }),
        personnesHeritieres: new FormArray([]),
      })

      if (!removeIds) {
        conjointPersonneDisposantFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!groupeHeritiersFormGroup) {
        this.conjointsPersonneDisposant(groupeHeritiersIndex).push(conjointPersonneDisposantFormGroup)
      }
      else {
        (groupeHeritiersFormGroup.get('conjointsPersonneDisposant') as FormArray).push(conjointPersonneDisposantFormGroup)

        // Initialiser les héritiers
        if (value?.personnesHeritieres && value?.personnesHeritieres?.length > 0) {
          value?.personnesHeritieres.forEach((personneHeritiere: PersonneHeritiere) => {
            this.addPersonneHeritiere(groupeHeritiersIndex, NaN, removeIds, personneHeritiere, conjointPersonneDisposantFormGroup)
          })
        }
      }
      // }
    }
  }

  removeConjointPersonneDisposant(groupeHeritiersIndex: number, index: number): void {
    this.conjointsPersonneDisposant(groupeHeritiersIndex).removeAt(index)
  }


  addPersonneHeritiere(groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, removeIds: boolean, value?: PersonneHeritiere, conjointPersonneDisposantFormGroup?: FormGroup): void {
    this.proprietairesSuccessifs().markAllAsTouched()

    if (this.proprietairesSuccessifs().valid) {
      // if (this.conjointsPersonneDisposant(groupeHeritiersIndex).at(conjointPersonneDisposantIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.personnePhysique?.nomJeuneFille : null, []),
          vivant: new FormControl(value ? value.personnePhysique?.vivant : true, []),
          civiliteId: new FormControl(value ? value.personnePhysique?.civiliteId : null, []),
          nationaliteId: new FormControl(value ? value.personnePhysique?.nationaliteId : null, []),
          professionId: new FormControl(value ? value.personnePhysique?.professionId : null, []),
          representants: new FormArray([]),
        })
      })

      if (!removeIds) {
        personneHeritiereFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!conjointPersonneDisposantFormGroup) {
        this.personnesHeritieres(groupeHeritiersIndex, conjointPersonneDisposantIndex).push(personneHeritiereFormGroup)
      }
      else {
        (conjointPersonneDisposantFormGroup.get('personnesHeritieres') as FormArray).push(personneHeritiereFormGroup)

        // Initialiser les représentants
        if (value?.personnePhysique?.representants && value?.personnePhysique?.representants?.length > 0) {
          value?.personnePhysique?.representants.forEach((representant: RepresentantPersonnePhysique) => {
            this.addRepresentantPersonneHeritiere(groupeHeritiersIndex, conjointPersonneDisposantIndex, NaN, removeIds, representant, personneHeritiereFormGroup)
          })
        }
      }
      // }
    }
  }

  removePersonneHeritiere(groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, index: number): void {
    this.personnesHeritieres(groupeHeritiersIndex, conjointPersonneDisposantIndex).removeAt(index)
  }

  addRepresentantPersonneHeritiere(groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique, personneHeritiereFormGroup?: FormGroup): void {
    // console.log(this.representantsPersonneHeritiere(groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).valid)
    this.proprietairesSuccessifs().markAllAsTouched()

    if (this.proprietairesSuccessifs().valid) {
      // if (this.representantsPersonneHeritiere(groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.representant?.nomJeuneFille : null, []),
          vivant: new FormControl(value ? value.representant?.vivant : true, []),
          civiliteId: new FormControl(value ? value.representant?.civiliteId : null, []),
          nationaliteId: new FormControl(value ? value.representant?.nationaliteId : null, []),
          professionId: new FormControl(value ? value.representant?.professionId : null, []),
        })
      })

      if (!removeIds) {
        representantPersonneHeritiereFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!personneHeritiereFormGroup) {
        this.representantsPersonneHeritiere(groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).push(representantPersonneHeritiereFormGroup)
      }
      else {
        (personneHeritiereFormGroup.get('personnePhysique')!.get('representants') as FormArray).push(representantPersonneHeritiereFormGroup)
      }
      // }
    }
  }

  removeRepresentantPersonneHeritiere(groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number, index: number): void {
    this.representantsPersonneHeritiere(groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).removeAt(index)
  }

}
