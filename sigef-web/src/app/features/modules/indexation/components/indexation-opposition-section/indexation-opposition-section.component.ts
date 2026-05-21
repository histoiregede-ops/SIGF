import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { EtatsProgressionIndexation } from '../../../../../data/enums/EtatsProgressionIndexation';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';
import { CategoriesPartiePrenante } from '../../../../../data/enums/CategoriesPartiePrenante';
import { TypesTacheIndexation } from '../../../../../data/enums/TypesTacheIndexation';
import { FormeJuridique } from '../../../../../data/modules/commun/models/FormeJuridique';
import { QualiteDocument } from '../../../../../data/modules/commun/models/QualiteDocument';
import { TypePersonneMorale } from '../../../../../data/modules/commun/models/TypePersonneMorale';
import { TypeRegistre } from '../../../../../data/modules/commun/models/TypeRegistre';
import { TypeRelationLegale } from '../../../../../data/modules/commun/models/TypeRelationLegale';
import { FormeJuridiqueService } from '../../../../../data/modules/commun/services/forme-juridique.service';
import { TypePersonneMoraleService } from '../../../../../data/modules/commun/services/type-personne-morale.service';
import { TypeRelationLegaleService } from '../../../../../data/modules/commun/services/type-relation-legale.service';
import { Opposition } from '../../../../../data/modules/gestion-dossiers/models/Opposition';
import { PartiePrenante } from '../../../../../data/modules/gestion-dossiers/models/PartiePrenante';
import { OppositionService } from '../../../../../data/modules/gestion-dossiers/services/opposition.service';
import { PartiePrenanteService } from '../../../../../data/modules/gestion-dossiers/services/partie-prenante.service';
import { DonneeIndexation } from '../../../../../data/modules/indexation/models/DonneeIndexation';
import { ProgressionTacheIndexation } from '../../../../../data/modules/indexation/models/ProgressionTacheIndexation';
import { TacheIndexation } from '../../../../../data/modules/indexation/models/TacheIndexation';
import { ProgressionTacheIndexationService } from '../../../../../data/modules/indexation/services/progression-tache-indexation.service';
import { PartiePrenanteUtils } from '../../../../../data/utils/PartiePrenanteUtils';
import { OppositionRequisitionService } from '../../../../../data/modules/gestion-dossiers/services/opposition-requisition.service';
import { OppositionRequisition } from '../../../../../data/modules/gestion-dossiers/models/OppositionRequisition';
import { StatutsOpposition } from '../../../../../data/enums/StatutsOpposition';
import { Periode } from '../../../../../data/modules/commun/models/Periode';
import { Region } from '../../../../../data/modules/commun/models/Region';
import { PeriodeService } from '../../../../../data/modules/commun/services/periode.service';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { CiviliteService } from '../../../../../data/modules/commun/services/civilite.service';
import { NationaliteService } from '../../../../../data/modules/commun/services/nationalite.service';
import { ProfessionService } from '../../../../../data/modules/commun/services/profession.service';
import { SecteurActiviteService } from '../../../../../data/modules/commun/services/secteur-activite.service';
import { TypeLienGroupeService } from '../../../../../data/modules/commun/services/type-lien-groupe.service';
import { ConjointPersonneDisposantService } from '../../../../../data/modules/gestion-dossiers/services/conjoint-personne-disposant.service';
import { PersonneConjointeService } from '../../../../../data/modules/gestion-dossiers/services/personne-conjointe.service';
import { PersonneHeritiereService } from '../../../../../data/modules/gestion-dossiers/services/personne-heritiere.service';
import { PersonneMembreService } from '../../../../../data/modules/gestion-dossiers/services/personne-membre.service';
import { RepresentantPersonneMoraleService } from '../../../../../data/modules/gestion-dossiers/services/representant-personne-morale.service';
import { RepresentantPersonnePhysiqueService } from '../../../../../data/modules/gestion-dossiers/services/representant-personne-physique.service';
import { Civilite } from '../../../../../data/modules/commun/models/Civilite';
import { Nationalite } from '../../../../../data/modules/commun/models/Nationalite';
import { Profession } from '../../../../../data/modules/commun/models/Profession';
import { SecteurActivite } from '../../../../../data/modules/commun/models/SecteurActivite';
import { TypeLienGroupe } from '../../../../../data/modules/commun/models/TypeLienGroupe';
import { ConjointPersonneDisposant } from '../../../../../data/modules/gestion-dossiers/models/ConjointPersonneDisposant';
import { PersonneConjointe } from '../../../../../data/modules/gestion-dossiers/models/PersonneConjointe';
import { PersonneHeritiere } from '../../../../../data/modules/gestion-dossiers/models/PersonneHeritiere';
import { PersonneMembre } from '../../../../../data/modules/gestion-dossiers/models/PersonneMembre';
import { RepresentantPersonneMorale } from '../../../../../data/modules/gestion-dossiers/models/RepresentantPersonneMorale';
import { RepresentantPersonnePhysique } from '../../../../../data/modules/gestion-dossiers/models/RepresentantPersonnePhysique';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indexation-opposition-section',
  templateUrl: './indexation-opposition-section.component.html',
  styleUrl: './indexation-opposition-section.component.scss'
})
export class IndexationOppositionSectionComponent {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  @Input() formulaireEtatActif: boolean = false
  @Input() tacheIndexation!: TacheIndexation
  @Input() pageIndexation!: number
  @Output() pageIndexationChange: EventEmitter<number> = new EventEmitter()
  @Input() progressionTacheIndexation?: ProgressionTacheIndexation

  @Input() qualitesDocument: QualiteDocument[] = []
  @Input() typeRegistre?: TypeRegistre
  @Input() typeTacheIndexation!: TypesTacheIndexation

  showSuppressionOppositionRequisitionModal: boolean = false
  suppressionOppositionRequisitionForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
  })

  metadonneesForm: FormGroup = new FormGroup({
    qualiteDocumentId: new FormControl(null, [Validators.required]),
    typeRegistreId: new FormControl(null, [Validators.required]),
    regionId: new FormControl(null, [Validators.required]),
    periodeId: new FormControl(null, [Validators.required]),
    volumeRegistre: new FormControl(null, []),
    folioRegistre: new FormControl(null, []),
    commentaire: new FormControl(null, []),
  })

  motifForm: FormGroup = new FormGroup({
    motif: new FormControl(null, [Validators.required]),
  })

  nouvelleOppositionForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    statut: new FormControl(StatutsOpposition.RECEVABLE, [Validators.required]),
    informationsStatut: new FormControl(null, []),
    description: new FormControl(null, []),
    numeroOrdre: new FormControl(null, []),
    dateOpposition: new FormControl(null, [Validators.required]),
    dateMainLevee: new FormControl(null, []),
    requerants: new FormArray([]),
    intervenants: new FormArray([]),
    oppositionsRequisitions: new FormArray([]),
  })

  get requerants() {
    return this.partiesPrenantes(TypesPartiePrenante.REQUERANT)
  }

  get intervenants() {
    return this.partiesPrenantes(TypesPartiePrenante.INTERVENANT)
  }

  get oppositionsRequisitions() {
    return this.nouvelleOppositionForm.controls['oppositionsRequisitions'] as FormArray
  }

  periodes: Periode[] = []
  _regionsMetadonneesForm: Region[] = []
  regionsMetadonneesForm: Region[] = []

  status = [
    { id: StatutsOpposition.RECEVABLE, libelle: 'Recevable' },
    { id: StatutsOpposition.REJETEE, libelle: 'Rejetée' },
    { id: StatutsOpposition.LEVEE, libelle: 'Levée' },
  ]

  onStatutChange(): void {
    if (this.nouvelleOppositionForm.get('statut')!.value != StatutsOpposition.RECEVABLE) {
      this.nouvelleOppositionForm.controls['informationsStatut'].setValidators([Validators.required])
      this.nouvelleOppositionForm.controls['informationsStatut'].updateValueAndValidity()
    }
    else {
      this.nouvelleOppositionForm.controls['informationsStatut'].setValidators([])
      this.nouvelleOppositionForm.controls['informationsStatut'].updateValueAndValidity()
    }
  }

  readonly typesTacheIndexation = TypesTacheIndexation
  readonly etatsProgressionIndexation = EtatsProgressionIndexation
  readonly statutsOpposition = StatutsOpposition

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private periodeService: PeriodeService,
    private regionService: RegionService,
    private progressionTacheIndexationService: ProgressionTacheIndexationService,
    private oppositionService: OppositionService,
    private oppositionRequisitionService: OppositionRequisitionService,
    // Parties prenantes
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
    // // Écouter les changements de valeurs du formulaire et émettre un événement
    // this.nouvelleOppositionForm.valueChanges.subscribe(value => {
    //   // console.log("Modifié: ", value == this.progressionTacheIndexation?.donneeIndexation?.opposition)
    // });
  }

  ngOnInit(): void {
    this.getPeriodes()
    this.getRegionsMetadonneesForm()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formulaireEtatActif']) {
      if (this.formulaireEtatActif) {
        this.metadonneesForm.enable(); // Désactiver le formulaire
        this.nouvelleOppositionForm.enable(); // Désactiver le formulaire
      } else {
        this.metadonneesForm.disable(); // Réactiver le formulaire
        this.nouvelleOppositionForm.disable(); // Réactiver le formulaire
      }
    }

    if (changes['pageIndexation']) {
      console.log(this.progressionTacheIndexation)
      this.resetNouvelleOppositionForm()
      this.initNouvelleOppositionForm()
      if (this.typeRegistre) {
        this.metadonneesForm.get('typeRegistreId')!.setValue(this.typeRegistre.id)
      }
    }
  }

  getPeriodes(): void {
    this.periodeService.getAllData()
      .subscribe({
        next: (value: Periode[]) => {
          // console.log(value)
          this.periodes = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des périodes' })
        }
      })
  }

  onPeriodeChange(selectedPeriodeId?: string): void {
    if (selectedPeriodeId) {
      this.regionsMetadonneesForm = this._regionsMetadonneesForm.filter(value => value.periodeId == selectedPeriodeId)
    }
    else {
      this.regionsMetadonneesForm = this._regionsMetadonneesForm
    }
  }

  getRegionsMetadonneesForm(): void {
    this.regionService.getAllData()
      .subscribe({
        next: (value: Region[]) => {
          // console.log(value)
          this._regionsMetadonneesForm = value
          this.regionsMetadonneesForm = this._regionsMetadonneesForm
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des régions' })
        }
      })
  }

  private getProgressionTacheIndexationValue(removeIds: boolean): ProgressionTacheIndexation {
    if (removeIds) {
      this.nouvelleOppositionForm.removeControl('id');

      (this.requerants.controls as FormGroup[]).forEach((group: FormGroup) => {
        group.removeControl('id');
      });
      (this.intervenants.controls as FormGroup[]).forEach((group: FormGroup) => {
        group.removeControl('id');
      });
      (this.oppositionsRequisitions.controls as FormGroup[]).forEach((group: FormGroup) => {
        group.removeControl('id');
      });
    }

    let opposition: Opposition = new Opposition()
    opposition = this.nouvelleOppositionForm.value
    opposition.partiesPrenantes = this.getPartiesPrenantes(removeIds)

    let donneeIndexation: DonneeIndexation = new DonneeIndexation()
    donneeIndexation.typeRegistreId = this.metadonneesForm.get('typeRegistreId')!.value
    donneeIndexation.volumeRegistre = this.metadonneesForm.get('volumeRegistre')!.value
    donneeIndexation.folioRegistre = this.metadonneesForm.get('folioRegistre')!.value
    donneeIndexation.regionId = this.metadonneesForm.get('regionId')!.value
    donneeIndexation.opposition = opposition

    let progressionTacheIndexation: ProgressionTacheIndexation = new ProgressionTacheIndexation()
    progressionTacheIndexation.page = this.pageIndexation
    progressionTacheIndexation.qualiteDocumentId = this.metadonneesForm.get('qualiteDocumentId')!.value
    progressionTacheIndexation.commentaire = this.metadonneesForm.get('commentaire')!.value
    progressionTacheIndexation.tacheIndexationId = this.tacheIndexation.id
    progressionTacheIndexation.donneeIndexation = donneeIndexation

    return progressionTacheIndexation
  }

  validerSaisie(): void {
    this.metadonneesForm.markAllAsTouched()
    this.nouvelleOppositionForm.markAllAsTouched()
    // console.log(this.nouvelleOppositionForm.valid, this.metadonneesForm.valid)
    // console.log(this.nouvelleOppositionForm.value, this.metadonneesForm.value)

    if (this.nouvelleOppositionForm.valid && this.metadonneesForm.valid) {
      let progressionTacheIndexation: ProgressionTacheIndexation = this.getProgressionTacheIndexationValue(true)

      // Déterminer l'état
      progressionTacheIndexation.etat = EtatsProgressionIndexation.INDEXE
      console.log(progressionTacheIndexation)

      // Initialiser les dates de saisie et de contrôle
      switch (this.typeTacheIndexation) {
        case TypesTacheIndexation.SAISIE:
          progressionTacheIndexation.dateSaisie = new Date()
          break;

        case TypesTacheIndexation.CONTROLE:
          progressionTacheIndexation.dateControle = new Date()
          break;
      }

      this.progressionTacheIndexationService.create(progressionTacheIndexation)
        .subscribe({
          next: (value: ProgressionTacheIndexation) => {
            console.log(value)
            this.resetNouvelleOppositionForm()

            this.pageIndexationChange.emit(this.pageIndexation)
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'La saisie a été validée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la validation de la saisie' })
          },
        })
    }
  }

  modifierSaisie(etatProgressionIndexation?: EtatsProgressionIndexation): void {
    // console.log(this.nouvelleOppositionForm.value)

    if (this.progressionTacheIndexation) {
      this.metadonneesForm.markAllAsTouched()
      this.nouvelleOppositionForm.markAllAsTouched()

      if (this.nouvelleOppositionForm.valid && this.metadonneesForm.valid) {
        let progressionTacheIndexation: ProgressionTacheIndexation = this.getProgressionTacheIndexationValue(false)
        progressionTacheIndexation.id = this.progressionTacheIndexation.id!

        switch (this.typeTacheIndexation) {
          case TypesTacheIndexation.SAISIE:
            progressionTacheIndexation.dateSaisie = new Date()
            break;

          case TypesTacheIndexation.CONTROLE:
            progressionTacheIndexation.dateControle = new Date()

            // Déterminer l'état
            const qualiteDocument: QualiteDocument = this.qualitesDocument.find(value => value.id == progressionTacheIndexation.qualiteDocumentId)!

            if (qualiteDocument.aSignaler == true) {
              progressionTacheIndexation.etat = EtatsProgressionIndexation.SIGNALE
            }
            else {
              if (etatProgressionIndexation) {
                progressionTacheIndexation.etat = etatProgressionIndexation
              }
            }
            break;
        }
        console.log(progressionTacheIndexation)

        this.progressionTacheIndexationService.update(progressionTacheIndexation)
          .subscribe({
            next: (value: ProgressionTacheIndexation) => {
              console.log(value)

              let opposition = progressionTacheIndexation.donneeIndexation?.opposition
              if (opposition && opposition.id != null) {
                this.oppositionService.update(opposition)
                  .subscribe({
                    next: (value) => {
                      this.resetNouvelleOppositionForm()

                      this.pageIndexationChange.emit(this.pageIndexation)
                      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'La saisie a été mise à jour avec succès' })
                    },
                    error: (err: HttpErrorResponse) => {
                      console.log(err)

                      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la saisie' })
                    },
                  })
              }
              else {
                this.pageIndexationChange.emit(this.pageIndexation)
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'La saisie a été mise à jour avec succès' })
              }
            },
            error: (err: HttpErrorResponse) => {
              console.log(err)

              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la saisie' })
            },
          })
      }
    }
  }

  validerControle(): void {
    this.modifierSaisie(EtatsProgressionIndexation.VALIDE)
  }

  rejeter(): void {
    this.modifierSaisie(EtatsProgressionIndexation.REJETE)
  }

  toutEffacer(): void {
    Swal.fire({
      title: '<h5 class="modal-title">Êtes-vous sûr d\'effacer tout le formulaire ?</h5>',
      html: '<div>Vous ne pourrez plus revenir en arrière</div>',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      // confirmButtonColor: 'var(--es-primary)'
      customClass: {
        htmlContainer: "text-muted fs-6",
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-light",
      },
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.resetNouvelleOppositionForm()
      }
    })
  }

  initNouvelleOppositionForm(): void {
    if (this.progressionTacheIndexation) {
      // Parties prenantes
      this.getFormesJuridiques()
      this.getTypesPersonneMorale()
      this.getTypesRelationLegale()
      this.getTypesLienGroupe()
      this.getCivilites()
      this.getNationalites()
      this.getProfessions()
      this.getSecteursActivite()

      console.log("Init nouvelle opposition form: ", this.tacheIndexation)
      this.metadonneesForm.patchValue(this.progressionTacheIndexation)
      if (this.progressionTacheIndexation.donneeIndexation) {
        this.metadonneesForm.patchValue(this.progressionTacheIndexation.donneeIndexation)
        this.metadonneesForm.get('periodeId')?.setValue(this.tacheIndexation.fichier?.region?.periodeId)
      }

      let opposition: Opposition | undefined = this.progressionTacheIndexation?.donneeIndexation?.opposition
      if (opposition) {
        this.nouvelleOppositionForm.patchValue(opposition)
        console.log("Init: ", opposition)

        opposition.partiesPrenantes?.forEach((partiePrenante: PartiePrenante) => {
          let categorie: CategoriesPartiePrenante = partiePrenante.categorie as CategoriesPartiePrenante

          this.addPartiePrenante(partiePrenante.type!, categorie, false, partiePrenante)
        })

        opposition.oppositionsRequisitions?.forEach((oppositionRequisition: OppositionRequisition) => {
          this.addOppositionRequisition(false, oppositionRequisition)
        })
      }
    }
    else {
      this.metadonneesForm.get('periodeId')?.setValue(this.tacheIndexation.fichier?.region?.periodeId)
      this.metadonneesForm.get('regionId')?.setValue(this.tacheIndexation.fichier?.regionId)
    }
  }

  resetNouvelleOppositionForm(): void {
    this.nouvelleOppositionForm.reset()
    for (let index = 0; index < this.requerants.length; index++) {
      this.requerants.removeAt(index)
    }
    for (let index = 0; index < this.intervenants.length; index++) {
      this.intervenants.removeAt(index)
    }
    for (let index = 0; index < this.oppositionsRequisitions.length; index++) {
      this.oppositionsRequisitions.removeAt(index)
    }

    this.metadonneesForm.get('qualiteDocumentId')!.reset()
    this.metadonneesForm.get('folioRegistre')!.reset()
    this.metadonneesForm.get('regionId')!.reset()
    this.metadonneesForm.get('commentaire')!.reset()

    if (this.scrollContainer != undefined) {
      this.scrollContainer.nativeElement.scrollTop = 0
    }
  }

  addOppositionRequisition(removeIds: boolean, value?: any): void {
    if (this.oppositionsRequisitions.valid) {
      let oppositionRequisitionFormGroup: FormGroup = new FormGroup({
        numeroRequisition: new FormControl(value ? value.numeroRequisition : null, [Validators.required]),
      })

      if (!removeIds) {
        oppositionRequisitionFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!this.formulaireEtatActif) {
        oppositionRequisitionFormGroup.disable()
      }

      this.oppositionsRequisitions.push(oppositionRequisitionFormGroup)
    }
  }

  removeOppositionRequisition(index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionOppositionRequisitionForm.get('index')?.setValue(index)
      this.suppressionOppositionRequisitionForm.get('id')?.setValue(this.oppositionsRequisitions.at(index).get('id')?.value)

      this.openSuppressionOppositionRequisitionModal()
    }
    else {
      this.removeOppositionRequisitionAtIndex(index)
    }
  }

  private removeOppositionRequisitionAtIndex(index: number): void {
    this.oppositionsRequisitions.removeAt(index)
  }

  supprimerOppositionRequisition(): void {
    if (this.suppressionOppositionRequisitionForm.valid) {
      let oppositionRequisitionId: string = this.suppressionOppositionRequisitionForm.get('id')?.value
      console.log(oppositionRequisitionId)

      this.oppositionRequisitionService.delete(oppositionRequisitionId)
        .subscribe({
          next: () => {
            let oppositionRequisitionIndex: number = this.suppressionOppositionRequisitionForm.get('index')?.value

            this.removeOppositionRequisitionAtIndex(oppositionRequisitionIndex)
            this.closeSuppressionOppositionRequisitionModal()
            this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce numéro de réquisition a été supprimé avec succès'})
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression'})
          }
        })
    }
  }

  // Modals
  openSuppressionOppositionRequisitionModal(): void {
    this.showSuppressionOppositionRequisitionModal = true
  }

  closeSuppressionOppositionRequisitionModal(): void {
    this.suppressionOppositionRequisitionForm.reset()
    this.showSuppressionOppositionRequisitionModal = false
  }

  // Parties Prenantes
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

  partiesPrenantes(typePartiePrenante: TypesPartiePrenante): FormArray {
    if (typePartiePrenante == TypesPartiePrenante.REQUERANT) {
      return this.nouvelleOppositionForm.controls['requerants'] as FormArray
    }
    else {
      return this.nouvelleOppositionForm.controls['intervenants'] as FormArray
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

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette partie prenante a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de cette partie prenante' })
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

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce membre a été supprimé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de ce membre' })
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

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce(tte) conjoint(e) a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de ce(tte) conjoint(e)' })
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

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette union a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de cette union' })
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

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cet(te) héritier(ère) a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de cet(te) héritier(ère)' })
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

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce représentant a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de ce représentant' })
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

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce représentant a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de ce représentant' })
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

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce représentant a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de ce représentant' })
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

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce représentant a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de ce représentant' })
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

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce représentant a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de ce représentant' })
          }
        })
    }
  }

  // Utils
  getPartiesPrenantes(removeIds: boolean = true): PartiePrenante[] {
    return PartiePrenanteUtils.getInstance().getPartiesPrenantesFromFormGroup(this.nouvelleOppositionForm, removeIds)
  }

  addPartiePrenante(typePartiePrenante: TypesPartiePrenante, categorie: CategoriesPartiePrenante, removeIds: boolean, value?: PartiePrenante): void {
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    console.log(categorie)

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      const partiesPrenantesNextIndex: number = this.partiesPrenantes(typePartiePrenante).controls.length
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
            nomJeuneFille: new FormControl(value ? value.personnePhysique?.nomJeuneFille : null, []),
            nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
            vivant: new FormControl(value ? value.personnePhysique?.vivant : true, []),
            civiliteId: new FormControl(value ? value.personnePhysique?.civiliteId : null, []),
            nationaliteId: new FormControl(value ? value.personnePhysique?.nationaliteId : null, []),
            professionId: new FormControl(value ? value.personnePhysique?.professionId : null, []),
            representants: new FormArray([]),
          })
          // Initialiser les représentants
          if (value?.personnePhysique?.representants && value?.personnePhysique?.representants?.length > 0) {
            value?.personnePhysique?.representants.forEach((representant: RepresentantPersonnePhysique) => {
              this.addRepresentantPersonnePhysique(typePartiePrenante, partiesPrenantesNextIndex, removeIds, representant, partiePrenanteFormGroup)
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
              this.addRepresentantPersonneMorale(typePartiePrenante, partiesPrenantesNextIndex, removeIds, representant, partiePrenanteFormGroup)
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
                nomJeuneFille: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.nomJeuneFille : null, []),
                nomEpoux: new FormControl(value ? value.personneRelationLegale?.personneCible?.personnePhysique?.nomEpoux : null, []),
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
              this.addPersonneMembre(typePartiePrenante, partiesPrenantesNextIndex, removeIds, personneMembre, partiePrenanteFormGroup)
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
              this.addPersonneConjointe(typePartiePrenante, partiesPrenantesNextIndex, removeIds, personneConjointe, partiePrenanteFormGroup)
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
                nomJeuneFille: new FormControl(value ? value.personnePhysique?.nomJeuneFille : null, []),
                nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
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
              this.addConjointPersonneDisposant(typePartiePrenante, partiesPrenantesNextIndex, removeIds, conjointPersonneDisposant, partiePrenanteFormGroup)
            })
          }

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

  addPersonneMembre(typePartiePrenante: TypesPartiePrenante, groupePersonnePhysiqueIndex: number, removeIds: boolean, value?: PersonneMembre, groupePersonnePhysiqueFormGroup?: FormGroup): void {
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      // if (this.partiesPrenantes(typePartiePrenante).at(groupePersonnePhysiqueIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.personnePhysique?.nomJeuneFille : null, []),
          nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
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

      if (!this.formulaireEtatActif) {
        personneMembreFormGroup.disable()
      }

      if (!groupePersonnePhysiqueFormGroup) {
        this.personnesMembres(typePartiePrenante, groupePersonnePhysiqueIndex).push(personneMembreFormGroup)
      }
      else {
        (groupePersonnePhysiqueFormGroup.get('personnesMembres') as FormArray).push(personneMembreFormGroup)

        // Initialiser les représentants
        if (value?.personnePhysique?.representants && value?.personnePhysique?.representants?.length > 0) {
          value?.personnePhysique?.representants.forEach((representant: RepresentantPersonnePhysique) => {
            this.addRepresentantPersonneMembre(typePartiePrenante, groupePersonnePhysiqueIndex, NaN, removeIds, representant, personneMembreFormGroup)
          })
        }
      }
      // }
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

  addRepresentantPersonnePhysique(typePartiePrenante: TypesPartiePrenante, personnePhysiqueIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique, personnePhysiqueFormGroup?: FormGroup): void {
    // console.log(this.representantsPersonnePhysique(typePartiePrenante, personnePhysiqueIndex).valid)
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      // if (this.representantsPersonnePhysique(typePartiePrenante, personnePhysiqueIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.representant?.nomJeuneFille : null, []),
          nomEpoux: new FormControl(value ? value.representant?.nomEpoux : null, []),
          vivant: new FormControl(value ? value.representant?.vivant : true, []),
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

      if (!personnePhysiqueFormGroup) {
        this.representantsPersonnePhysique(typePartiePrenante, personnePhysiqueIndex).push(representantPersonnePhysiqueFormGroup)
      }
      else {
        (personnePhysiqueFormGroup.get('representants') as FormArray).push(representantPersonnePhysiqueFormGroup)
      }
      // }
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

  addRepresentantPersonneMorale(typePartiePrenante: TypesPartiePrenante, personneMoraleIndex: number, removeIds: boolean, value?: RepresentantPersonneMorale, personneMoraleFormGroup?: FormGroup): void {
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      // console.log(this.representantsPersonneMorale(typePartiePrenante, personneMoraleIndex).valid)
      // if (this.representantsPersonneMorale(typePartiePrenante, personneMoraleIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.representant?.nomJeuneFille : null, []),
          nomEpoux: new FormControl(value ? value.representant?.nomEpoux : null, []),
          vivant: new FormControl(value ? value.representant?.vivant : true, []),
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

      if (!personneMoraleFormGroup) {
        this.representantsPersonneMorale(typePartiePrenante, personneMoraleIndex).push(representantPersonneMoraleFormGroup)
      }
      else {
        (personneMoraleFormGroup.get('representants') as FormArray).push(representantPersonneMoraleFormGroup)
      }
      // }
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

  addPersonneConjointe(typePartiePrenante: TypesPartiePrenante, groupeConjointsIndex: number, removeIds: boolean, value?: PersonneConjointe, groupeConjointsFormGroup?: FormGroup): void {
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      // if (this.partiesPrenantes(typePartiePrenante).at(groupeConjointsIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.personnePhysique?.nomJeuneFille : null, []),
          nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
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

      if (!this.formulaireEtatActif) {
        personneConjointeFormGroup.disable()
      }

      if (!groupeConjointsFormGroup) {
        this.personnesConjointes(typePartiePrenante, groupeConjointsIndex).push(personneConjointeFormGroup)
      }
      else {
        (groupeConjointsFormGroup.get('personnesConjointes') as FormArray).push(personneConjointeFormGroup)

        // Initialiser les représentants
        if (value?.personnePhysique?.representants && value?.personnePhysique?.representants?.length > 0) {
          value?.personnePhysique?.representants.forEach((representant: RepresentantPersonnePhysique) => {
            this.addRepresentantPersonneConjointe(typePartiePrenante, groupeConjointsIndex, NaN, removeIds, representant, personneConjointeFormGroup)
          })
        }
      }
      // }
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

  addRepresentantPersonneMembre(typePartiePrenante: TypesPartiePrenante, groupePersonnePhysiqueIndex: number, personneMembreIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique, personneMembreFormGroup?: FormGroup): void {
    // console.log(this.representantsPersonneMembre(typePartiePrenante, groupePersonnePhysiqueIndex, personneMembreIndex).valid)
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      // if (this.representantsPersonneMembre(typePartiePrenante, groupePersonnePhysiqueIndex, personneMembreIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.representant?.nomJeuneFille : null, []),
          nomEpoux: new FormControl(value ? value.representant?.nomEpoux : null, []),
          vivant: new FormControl(value ? value.representant?.vivant : true, []),
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

      if (!personneMembreFormGroup) {
        this.representantsPersonneMembre(typePartiePrenante, groupePersonnePhysiqueIndex, personneMembreIndex).push(representantPersonneMembreFormGroup)
      }
      else {
        (personneMembreFormGroup.get('personnePhysique')!.get('representants') as FormArray).push(representantPersonneMembreFormGroup)
      }
      // }
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

  addRepresentantPersonneConjointe(typePartiePrenante: TypesPartiePrenante, groupeConjointsIndex: number, personneConjointeIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique, personneConjointeFormGroup?: FormGroup): void {
    // console.log(this.representantsPersonneConjointe(typePartiePrenante, groupeConjointsIndex, personneConjointeIndex).valid)
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      // if (this.representantsPersonneConjointe(typePartiePrenante, groupeConjointsIndex, personneConjointeIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.representant?.nomJeuneFille : null, []),
          nomEpoux: new FormControl(value ? value.representant?.nomEpoux : null, []),
          vivant: new FormControl(value ? value.representant?.vivant : true, []),
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

      if (!personneConjointeFormGroup) {
        this.representantsPersonneConjointe(typePartiePrenante, groupeConjointsIndex, personneConjointeIndex).push(representantPersonneConjointeFormGroup)
      }
      else {
        (personneConjointeFormGroup.get('personnePhysique')!.get('representants') as FormArray).push(representantPersonneConjointeFormGroup)
      }
      // }
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

  addConjointPersonneDisposant(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, removeIds: boolean, value?: ConjointPersonneDisposant, groupeHeritiersFormGroup?: FormGroup): void {
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      // if (this.partiesPrenantes(typePartiePrenante).at(groupeHeritiersIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.personnePhysique?.nomJeuneFille : null, []),
          nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
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

      if (!this.formulaireEtatActif) {
        conjointPersonneDisposantFormGroup.disable()
      }

      if (!groupeHeritiersFormGroup) {
        this.conjointsPersonneDisposant(typePartiePrenante, groupeHeritiersIndex).push(conjointPersonneDisposantFormGroup)
      }
      else {
        (groupeHeritiersFormGroup.get('conjointsPersonneDisposant') as FormArray).push(conjointPersonneDisposantFormGroup)

        // Initialiser les héritiers
        if (value?.personnesHeritieres && value?.personnesHeritieres?.length > 0) {
          value?.personnesHeritieres.forEach((personneHeritiere: PersonneHeritiere) => {
            this.addPersonneHeritiere(typePartiePrenante, groupeHeritiersIndex, NaN, removeIds, personneHeritiere, conjointPersonneDisposantFormGroup)
          })
        }
      }
      // }
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


  addPersonneHeritiere(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, removeIds: boolean, value?: PersonneHeritiere, conjointPersonneDisposantFormGroup?: FormGroup): void {
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      // if (this.conjointsPersonneDisposant(typePartiePrenante, groupeHeritiersIndex).at(conjointPersonneDisposantIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.personnePhysique?.nomJeuneFille : null, []),
          nomEpoux: new FormControl(value ? value.personnePhysique?.nomEpoux : null, []),
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

      if (!this.formulaireEtatActif) {
        personneHeritiereFormGroup.disable()
      }

      if (!conjointPersonneDisposantFormGroup) {
        this.personnesHeritieres(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex).push(personneHeritiereFormGroup)
      }
      else {
        (conjointPersonneDisposantFormGroup.get('personnesHeritieres') as FormArray).push(personneHeritiereFormGroup)

        // Initialiser les représentants
        if (value?.personnePhysique?.representants && value?.personnePhysique?.representants?.length > 0) {
          value?.personnePhysique?.representants.forEach((representant: RepresentantPersonnePhysique) => {
            this.addRepresentantPersonneHeritiere(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex, NaN, removeIds, representant, personneHeritiereFormGroup)
          })
        }
      }
      // }
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

  addRepresentantPersonneHeritiere(typePartiePrenante: TypesPartiePrenante, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique, personneHeritiereFormGroup?: FormGroup): void {
    // console.log(this.representantsPersonneHeritiere(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).valid)
    this.partiesPrenantes(typePartiePrenante).markAllAsTouched()

    if (this.partiesPrenantes(typePartiePrenante).valid) {
      // if (this.representantsPersonneHeritiere(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).valid) {
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
          nomJeuneFille: new FormControl(value ? value.representant?.nomJeuneFille : null, []),
          nomEpoux: new FormControl(value ? value.representant?.nomEpoux : null, []),
          vivant: new FormControl(value ? value.representant?.vivant : true, []),
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

      if (!personneHeritiereFormGroup) {
        this.representantsPersonneHeritiere(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).push(representantPersonneHeritiereFormGroup)
      }
      else {
        (personneHeritiereFormGroup.get('personnePhysique')!.get('representants') as FormArray).push(representantPersonneHeritiereFormGroup)
      }
      // }
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
