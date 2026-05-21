import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { CategoriesPartiePrenante } from '../../../../../data/enums/CategoriesPartiePrenante';
import { EtatsProgressionIndexation } from '../../../../../data/enums/EtatsProgressionIndexation';
import { StatutsTitreFoncier } from '../../../../../data/enums/StatutsTitreFoncier';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';
import { TypesTacheIndexation } from '../../../../../data/enums/TypesTacheIndexation';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { Canton } from '../../../../../data/modules/commun/models/Canton';
import { Commune } from '../../../../../data/modules/commun/models/Commune';
import { Periode } from '../../../../../data/modules/commun/models/Periode';
import { Prefecture } from '../../../../../data/modules/commun/models/Prefecture';
import { QualiteDocument } from '../../../../../data/modules/commun/models/QualiteDocument';
import { Quartier } from '../../../../../data/modules/commun/models/Quartier';
import { Region } from '../../../../../data/modules/commun/models/Region';
import { TypeRegistre } from '../../../../../data/modules/commun/models/TypeRegistre';
import { CantonService } from '../../../../../data/modules/commun/services/canton.service';
import { CommuneService } from '../../../../../data/modules/commun/services/commune.service';
import { PeriodeService } from '../../../../../data/modules/commun/services/periode.service';
import { PrefectureService } from '../../../../../data/modules/commun/services/prefecture.service';
import { QuartierService } from '../../../../../data/modules/commun/services/quartier.service';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';
import { DirectionLimite } from '../../../../../data/modules/gestion-dossiers/models/DirectionLimite';
import { ModeAcquisition } from '../../../../../data/modules/gestion-dossiers/models/ModeAcquisition';
import { ModeAlienation } from '../../../../../data/modules/gestion-dossiers/models/ModeAlienation';
import { PrivilegeHypotheque } from '../../../../../data/modules/gestion-dossiers/models/PrivilegeHypotheque';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { DirectionLimiteService } from '../../../../../data/modules/gestion-dossiers/services/direction-limite.service';
import { LimiteService } from '../../../../../data/modules/gestion-dossiers/services/limite.service';
import { TitreFoncierService } from '../../../../../data/modules/gestion-dossiers/services/titre-foncier.service';
import { DonneeIndexation } from '../../../../../data/modules/indexation/models/DonneeIndexation';
import { ProgressionTacheIndexation } from '../../../../../data/modules/indexation/models/ProgressionTacheIndexation';
import { TacheIndexation } from '../../../../../data/modules/indexation/models/TacheIndexation';
import { ProgressionTacheIndexationService } from '../../../../../data/modules/indexation/services/progression-tache-indexation.service';
import { ContenanceUtils } from '../../../../../data/utils/ContenanceUtils';
import { ProcessusCreationTitreFoncier } from '../../../../../data/enums/ProcessusCreationTitreFoncier';
import { VillageService } from '../../../../../data/modules/commun/services/village.service';
import { VilleService } from '../../../../../data/modules/commun/services/ville.service';
import { CiviliteService } from '../../../../../data/modules/commun/services/civilite.service';
import { FormeJuridiqueService } from '../../../../../data/modules/commun/services/forme-juridique.service';
import { NationaliteService } from '../../../../../data/modules/commun/services/nationalite.service';
import { ProfessionService } from '../../../../../data/modules/commun/services/profession.service';
import { SecteurActiviteService } from '../../../../../data/modules/commun/services/secteur-activite.service';
import { TypeLienGroupeService } from '../../../../../data/modules/commun/services/type-lien-groupe.service';
import { TypePersonneMoraleService } from '../../../../../data/modules/commun/services/type-personne-morale.service';
import { TypeRelationLegaleService } from '../../../../../data/modules/commun/services/type-relation-legale.service';
import { ConjointPersonneDisposantService } from '../../../../../data/modules/gestion-dossiers/services/conjoint-personne-disposant.service';
import { PartiePrenanteService } from '../../../../../data/modules/gestion-dossiers/services/partie-prenante.service';
import { PersonneConjointeService } from '../../../../../data/modules/gestion-dossiers/services/personne-conjointe.service';
import { PersonneHeritiereService } from '../../../../../data/modules/gestion-dossiers/services/personne-heritiere.service';
import { PersonneMembreService } from '../../../../../data/modules/gestion-dossiers/services/personne-membre.service';
import { RepresentantPersonneMoraleService } from '../../../../../data/modules/gestion-dossiers/services/representant-personne-morale.service';
import { RepresentantPersonnePhysiqueService } from '../../../../../data/modules/gestion-dossiers/services/representant-personne-physique.service';
import { Village } from '../../../../../data/modules/commun/models/Village';
import { Ville } from '../../../../../data/modules/commun/models/Ville';
import { PartiePrenante } from '../../../../../data/modules/gestion-dossiers/models/PartiePrenante';
import { Augmentation } from '../../../../../data/modules/gestion-dossiers/models/Augmentation';
import { OppositionCasInscriptionDifferee } from '../../../../../data/modules/gestion-dossiers/models/OppositionCasInscriptionDifferee';
import { Diminution } from '../../../../../data/modules/gestion-dossiers/models/Diminution';
import { DroitReelConstitueParDenombrement } from '../../../../../data/modules/gestion-dossiers/models/DroitReelConstitueParDenombrement';
import { CauseIndisponibilite } from '../../../../../data/modules/gestion-dossiers/models/CauseIndisponibilite';
import { Mutation } from '../../../../../data/modules/gestion-dossiers/models/Mutation';
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
import { Limite } from '../../../../../data/modules/gestion-dossiers/models/Limite';
import { ModeAcquisitionService } from '../../../../../data/modules/gestion-dossiers/services/mode-acquisition.service';
import { ModeAlienationService } from '../../../../../data/modules/gestion-dossiers/services/mode-alienation.service';
import { AugmentationService } from '../../../../../data/modules/gestion-dossiers/services/augmentation.service';
import { CauseIndisponibiliteService } from '../../../../../data/modules/gestion-dossiers/services/cause-indisponibilite.service';
import { DiminutionService } from '../../../../../data/modules/gestion-dossiers/services/diminution.service';
import { DroitReelConstitueParDenombrementService } from '../../../../../data/modules/gestion-dossiers/services/droit-reel-constitue-par-denombrement.service';
import { MutationService } from '../../../../../data/modules/gestion-dossiers/services/mutation.service';
import { OppositionCasInscriptionDiffereeService } from '../../../../../data/modules/gestion-dossiers/services/opposition-cas-inscription-differee.service';
import { PrivilegeHypothequeService } from '../../../../../data/modules/gestion-dossiers/services/privilege-hypotheque.service';
import { PartiePrenanteUtils } from '../../../../../data/utils/PartiePrenanteUtils';

@Component({
  selector: 'app-indexation-titre-foncier-section',
  templateUrl: './indexation-titre-foncier-section.component.html',
  styleUrl: './indexation-titre-foncier-section.component.scss'
})
export class IndexationTitreFoncierSectionComponent implements OnInit, OnChanges {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  @Input() formulaireEtatActif: boolean = false
  @Input() tacheIndexation!: TacheIndexation
  @Input() pageIndexation!: number
  @Output() pageIndexationChange: EventEmitter<number> = new EventEmitter()
  @Input() progressionTacheIndexation?: ProgressionTacheIndexation

  @Input() qualitesDocument: QualiteDocument[] = []
  @Input() typeRegistre?: TypeRegistre
  @Input() typeTacheIndexation!: TypesTacheIndexation

  showSuppressionOppositionCasInscriptionDiffereeModal: boolean = false
  showSuppressionLimiteTitreFoncierModal: boolean = false
  showSuppressionAugmentationModal: boolean = false
  showSuppressionDiminutionModal: boolean = false
  showSuppressionDroitReelConstitueParDenombrementModal: boolean = false
  showSuppressionCauseIndisponibiliteModal: boolean = false
  showSuppressionMutationModal: boolean = false
  showSuppressionPrivilegeHypothequeModal: boolean = false

  error: boolean = false
  nouveauTitreFoncierError: boolean = false
  sectionIndex: number = 1
  readonly totalSections: number = 7

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

  nouveauTitreFoncierForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    statut: new FormControl(StatutsTitreFoncier.VALIDE, [Validators.required]),
    informationsStatut: new FormControl(null, []),
    numeroPrefixe: new FormControl(null, []),
    numero: new FormControl(null, [Validators.required]),
    numeroSuffixe: new FormControl(null, []),
    // numeroTitreFoncier: new FormControl(null, [Validators.required]),
    processusCreation: new FormControl(null, [Validators.required]),
    numeroRequisition: new FormControl(null, []),
    numeroTitreFoncierMorcelle: new FormControl(null, []),
    oppositionsCasInscriptionDifferee: new FormArray([]),
    natureConsistanceImmeuble: new FormControl(null, [Validators.required]),
    contenanceEnHectare: new FormControl(null, [Validators.required]),
    contenanceEnAre: new FormControl(null, [Validators.required]),
    contenanceEnCentiare: new FormControl(null, [Validators.required]),
    situationPropriete: new FormGroup({
      id: new FormControl(null, []),
      regionId: new FormControl(null, [Validators.required]),
      prefectureId: new FormControl(null, []),
      communeId: new FormControl(null, []),
      cantonId: new FormControl(null, [Validators.required]),
      villageId: new FormControl(null, []),
      villeId: new FormControl(null, []),
      quartierId: new FormControl(null, []),
      lieudit: new FormControl(null, []),
      rue: new FormControl(null, []),
    }),
    limitesTitreFoncier: new FormArray([]),
    augmentations: new FormArray([]),
    diminutions: new FormArray([]),
    droitsReelsConstituesParDenombrement: new FormArray([]),
    causesIndisponibilite: new FormArray([]),
    mutations: new FormArray([]),
    privilegesHypotheques: new FormArray([]),
  })

  get oppositionsCasInscriptionDifferee() {
    return this.nouveauTitreFoncierForm.controls['oppositionsCasInscriptionDifferee'] as FormArray
  }

  get limitesTitreFoncier() {
    return this.nouveauTitreFoncierForm.controls['limitesTitreFoncier'] as FormArray
  }

  get augmentations() {
    return this.nouveauTitreFoncierForm.controls['augmentations'] as FormArray
  }

  get diminutions() {
    return this.nouveauTitreFoncierForm.controls['diminutions'] as FormArray
  }

  get droitsReelsConstituesParDenombrement() {
    return this.nouveauTitreFoncierForm.controls['droitsReelsConstituesParDenombrement'] as FormArray
  }

  get causesIndisponibilite() {
    return this.nouveauTitreFoncierForm.controls['causesIndisponibilite'] as FormArray
  }

  get mutations() {
    return this.nouveauTitreFoncierForm.controls['mutations'] as FormArray
  }

  get privilegesHypotheques() {
    return this.nouveauTitreFoncierForm.controls['privilegesHypotheques'] as FormArray
  }

  suppressionLimiteTitreFoncierForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
  })

  suppressionAugmentationForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
  })

  suppressionDiminutionForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
  })

  suppressionDroitReelConstitueParDenombrementForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
  })

  suppressionCauseIndisponibiliteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
  })

  suppressionMutationForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
  })

  suppressionPrivilegeHypothequeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
  })

  suppressionOppositionCasInscriptionDiffereeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
  })

  periodes: Periode[] = []
  _regionsMetadonneesForm: Region[] = []
  regionsMetadonneesForm: Region[] = []
  _regions: Region[] = []
  regions: Region[] = []
  _prefectures: Prefecture[] = []
  prefectures: Prefecture[] = []
  _communes: Commune[] = []
  communes: Commune[] = []
  _cantons: Canton[] = []
  cantons: Canton[] = []
  _villages: Village[] = []
  villages: Village[] = []
  _villes: Ville[] = []
  villes: Ville[] = []
  _quartiers: Quartier[] = []
  quartiers: Quartier[] = []
  directionsLimite: DirectionLimite[] = []
  modesAcquisition: ModeAcquisition[] = []
  modesAlienation: ModeAlienation[] = []

  status = [
    { id: StatutsTitreFoncier.VALIDE, libelle: 'Valide' },
    { id: StatutsTitreFoncier.ANNULE, libelle: 'Annulé' },
  ]

  onStatutChange(): void {
    if (this.nouveauTitreFoncierForm.get('statut')!.value != StatutsTitreFoncier.VALIDE) {
      this.nouveauTitreFoncierForm.controls['informationsStatut'].setValidators([Validators.required])
      this.nouveauTitreFoncierForm.controls['informationsStatut'].updateValueAndValidity()
    }
    else {
      this.nouveauTitreFoncierForm.controls['informationsStatut'].setValidators([])
      this.nouveauTitreFoncierForm.controls['informationsStatut'].updateValueAndValidity()
    }
  }

  readonly typesTacheIndexation = TypesTacheIndexation
  readonly etatsProgressionIndexation = EtatsProgressionIndexation
  readonly statutsTitreFoncier = StatutsTitreFoncier
  readonly ProcessusCreationTitreFoncier = ProcessusCreationTitreFoncier

  constructor(
    private notificationsHandlerService: NotificationsHandlerService,
    private modeAcquisitionService: ModeAcquisitionService,
    private modeAlienationService: ModeAlienationService,
    private directionLimiteService: DirectionLimiteService,
    private progressionTacheIndexationService: ProgressionTacheIndexationService,
    private titreFoncierService: TitreFoncierService,

    // Situation
    private periodeService: PeriodeService,
    private regionService: RegionService,
    private prefectureService: PrefectureService,
    private communeService: CommuneService,
    private cantonService: CantonService,
    private villageService: VillageService,
    private villeService: VilleService,
    private quartierService: QuartierService,
    //... Titre foncier
    private limiteService: LimiteService,
    private augmentationService: AugmentationService,
    private diminutionService: DiminutionService,
    private droitReelConstitueParDenombrementService: DroitReelConstitueParDenombrementService,
    private causeIndisponibiliteService: CauseIndisponibiliteService,
    private mutationService: MutationService,
    private privilegeHypothequeService: PrivilegeHypothequeService,
    private oppositionCasInscriptionDiffereeService: OppositionCasInscriptionDiffereeService,
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
  ) { }

  ngOnInit(): void {
    this.getPeriodes()
    this.getRegionsMetadonneesForm()

    this.onProcessusCreationTitreFoncierChange()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formulaireEtatActif']) {
      if (this.formulaireEtatActif) {
        this.metadonneesForm.enable(); // Désactiver le formulaire
        this.nouveauTitreFoncierForm.enable(); // Désactiver le formulaire
      } else {
        this.metadonneesForm.disable(); // Réactiver le formulaire
        this.nouveauTitreFoncierForm.disable(); // Réactiver le formulaire
      }
    }

    if (changes['pageIndexation']) {
      console.log(this.progressionTacheIndexation)
      this.resetNouveauTitreFoncierForm()
      this.initNouveauTitreFoncierForm()
      if (this.typeRegistre) {
        this.metadonneesForm.get('typeRegistreId')!.setValue(this.typeRegistre.id)
      }
    }
  }

  nextSection(): void {
    if (this.sectionIndex < this.totalSections) {
      this.sectionIndex += 1
    }
  }

  prevSection(): void {
    if (this.sectionIndex > 1) {
      this.sectionIndex -= 1
    }
  }

  padNumeroTitreFoncierInput(): void {
    const control = this.nouveauTitreFoncierForm.get('numero');
    if (control) {
      const value = control.value || '';
      control.setValue(value.padStart(5, '0'));
    }
  }

  updateNumeroTitreFoncier(region?: Region): void {
    if (region) {
      this.nouveauTitreFoncierForm.get('numeroPrefixe')!.setValue(region.sigle)
      this.nouveauTitreFoncierForm.get('numeroSuffixe')!.setValue(region.periode?.sigle)
    }
    else {
      this.nouveauTitreFoncierForm.get('numeroPrefixe')!.setValue(null)
      this.nouveauTitreFoncierForm.get('numeroSuffixe')!.setValue(null)
    }
    console.log(this.nouveauTitreFoncierForm.get('numeroPrefixe')!.value, this.nouveauTitreFoncierForm.get('numeroSuffixe')!.value)
  }

  onProcessusCreationTitreFoncierChange(): void {
    switch (this.nouveauTitreFoncierForm.get('processusCreation')!.value) {
      case ProcessusCreationTitreFoncier.IMMATRICULATION:
        this.nouveauTitreFoncierForm.controls['numeroRequisition'].setValidators([Validators.required])
        this.nouveauTitreFoncierForm.controls['numeroRequisition'].updateValueAndValidity()
        this.nouveauTitreFoncierForm.controls['numeroTitreFoncierMorcelle'].setValidators([])
        this.nouveauTitreFoncierForm.controls['numeroTitreFoncierMorcelle'].updateValueAndValidity()
        break;

      case ProcessusCreationTitreFoncier.MORCELLEMENT:
        this.nouveauTitreFoncierForm.controls['numeroRequisition'].setValidators([])
        this.nouveauTitreFoncierForm.controls['numeroRequisition'].updateValueAndValidity()
        this.nouveauTitreFoncierForm.controls['numeroTitreFoncierMorcelle'].setValidators([Validators.required])
        this.nouveauTitreFoncierForm.controls['numeroTitreFoncierMorcelle'].updateValueAndValidity()
        break;

      default:
        break;
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

  // Situation
  getRegions(): void {
    this.regionService.getAllData()
      .subscribe({
        next: (value: Region[]) => {
          // console.log(value)
          this._regions = value
          this.regions = this._regions
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des régions' })
        }
      })
  }

  getPrefectures(): void {
    this.prefectureService.getAllData()
      .subscribe({
        next: (value: Prefecture[]) => {
          this._prefectures = value
          this.prefectures = this._prefectures
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des préfectures' })
        }
      })
  }

  getCommunes(): void {
    this.communeService.getAllData()
      .subscribe({
        next: (value: Commune[]) => {
          this._communes = value
          this.communes = this._communes
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des communes' })
        }
      })
  }

  getCantons(): void {
    this.cantonService.getAllData()
      .subscribe({
        next: (value: Canton[]) => {
          this._cantons = value
          this.cantons = this._cantons
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des cantons' })
        }
      })
  }

  getVillages(): void {
    this.villageService.getAllData()
      .subscribe({
        next: (value: Village[]) => {
          this._villages = value
          this.villages = this._villages
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des villages' })
        }
      })
  }

  getVilles(): void {
    this.villeService.getAllData()
      .subscribe({
        next: (value: Ville[]) => {
          this._villes = value
          this.villes = this._villes
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des villes' })
        }
      })
  }

  getQuartiers(): void {
    this.quartierService.getAllData()
      .subscribe({
        next: (value: Quartier[]) => {
          this._quartiers = value
          this.quartiers = this._quartiers
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des quartiers' })
        }
      })
  }

  // Modes
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

  getModesAlienation(): void {
    this.modeAlienationService.getAllData()
      .subscribe({
        next: (value: ModeAlienation[]) => {
          // console.log(value)
          this.modesAlienation = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des modes d\'alienation' })
        }
      })
  }

  // Limites
  getDirectionsLimite(): void {
    this.directionLimiteService.getAllData()
      .subscribe({
        next: (value: DirectionLimite[]) => {
          // console.log('Directions limite :', value)
          this.directionsLimite = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des directions de limite' })
        }
      })
  }

  private getProgressionTacheIndexationValue(removeIds: boolean): ProgressionTacheIndexation {
    if (removeIds) {
      this.nouveauTitreFoncierForm.removeControl('id');
      (this.nouveauTitreFoncierForm.get('situationPropriete') as FormGroup | null)?.removeControl('id');

      (this.oppositionsCasInscriptionDifferee.controls as FormGroup[]).forEach((group: FormGroup) => {
        group.removeControl('id');
      });
      (this.limitesTitreFoncier.controls as FormGroup[]).forEach((group: FormGroup) => {
        group.removeControl('id');
      });
      (this.augmentations.controls as FormGroup[]).forEach((group: FormGroup) => {
        group.removeControl('id');
      });
      (this.diminutions.controls as FormGroup[]).forEach((group: FormGroup) => {
        group.removeControl('id');
      });
      (this.droitsReelsConstituesParDenombrement.controls as FormGroup[]).forEach((group: FormGroup) => {
        group.removeControl('id');
      });
      (this.causesIndisponibilite.controls as FormGroup[]).forEach((group: FormGroup) => {
        group.removeControl('id');
      });
      (this.mutations.controls as FormGroup[]).forEach((group: FormGroup, mutationIndex: number) => {
        group.removeControl('id');

        (this.proprietairesSuccessifs(mutationIndex).controls as FormGroup[]).forEach((group: FormGroup) => {
          group.removeControl('id');
        });
      });
      (this.privilegesHypotheques.controls as FormGroup[]).forEach((group: FormGroup) => {
        group.removeControl('id');
      });
    }

    let titreFoncier: TitreFoncier = new TitreFoncier()
    titreFoncier = this.nouveauTitreFoncierForm.value
    if (titreFoncier.mutations) {
      for (let index = 0; index < titreFoncier.mutations.length; index++) {
        const mutationFormGroup: FormGroup = (this.mutations.controls as FormGroup[])[index];
        // console.log(index, mutationFormGroup.value.proprietairesSuccessifs, this.getPartiesPrenantes(removeIds, mutationFormGroup))
        titreFoncier.mutations[index].partiesPrenantes = this.getPartiesPrenantes(removeIds, mutationFormGroup)
      }
    }

    let donneeIndexation: DonneeIndexation = new DonneeIndexation()
    donneeIndexation.typeRegistreId = this.metadonneesForm.get('typeRegistreId')!.value
    donneeIndexation.volumeRegistre = this.metadonneesForm.get('volumeRegistre')!.value
    donneeIndexation.folioRegistre = this.metadonneesForm.get('folioRegistre')!.value
    donneeIndexation.regionId = this.metadonneesForm.get('regionId')!.value
    donneeIndexation.titreFoncier = titreFoncier

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
    this.nouveauTitreFoncierForm.markAllAsTouched()

    console.log(this.metadonneesForm.valid, this.metadonneesForm.errors)
    console.log(this.nouveauTitreFoncierForm.valid, this.nouveauTitreFoncierForm.errors)

    if (this.nouveauTitreFoncierForm.valid && this.metadonneesForm.valid) {
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
            this.resetNouveauTitreFoncierForm()

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
    // console.log(this.nouveauTitreFoncierForm.value)

    if (this.progressionTacheIndexation) {
      this.metadonneesForm.markAllAsTouched()
      this.nouveauTitreFoncierForm.markAllAsTouched()

      if (this.nouveauTitreFoncierForm.valid && this.metadonneesForm.valid) {
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

              let titreFoncier = progressionTacheIndexation.donneeIndexation?.titreFoncier
              if (titreFoncier && titreFoncier.id != null) {
                this.titreFoncierService.update(titreFoncier)
                  .subscribe({
                    next: (value) => {
                      this.resetNouveauTitreFoncierForm()

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
        this.resetNouveauTitreFoncierForm()
      }
    })
  }

  initNouveauTitreFoncierForm(): void {
    if (this.progressionTacheIndexation) {
      // Modes
      this.getModesAcquisition()
      this.getModesAlienation()
      // Limite
      this.getDirectionsLimite()
      // Situations
      this.getRegions()
      this.getPrefectures()
      this.getCommunes()
      this.getVillages()
      this.getVilles()
      this.getCantons()
      this.getQuartiers()
      // Parties prenantes
      this.getFormesJuridiques()
      this.getTypesPersonneMorale()
      this.getTypesRelationLegale()
      this.getTypesLienGroupe()
      this.getCivilites()
      this.getNationalites()
      this.getProfessions()
      this.getSecteursActivite()

      console.log("Init nouveau titre foncier form: ", this.tacheIndexation)
      this.metadonneesForm.patchValue(this.progressionTacheIndexation)
      if (this.progressionTacheIndexation.donneeIndexation) {
        this.metadonneesForm.patchValue(this.progressionTacheIndexation.donneeIndexation)
        this.metadonneesForm.get('periodeId')?.setValue(this.tacheIndexation.fichier?.region?.periodeId)
      }

      let titreFoncier: TitreFoncier | undefined = this.progressionTacheIndexation?.donneeIndexation?.titreFoncier
      if (titreFoncier) {
        this.nouveauTitreFoncierForm.patchValue(titreFoncier)
        console.log("Init: ", titreFoncier)

        titreFoncier.limitesTitreFoncier?.forEach((limite: Limite) => {
          console.log("Limiteeeeeeeeeee")
          this.addLimiteTitreFoncier(false, limite)
        })

        titreFoncier.oppositionsCasInscriptionDifferee?.forEach((oppositionCasInscriptionDifferee: OppositionCasInscriptionDifferee) => {
          this.addOppositionCasInscriptionDifferee(false, oppositionCasInscriptionDifferee)
        })

        titreFoncier.augmentations?.forEach((augmentation: Augmentation) => {
          this.addAugmentation(false, augmentation)
        })

        titreFoncier.diminutions?.forEach((diminution: Diminution) => {
          this.addDiminution(false, diminution)
        })

        titreFoncier.droitsReelsConstituesParDenombrement?.forEach((droitReelConstitueParDenombrement: DroitReelConstitueParDenombrement) => {
          this.addDroitReelConstitueParDenombrement(false, droitReelConstitueParDenombrement)
        })

        titreFoncier.causesIndisponibilite?.forEach((causeIndisponibilite: CauseIndisponibilite) => {
          this.addCauseIndisponibilite(false, causeIndisponibilite)
        })

        titreFoncier.mutations?.forEach((mutation: Mutation) => {
          this.addMutation(false, mutation)
        })

        titreFoncier.privilegesHypotheques?.forEach((privilegeHypotheque: PrivilegeHypotheque) => {
          this.addPrivilegeHypotheque(false, privilegeHypotheque)
        })
      }
    }
    else {
      this.metadonneesForm.get('periodeId')?.setValue(this.tacheIndexation.fichier?.region?.periodeId)
      this.metadonneesForm.get('regionId')?.setValue(this.tacheIndexation.fichier?.regionId)
    }
  }

  resetNouveauTitreFoncierForm(): void {
    this.nouveauTitreFoncierForm.reset()
    for (let index = 0; index < this.oppositionsCasInscriptionDifferee.length; index++) {
      this.oppositionsCasInscriptionDifferee.removeAt(index)
    }
    for (let index = 0; index < this.limitesTitreFoncier.length; index++) {
      this.limitesTitreFoncier.removeAt(index)
    }
    for (let index = 0; index < this.augmentations.length; index++) {
      this.augmentations.removeAt(index)
    }
    for (let index = 0; index < this.diminutions.length; index++) {
      this.diminutions.removeAt(index)
    }
    for (let index = 0; index < this.droitsReelsConstituesParDenombrement.length; index++) {
      this.droitsReelsConstituesParDenombrement.removeAt(index)
    }
    for (let index = 0; index < this.causesIndisponibilite.length; index++) {
      this.causesIndisponibilite.removeAt(index)
    }
    for (let index = 0; index < this.mutations.length; index++) {
      this.mutations.removeAt(index)
    }
    for (let index = 0; index < this.privilegesHypotheques.length; index++) {
      this.privilegesHypotheques.removeAt(index)
    }

    this.metadonneesForm.get('qualiteDocumentId')!.reset()
    this.metadonneesForm.get('folioRegistre')!.reset()
    this.metadonneesForm.get('regionId')!.reset()
    this.metadonneesForm.get('commentaire')!.reset()

    this.sectionIndex = 1

    if (this.scrollContainer != undefined) {
      this.scrollContainer.nativeElement.scrollTop = 0
    }
  }

  // ... Titre foncier
  supprimerLimiteTitreFoncier(): void {
    if (this.suppressionLimiteTitreFoncierForm.valid) {
      let limiteId: string = this.suppressionLimiteTitreFoncierForm.get('id')!.value
      this.limiteService.delete(limiteId)
        .subscribe({
          next: () => {
            let limiteIndex: number = this.suppressionLimiteTitreFoncierForm.get('index')!.value

            this.removeLimiteTitreFoncierAtIndex(limiteIndex)
            this.closeSuppressionLimiteTitreFoncierModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette limite a été supprimée avec succès' })
          },
          error: (err) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de cette limite' })
          },
        })
    }
  }

  supprimerAugmentation(): void {
    if (this.suppressionAugmentationForm.valid) {
      let augmentationId: string = this.suppressionAugmentationForm.get('id')!.value
      this.augmentationService.delete(augmentationId)
        .subscribe({
          next: () => {
            let augmentationIndex: number = this.suppressionAugmentationForm.get('index')!.value

            this.removeAugmentationAtIndex(augmentationIndex)
            this.closeSuppressionAugmentationModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette augmentation a été supprimée avec succès' })
          },
          error: (err) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de cette augmentation' })
          },
        })
    }
  }

  supprimerDiminution(): void {
    if (this.suppressionDiminutionForm.valid) {
      let diminutionId: string = this.suppressionDiminutionForm.get('id')!.value
      this.diminutionService.delete(diminutionId)
        .subscribe({
          next: () => {
            let diminutionIndex: number = this.suppressionDiminutionForm.get('index')!.value

            this.removeDiminutionAtIndex(diminutionIndex)
            this.closeSuppressionDiminutionModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette diminution a été supprimée avec succès' })
          },
          error: (err) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de cette diminution' })
          },
        })
    }
  }

  supprimerDroitReelConstitueParDenombrement(): void {
    if (this.suppressionDroitReelConstitueParDenombrementForm.valid) {
      let droitReelConstitueParDenombrementId: string = this.suppressionDroitReelConstitueParDenombrementForm.get('id')!.value
      this.droitReelConstitueParDenombrementService.delete(droitReelConstitueParDenombrementId)
        .subscribe({
          next: () => {
            let droitReelConstitueParDenombrementIndex: number = this.suppressionDroitReelConstitueParDenombrementForm.get('index')!.value

            this.removeDroitReelConstitueParDenombrementAtIndex(droitReelConstitueParDenombrementIndex)
            this.closeSuppressionDroitReelConstitueParDenombrementModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce droit réel constitué par dénombrement a été supprimée avec succès' })
          },
          error: (err) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de ce droit réel constitué par dénombrement' })
          },
        })
    }
  }

  supprimerCauseIndisponibilite(): void {
    if (this.suppressionCauseIndisponibiliteForm.valid) {
      let causeIndisponibiliteId: string = this.suppressionCauseIndisponibiliteForm.get('id')!.value
      this.causeIndisponibiliteService.delete(causeIndisponibiliteId)
        .subscribe({
          next: () => {
            let causeIndisponibiliteIndex: number = this.suppressionCauseIndisponibiliteForm.get('index')!.value

            this.removeCauseIndisponibiliteAtIndex(causeIndisponibiliteIndex)
            this.closeSuppressionCauseIndisponibiliteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette cause d\'indisponibilité a été supprimée avec succès' })
          },
          error: (err) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de cette cause d\'indisponibilité' })
          },
        })
    }
  }

  supprimerMutation(): void {
    if (this.suppressionMutationForm.valid) {
      let mutationId: string = this.suppressionMutationForm.get('id')!.value
      this.mutationService.delete(mutationId)
        .subscribe({
          next: () => {
            let mutationIndex: number = this.suppressionMutationForm.get('index')!.value

            this.removeMutationAtIndex(mutationIndex)
            this.closeSuppressionMutationModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette mutation a été supprimée avec succès' })
          },
          error: (err) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de cette mutation' })
          },
        })
    }
  }

  supprimerPrivilegeHypotheque(): void {
    if (this.suppressionPrivilegeHypothequeForm.valid) {
      let privilegeHypothequeId: string = this.suppressionPrivilegeHypothequeForm.get('id')!.value
      this.privilegeHypothequeService.delete(privilegeHypothequeId)
        .subscribe({
          next: () => {
            let privilegeHypothequeIndex: number = this.suppressionPrivilegeHypothequeForm.get('index')!.value

            this.removePrivilegeHypothequeAtIndex(privilegeHypothequeIndex)
            this.closeSuppressionPrivilegeHypothequeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette privilège/hypothèque a été supprimée avec succès' })
          },
          error: (err) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de cette privilège/hypothèque' })
          },
        })
    }
  }

  supprimerOppositionCasInscriptionDifferee(): void {
    if (this.suppressionOppositionCasInscriptionDiffereeForm.valid) {
      let oppositionCasInscriptionDiffereeId: string = this.suppressionOppositionCasInscriptionDiffereeForm.get('id')!.value
      this.oppositionCasInscriptionDiffereeService.delete(oppositionCasInscriptionDiffereeId)
        .subscribe({
          next: () => {
            let oppositionCasInscriptionDiffereeIndex: number = this.suppressionOppositionCasInscriptionDiffereeForm.get('index')!.value

            this.removeOppositionCasInscriptionDiffereeAtIndex(oppositionCasInscriptionDiffereeIndex)
            this.closeSuppressionOppositionCasInscriptionDiffereeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette opposition en cas d\'inscription différée a été supprimée avec succès' })
          },
          error: (err) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de cette opposition en cas d\'inscription différée' })
          },
        })
    }
  }


  // Utils
  getValeurContenance(): string {
    return ContenanceUtils.getInstance().getValeurContenance(
      this.nouveauTitreFoncierForm.get('contenanceEnHectare')!.value,
      this.nouveauTitreFoncierForm.get('contenanceEnAre')!.value,
      this.nouveauTitreFoncierForm.get('contenanceEnCentiare')!.value,
    )
  }

  getSuperficieContenance(): number {
    return ContenanceUtils.getInstance().getSuperficieContenance(
      this.nouveauTitreFoncierForm.get('contenanceEnHectare')!.value,
      this.nouveauTitreFoncierForm.get('contenanceEnAre')!.value,
      this.nouveauTitreFoncierForm.get('contenanceEnCentiare')!.value,
    )
  }

  getAugmentationValeurContenance(index: number): string {
    return ContenanceUtils.getInstance().getValeurContenance(
      this.augmentations.at(index).get('contenanceImmeubleAcquisEnHectare')!.value,
      this.augmentations.at(index).get('contenanceImmeubleAcquisEnAre')!.value,
      this.augmentations.at(index).get('contenanceImmeubleAcquisEnCentiare')!.value,
    )
  }

  getAugmentationSuperficieContenance(index: number): number {
    return ContenanceUtils.getInstance().getSuperficieContenance(
      this.augmentations.at(index).get('contenanceImmeubleAcquisEnHectare')!.value,
      this.augmentations.at(index).get('contenanceImmeubleAcquisEnAre')!.value,
      this.augmentations.at(index).get('contenanceImmeubleAcquisEnCentiare')!.value,
    )
  }

  getDiminutionValeurContenance(index: number): string {
    return ContenanceUtils.getInstance().getValeurContenance(
      this.diminutions.at(index).get('contenanceParcelleAlieneeEnHectare')!.value,
      this.diminutions.at(index).get('contenanceParcelleAlieneeEnAre')!.value,
      this.diminutions.at(index).get('contenanceParcelleAlieneeEnCentiare')!.value,
    )
  }

  getDiminutionSuperficieContenance(index: number): number {
    return ContenanceUtils.getInstance().getSuperficieContenance(
      this.diminutions.at(index).get('contenanceParcelleAlieneeEnHectare')!.value,
      this.diminutions.at(index).get('contenanceParcelleAlieneeEnAre')!.value,
      this.diminutions.at(index).get('contenanceParcelleAlieneeEnCentiare')!.value,
    )
  }

  getPartiesPrenantes(removeIds: boolean = true, mutationFormGroup: FormGroup): PartiePrenante[] {
    return PartiePrenanteUtils.getInstance().getPartiesPrenantesFromFormGroup(mutationFormGroup, removeIds)
  }

  addOppositionCasInscriptionDifferee(removeIds: boolean, value?: OppositionCasInscriptionDifferee): void {
    this.oppositionsCasInscriptionDifferee.markAllAsTouched()

    if (this.oppositionsCasInscriptionDifferee.valid) {
      let oppositionCasInscriptionDiffereeFormGroup: FormGroup = new FormGroup({
        dateOpposition: new FormControl(value ? value.dateOpposition : null, [Validators.required]),
        numeroRegistreDepots: new FormControl(value ? value.numeroRegistreDepots : null, [Validators.required]),
        dureeValiditeOpposition: new FormControl(value ? value.dureeValiditeOpposition : null, []),
      })

      if (!removeIds) {
        oppositionCasInscriptionDiffereeFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!this.formulaireEtatActif) {
        oppositionCasInscriptionDiffereeFormGroup.disable()
      }

      this.oppositionsCasInscriptionDifferee.push(oppositionCasInscriptionDiffereeFormGroup)
    }
  }

  removeOppositionCasInscriptionDifferee(index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionOppositionCasInscriptionDiffereeForm.get('index')?.setValue(index)
      this.suppressionOppositionCasInscriptionDiffereeForm.get('id')?.setValue(this.oppositionsCasInscriptionDifferee.at(index).get('id')?.value)

      this.openSuppressionOppositionCasInscriptionDiffereeModal()
    }
    else {
      this.removeOppositionCasInscriptionDiffereeAtIndex(index)
    }
  }

  private removeOppositionCasInscriptionDiffereeAtIndex(index: number): void {
    this.oppositionsCasInscriptionDifferee.removeAt(index)
  }

  addLimiteTitreFoncier(removeIds: boolean, value?: Limite): void {
    this.limitesTitreFoncier.markAllAsTouched()

    console.log("Limte validddddd: ", this.limitesTitreFoncier.valid, this.limitesTitreFoncier.length, this.limitesTitreFoncier.controls.length)
    if (this.limitesTitreFoncier.valid) {
      let limiteTitreFoncierFormGroup: FormGroup = new FormGroup({
        directionLimiteId: new FormControl(value ? value.directionLimiteId : null, [Validators.required]),
        limitrophe: new FormControl(value ? value.limitrophe : null, [Validators.required]),
      })

      if (!removeIds) {
        limiteTitreFoncierFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!this.formulaireEtatActif) {
        limiteTitreFoncierFormGroup.disable()
      }

      this.limitesTitreFoncier.push(limiteTitreFoncierFormGroup)
    }
  }

  removeLimiteTitreFoncier(index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionLimiteTitreFoncierForm.get('index')?.setValue(index)
      this.suppressionLimiteTitreFoncierForm.get('id')?.setValue(this.limitesTitreFoncier.at(index).get('id')?.value)

      this.openSuppressionLimiteTitreFoncierModal()
    }
    else {
      this.removeLimiteTitreFoncierAtIndex(index)
    }
  }

  private removeLimiteTitreFoncierAtIndex(index: number): void {
    this.limitesTitreFoncier.removeAt(index)
  }

  addAugmentation(removeIds: boolean, value?: Augmentation): void {
    this.augmentations.markAllAsTouched()

    if (this.augmentations.valid) {
      let augmentationFormGroup: FormGroup = new FormGroup({
        numeroBordereauAnalytique: new FormControl(value ? value.numeroBordereauAnalytique : null, [Validators.required]),
        dateInscription: new FormControl(value ? value.dateInscription : null, [Validators.required]),
        numeroTitreAcquis: new FormControl(value ? value.numeroTitreAcquis : null, [Validators.required]),
        designationImmeuble: new FormControl(value ? value.designationImmeuble : null, [Validators.required]),
        modeAcquisitionId: new FormControl(value ? value.modeAcquisitionId : null, [Validators.required]),
        contenanceImmeubleAcquisEnHectare: new FormControl(value ? value.contenanceImmeubleAcquisEnHectare : null, [Validators.required]),
        contenanceImmeubleAcquisEnCentiare: new FormControl(value ? value.contenanceImmeubleAcquisEnCentiare : null, [Validators.required]),
        contenanceImmeubleAcquisEnAre: new FormControl(value ? value.contenanceImmeubleAcquisEnAre : null, [Validators.required]),
        prixAcquisition: new FormControl(value ? value.prixAcquisition : null, []),
      })

      if (!removeIds) {
        augmentationFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!this.formulaireEtatActif) {
        augmentationFormGroup.disable()
      }

      this.augmentations.push(augmentationFormGroup)
    }
  }

  removeAugmentation(index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionAugmentationForm.get('index')?.setValue(index)
      this.suppressionAugmentationForm.get('id')?.setValue(this.augmentations.at(index).get('id')?.value)

      this.openSuppressionAugmentationModal()
    }
    else {
      this.removeAugmentationAtIndex(index)
    }
  }

  private removeAugmentationAtIndex(index: number): void {
    this.augmentations.removeAt(index)
  }

  addDiminution(removeIds: boolean, value?: Diminution): void {
    this.diminutions.markAllAsTouched()

    if (this.diminutions.valid) {
      let diminutionFormGroup: FormGroup = new FormGroup({
        numeroBordereauAnalytique: new FormControl(value ? value.numeroBordereauAnalytique : null, [Validators.required]),
        dateInscription: new FormControl(value ? value.dateInscription : null, [Validators.required]),
        designationImmeuble: new FormControl(value ? value.designationImmeuble : null, [Validators.required]),
        modeAlienationId: new FormControl(value ? value.modeAlienationId : null, [Validators.required]),
        contenanceParcelleAlieneeEnHectare: new FormControl(value ? value.contenanceParcelleAlieneeEnHectare : null, [Validators.required]),
        contenanceParcelleAlieneeEnCentiare: new FormControl(value ? value.contenanceParcelleAlieneeEnCentiare : null, [Validators.required]),
        contenanceParcelleAlieneeEnAre: new FormControl(value ? value.contenanceParcelleAlieneeEnAre : null, [Validators.required]),
        prixAlienation: new FormControl(value ? value.prixAlienation : null, []),
        numeroTitreAliene: new FormControl(value ? value.numeroTitreAliene : null, [Validators.required]),
      })

      if (!removeIds) {
        diminutionFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!this.formulaireEtatActif) {
        diminutionFormGroup.disable()
      }

      this.diminutions.push(diminutionFormGroup)
    }
  }

  removeDiminution(index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionDiminutionForm.get('index')?.setValue(index)
      this.suppressionDiminutionForm.get('id')?.setValue(this.diminutions.at(index).get('id')?.value)

      this.openSuppressionDiminutionModal()
    }
    else {
      this.removeDiminutionAtIndex(index)
    }
  }

  private removeDiminutionAtIndex(index: number): void {
    this.diminutions.removeAt(index)
  }

  addDroitReelConstitueParDenombrement(removeIds: boolean, value?: DroitReelConstitueParDenombrement): void {
    this.droitsReelsConstituesParDenombrement.markAllAsTouched()

    if (this.droitsReelsConstituesParDenombrement.valid) {
      let droitReelConstitueParDenombrementFormGroup: FormGroup = new FormGroup({
        numeroBordereauAnalytiqueConstitution: new FormControl(value ? value.numeroBordereauAnalytiqueConstitution : null, [Validators.required]),
        dateInscription: new FormControl(value ? value.dateInscription : null, [Validators.required]),
        indicationChargeOuConstitue: new FormControl(value ? value.indicationChargeOuConstitue : null, [Validators.required]),
        prix: new FormControl(value ? value.prix : null, []),
        numeroBordereauAnalytiqueRadiation: new FormControl(value ? value.numeroBordereauAnalytiqueRadiation : null, []),
        dateRadiation: new FormControl(value ? value.dateRadiation : null, []),
      })

      if (!removeIds) {
        droitReelConstitueParDenombrementFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!this.formulaireEtatActif) {
        droitReelConstitueParDenombrementFormGroup.disable()
      }

      this.droitsReelsConstituesParDenombrement.push(droitReelConstitueParDenombrementFormGroup)
    }
  }

  removeDroitReelConstitueParDenombrement(index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionDroitReelConstitueParDenombrementForm.get('index')?.setValue(index)
      this.suppressionDroitReelConstitueParDenombrementForm.get('id')?.setValue(this.droitsReelsConstituesParDenombrement.at(index).get('id')?.value)

      this.openSuppressionDroitReelConstitueParDenombrementModal()
    }
    else {
      this.removeDroitReelConstitueParDenombrementAtIndex(index)
    }
  }

  private removeDroitReelConstitueParDenombrementAtIndex(index: number): void {
    this.droitsReelsConstituesParDenombrement.removeAt(index)
  }

  addCauseIndisponibilite(removeIds: boolean, value?: CauseIndisponibilite): void {
    this.causesIndisponibilite.markAllAsTouched()

    if (this.causesIndisponibilite.valid) {
      let causeIndisponibiliteFormGroup: FormGroup = new FormGroup({
        numeroBordereauAnalytiqueStipulationExecution: new FormControl(value ? value.numeroBordereauAnalytiqueStipulationExecution : null, [Validators.required]),
        dateInscription: new FormControl(value ? value.dateInscription : null, [Validators.required]),
        indicationClausesConventionnelles: new FormControl(value ? value.indicationClausesConventionnelles : null, [Validators.required]),
        numeroBordereauAnalytiqueRadiation: new FormControl(value ? value.numeroBordereauAnalytiqueRadiation : null, []),
        dateRadiation: new FormControl(value ? value.dateRadiation : null, []),
      })

      if (!removeIds) {
        causeIndisponibiliteFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!this.formulaireEtatActif) {
        causeIndisponibiliteFormGroup.disable()
      }

      this.causesIndisponibilite.push(causeIndisponibiliteFormGroup)
    }
  }

  removeCauseIndisponibilite(index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionCauseIndisponibiliteForm.get('index')?.setValue(index)
      this.suppressionCauseIndisponibiliteForm.get('id')?.setValue(this.causesIndisponibilite.at(index).get('id')?.value)

      this.openSuppressionCauseIndisponibiliteModal()
    }
    else {
      this.removeCauseIndisponibiliteAtIndex(index)
    }
  }

  private removeCauseIndisponibiliteAtIndex(index: number): void {
    this.causesIndisponibilite.removeAt(index)
  }

  addMutation(removeIds: boolean, value?: Mutation): void {
    this.mutations.markAllAsTouched()

    if (this.mutations.valid) {
      let mutationFormGroup: FormGroup = new FormGroup({
        numeroBordereauAnalytique: new FormControl(value ? value.numeroBordereauAnalytique : null, [Validators.required]),
        dateInscription: new FormControl(value ? value.dateInscription : null, [Validators.required]),
        modeAcquisitionId: new FormControl(value ? value.modeAcquisitionId : null, [Validators.required]),
        description: new FormControl(value ? value.description : null, []),
        prixAcquisition: new FormControl(value ? value.prixAcquisition : null, []),
        valeurVenaleOuEstimee: new FormControl(value ? value.valeurVenaleOuEstimee : null, []),
        proprietairesSuccessifs: new FormArray([])
      })

      // Initialiser les parties prenantes
      if (value?.partiesPrenantes && value?.partiesPrenantes?.length > 0) {
        value?.partiesPrenantes?.forEach((partiePrenante: PartiePrenante) => {
          this.addPartiePrenante(NaN, partiePrenante.categorie!, removeIds, partiePrenante, mutationFormGroup)
        })
      }

      if (!removeIds) {
        mutationFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!this.formulaireEtatActif) {
        mutationFormGroup.disable()
      }

      this.mutations.push(mutationFormGroup)
    }
  }

  removeMutation(index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionMutationForm.get('index')?.setValue(index)
      this.suppressionMutationForm.get('id')?.setValue(this.mutations.at(index).get('id')?.value)

      this.openSuppressionMutationModal()
    }
    else {
      this.removeMutationAtIndex(index)
    }
  }

  private removeMutationAtIndex(index: number): void {
    this.mutations.removeAt(index)
  }

  addPrivilegeHypotheque(removeIds: boolean, value?: PrivilegeHypotheque): void {
    this.privilegesHypotheques.markAllAsTouched()

    if (this.privilegesHypotheques.valid) {
      let privilegeHypothequeFormGroup: FormGroup = new FormGroup({
        numeroBordereauAnalytiqueConstitution: new FormControl(value ? value.numeroBordereauAnalytiqueConstitution : null, [Validators.required]),
        dateInscription: new FormControl(value ? value.dateInscription : null, [Validators.required]),
        beneficiaire: new FormControl(value ? value.beneficiaire : null, [Validators.required]),
        designationDroitConstitue: new FormControl(value ? value.designationDroitConstitue : null, [Validators.required]),
        montantCharge: new FormControl(value ? value.montantCharge : null, []),
        numeroBordereauAnalytiqueRadiation: new FormControl(value ? value.numeroBordereauAnalytiqueRadiation : null, []),
        dateRadiation: new FormControl(value ? value.dateRadiation : null, []),
      })

      if (!removeIds) {
        privilegeHypothequeFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      if (!this.formulaireEtatActif) {
        privilegeHypothequeFormGroup.disable()
      }

      this.privilegesHypotheques.push(privilegeHypothequeFormGroup)
    }
  }

  removePrivilegeHypotheque(index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionPrivilegeHypothequeForm.get('index')?.setValue(index)
      this.suppressionPrivilegeHypothequeForm.get('id')?.setValue(this.privilegesHypotheques.at(index).get('id')?.value)

      this.openSuppressionPrivilegeHypothequeModal()
    }
    else {
      this.removePrivilegeHypothequeAtIndex(index)
    }
  }

  private removePrivilegeHypothequeAtIndex(index: number): void {
    this.privilegesHypotheques.removeAt(index)
  }

  // Modals
  openSuppressionOppositionCasInscriptionDiffereeModal(): void {
    this.showSuppressionOppositionCasInscriptionDiffereeModal = true
  }

  closeSuppressionOppositionCasInscriptionDiffereeModal(): void {
    this.suppressionOppositionCasInscriptionDiffereeForm.reset()
    this.showSuppressionOppositionCasInscriptionDiffereeModal = false
  }

  openSuppressionLimiteTitreFoncierModal(): void {
    this.showSuppressionLimiteTitreFoncierModal = true
  }

  closeSuppressionLimiteTitreFoncierModal(): void {
    this.suppressionLimiteTitreFoncierForm.reset()
    this.showSuppressionLimiteTitreFoncierModal = false
  }

  openSuppressionAugmentationModal(): void {
    this.showSuppressionAugmentationModal = true
  }

  closeSuppressionAugmentationModal(): void {
    this.suppressionAugmentationForm.reset()
    this.showSuppressionAugmentationModal = false
  }

  openSuppressionDiminutionModal(): void {
    this.showSuppressionDiminutionModal = true
  }

  closeSuppressionDiminutionModal(): void {
    this.suppressionDiminutionForm.reset()
    this.showSuppressionDiminutionModal = false
  }

  openSuppressionDroitReelConstitueParDenombrementModal(): void {
    this.showSuppressionDroitReelConstitueParDenombrementModal = true
  }

  closeSuppressionDroitReelConstitueParDenombrementModal(): void {
    this.suppressionDroitReelConstitueParDenombrementForm.reset()
    this.showSuppressionDroitReelConstitueParDenombrementModal = false
  }

  openSuppressionCauseIndisponibiliteModal(): void {
    this.showSuppressionCauseIndisponibiliteModal = true
  }

  closeSuppressionCauseIndisponibiliteModal(): void {
    this.suppressionCauseIndisponibiliteForm.reset()
    this.showSuppressionCauseIndisponibiliteModal = false
  }

  openSuppressionMutationModal(): void {
    this.showSuppressionMutationModal = true
  }

  closeSuppressionMutationModal(): void {
    this.suppressionMutationForm.reset()
    this.showSuppressionMutationModal = false
  }

  openSuppressionPrivilegeHypothequeModal(): void {
    this.showSuppressionPrivilegeHypothequeModal = true
  }

  closeSuppressionPrivilegeHypothequeModal(): void {
    this.suppressionPrivilegeHypothequeForm.reset()
    this.showSuppressionPrivilegeHypothequeModal = false
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

  proprietairesSuccessifs(mutationIndex: number): FormArray {
    return this.mutations.at(mutationIndex).get('proprietairesSuccessifs') as FormArray
  }

  representantsPersonnePhysique(mutationIndex: number, personnePhysiqueIndex: number): FormArray {
    return this.proprietairesSuccessifs(mutationIndex).at(personnePhysiqueIndex).get('representants') as FormArray
  }

  representantsPersonneMorale(mutationIndex: number, personneMoraleIndex: number): FormArray {
    return this.proprietairesSuccessifs(mutationIndex).at(personneMoraleIndex).get('representants') as FormArray
  }

  personnesMembres(mutationIndex: number, groupePersonnePhysiqueIndex: number): FormArray {
    return this.proprietairesSuccessifs(mutationIndex).at(groupePersonnePhysiqueIndex).get('personnesMembres') as FormArray
  }

  representantsPersonneMembre(mutationIndex: number, groupePersonnePhysiqueIndex: number, personneMembreIndex: number): FormArray {
    return this.personnesMembres(mutationIndex, groupePersonnePhysiqueIndex).at(personneMembreIndex).get('personnePhysique')!.get('representants') as FormArray
  }

  personnesConjointes(mutationIndex: number, groupeConjointsIndex: number): FormArray {
    return this.proprietairesSuccessifs(mutationIndex).at(groupeConjointsIndex).get('personnesConjointes') as FormArray
  }

  representantsPersonneConjointe(mutationIndex: number, groupeConjointsIndex: number, personneConjointeIndex: number): FormArray {
    return this.personnesConjointes(mutationIndex, groupeConjointsIndex).at(personneConjointeIndex).get('personnePhysique')!.get('representants') as FormArray
  }

  conjointsPersonneDisposant(mutationIndex: number, groupeHeritiersIndex: number): FormArray {
    return this.proprietairesSuccessifs(mutationIndex).at(groupeHeritiersIndex).get('conjointsPersonneDisposant') as FormArray
  }

  personnesHeritieres(mutationIndex: number, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number): FormArray {
    return this.conjointsPersonneDisposant(mutationIndex, groupeHeritiersIndex).at(conjointPersonneDisposantIndex).get('personnesHeritieres') as FormArray
  }

  representantsPersonneHeritiere(mutationIndex: number, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number): FormArray {
    return this.personnesHeritieres(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex).at(personneHeritiereIndex).get('personnePhysique')!.get('representants') as FormArray
  }

  suppressionPartiePrenanteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    mutationIndex: new FormControl(null, [Validators.required]),
  })

  suppressionPersonneMembreForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupePersonnePhysiqueIndex: new FormControl(null, [Validators.required]),
    mutationIndex: new FormControl(null, [Validators.required]),
  })

  suppressionPersonneConjointeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupeConjointsIndex: new FormControl(null, [Validators.required]),
    mutationIndex: new FormControl(null, [Validators.required]),
  })

  suppressionConjointPersonneDisposantForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupeHeritiersIndex: new FormControl(null, [Validators.required]),
    mutationIndex: new FormControl(null, [Validators.required]),
  })

  suppressionPersonneHeritiereForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupeHeritiersIndex: new FormControl(null, [Validators.required]),
    conjointPersonneDisposantIndex: new FormControl(null, [Validators.required]),
    mutationIndex: new FormControl(null, [Validators.required]),
  })

  suppressionRepresentantPersonnePhysiqueForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    personnePhysiqueIndex: new FormControl(null, [Validators.required]),
    mutationIndex: new FormControl(null, [Validators.required]),
  })

  suppressionRepresentantPersonneMoraleForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    personneMoraleIndex: new FormControl(null, [Validators.required]),
    mutationIndex: new FormControl(null, [Validators.required]),
  })

  suppressionRepresentantPersonneMembreForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupePersonnePhysiqueIndex: new FormControl(null, [Validators.required]),
    personneMembreIndex: new FormControl(null, [Validators.required]),
    mutationIndex: new FormControl(null, [Validators.required]),
  })

  suppressionRepresentantPersonneConjointeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupeConjointsIndex: new FormControl(null, [Validators.required]),
    personneConjointeIndex: new FormControl(null, [Validators.required]),
    mutationIndex: new FormControl(null, [Validators.required]),
  })

  suppressionRepresentantPersonneHeritiereForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    groupeHeritiersIndex: new FormControl(null, [Validators.required]),
    conjointPersonneDisposantIndex: new FormControl(null, [Validators.required]),
    personneHeritiereIndex: new FormControl(null, [Validators.required]),
    mutationIndex: new FormControl(null, [Validators.required]),
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
            let mutationIndex: number = this.suppressionPartiePrenanteForm.get('mutationIndex')?.value

            this.removePartiePrenanteAtIndex(mutationIndex, partiePrenanteIndex)
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
            let mutationIndex: number = this.suppressionPersonneMembreForm.get('type')?.value

            this.removePersonneMembreAtIndex(mutationIndex, groupePersonnePhysiqueIndex, personneMembreIndex)
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
            let mutationIndex: number = this.suppressionPersonneConjointeForm.get('type')?.value

            this.removePersonneConjointeAtIndex(mutationIndex, groupeConjointsIndex, personneConjointeIndex)
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
            let mutationIndex: number = this.suppressionConjointPersonneDisposantForm.get('type')?.value

            this.removeConjointPersonneDisposantAtIndex(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex)
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
            let mutationIndex: number = this.suppressionPersonneHeritiereForm.get('type')?.value

            this.removePersonneHeritiereAtIndex(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex)
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
            let mutationIndex: number = this.suppressionRepresentantPersonnePhysiqueForm.get('type')?.value

            this.removeRepresentantPersonnePhysiqueAtIndex(mutationIndex, personnePhysiqueIndex, representantPersonnePhysiqueIndex)
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
            let mutationIndex: number = this.suppressionRepresentantPersonneMoraleForm.get('type')?.value

            this.removeRepresentantPersonneMoraleAtIndex(mutationIndex, personneMoraleIndex, representantPersonneMoraleIndex)
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
            let mutationIndex: number = this.suppressionRepresentantPersonneMembreForm.get('type')?.value

            this.removeRepresentantPersonneMembreAtIndex(mutationIndex, groupePersonnePhysiqueIndex, personneMembreIndex, representantPersonneMembreIndex)
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
            let mutationIndex: number = this.suppressionRepresentantPersonneConjointeForm.get('type')?.value

            this.removeRepresentantPersonneConjointeAtIndex(mutationIndex, groupeConjointsIndex, personneConjointeIndex, representantPersonneConjointeIndex)
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
            let mutationIndex: number = this.suppressionRepresentantPersonneHeritiereForm.get('type')?.value

            this.removeRepresentantPersonneHeritiereAtIndex(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex, representantPersonneHeritiereIndex)
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
  // getPartiesPrenantes(removeIds: boolean = true): PartiePrenante[] {
  //   return PartiePrenanteUtils.getInstance().getPartiesPrenantesFromFormGroup(this.nouveauTitreFoncierForm, removeIds)
  // }

  addPartiePrenante(mutationIndex: number, categorie: CategoriesPartiePrenante, removeIds: boolean, value?: PartiePrenante, mutationFormGroup?: FormGroup): void {
    this.proprietairesSuccessifs(mutationIndex).markAllAsTouched()

    console.log(categorie)

    if (this.proprietairesSuccessifs(mutationIndex).valid) {
      const proprietairesSuccessifsNextIndex: number = this.proprietairesSuccessifs(mutationIndex).controls.length
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
              this.addRepresentantPersonnePhysique(mutationIndex, proprietairesSuccessifsNextIndex, removeIds, representant, partiePrenanteFormGroup)
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
              this.addRepresentantPersonneMorale(mutationIndex, proprietairesSuccessifsNextIndex, removeIds, representant, partiePrenanteFormGroup)
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
              this.addPersonneMembre(mutationIndex, proprietairesSuccessifsNextIndex, removeIds, personneMembre, partiePrenanteFormGroup)
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
              this.addPersonneConjointe(mutationIndex, proprietairesSuccessifsNextIndex, removeIds, personneConjointe, partiePrenanteFormGroup)
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
              this.addConjointPersonneDisposant(mutationIndex, proprietairesSuccessifsNextIndex, removeIds, conjointPersonneDisposant, partiePrenanteFormGroup)
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

      if (!this.formulaireEtatActif) {
        partiePrenanteFormGroup.disable()
      }

      if (!mutationFormGroup) {
        this.proprietairesSuccessifs(mutationIndex).push(partiePrenanteFormGroup)
      }
      else {
        (mutationFormGroup.get('proprietairesSuccessifs') as FormArray).push(partiePrenanteFormGroup)
      }

    }
  }

  removePartiePrenante(mutationIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionPartiePrenanteForm.get('index')?.setValue(index)
      this.suppressionPartiePrenanteForm.get('mutationIndex')?.setValue(mutationIndex)
      this.suppressionPartiePrenanteForm.get('id')?.setValue(this.proprietairesSuccessifs(mutationIndex).at(index).get('partiePrenanteId')?.value)

      this.openSuppressionPartiePrenanteModal()
    }
    else {
      this.removePartiePrenanteAtIndex(mutationIndex, index)
    }
  }

  private removePartiePrenanteAtIndex(mutationIndex: number, index: number): void {
    this.proprietairesSuccessifs(mutationIndex).removeAt(index)
  }

  addPersonneMembre(mutationIndex: number, groupePersonnePhysiqueIndex: number, removeIds: boolean, value?: PersonneMembre, groupePersonnePhysiqueFormGroup?: FormGroup): void {
    this.proprietairesSuccessifs(mutationIndex).markAllAsTouched()

    if (this.proprietairesSuccessifs(mutationIndex).valid) {
      // if (this.proprietairesSuccessifs(mutationIndex).at(groupePersonnePhysiqueIndex).valid) {
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
        this.personnesMembres(mutationIndex, groupePersonnePhysiqueIndex).push(personneMembreFormGroup)
      }
      else {
        (groupePersonnePhysiqueFormGroup.get('personnesMembres') as FormArray).push(personneMembreFormGroup)

        // Initialiser les représentants
        if (value?.personnePhysique?.representants && value?.personnePhysique?.representants?.length > 0) {
          value?.personnePhysique?.representants.forEach((representant: RepresentantPersonnePhysique) => {
            this.addRepresentantPersonneMembre(mutationIndex, groupePersonnePhysiqueIndex, NaN, removeIds, representant, personneMembreFormGroup)
          })
        }
      }
      // }
    }
  }

  removePersonneMembre(mutationIndex: number, groupePersonnePhysiqueIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionPersonneMembreForm.get('index')?.setValue(index)
      this.suppressionPersonneMembreForm.get('groupePersonnePhysiqueIndex')?.setValue(groupePersonnePhysiqueIndex)
      this.suppressionPersonneMembreForm.get('id')?.setValue(this.personnesMembres(mutationIndex, groupePersonnePhysiqueIndex).at(index).get('id')?.value)
      this.suppressionPersonneMembreForm.get('mutationIndex')?.setValue(mutationIndex)

      this.openSuppressionPersonneMembreModal()
    }
    else {
      this.removePersonneMembreAtIndex(mutationIndex, groupePersonnePhysiqueIndex, index)
    }
  }

  private removePersonneMembreAtIndex(mutationIndex: number, groupePersonnePhysiqueIndex: number, index: number): void {
    this.personnesMembres(mutationIndex, groupePersonnePhysiqueIndex).removeAt(index)
  }

  addRepresentantPersonnePhysique(mutationIndex: number, personnePhysiqueIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique, personnePhysiqueFormGroup?: FormGroup): void {
    // console.log(this.representantsPersonnePhysique(mutationIndex, personnePhysiqueIndex).valid)
    this.proprietairesSuccessifs(mutationIndex).markAllAsTouched()

    if (this.proprietairesSuccessifs(mutationIndex).valid) {
      // if (this.representantsPersonnePhysique(mutationIndex, personnePhysiqueIndex).valid) {
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
        this.representantsPersonnePhysique(mutationIndex, personnePhysiqueIndex).push(representantPersonnePhysiqueFormGroup)
      }
      else {
        (personnePhysiqueFormGroup.get('representants') as FormArray).push(representantPersonnePhysiqueFormGroup)
      }
      // }
    }
  }

  removeRepresentantPersonnePhysique(mutationIndex: number, personnePhysiqueIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionRepresentantPersonnePhysiqueForm.get('index')?.setValue(index)
      this.suppressionRepresentantPersonnePhysiqueForm.get('personnePhysiqueIndex')?.setValue(personnePhysiqueIndex)
      this.suppressionRepresentantPersonnePhysiqueForm.get('id')?.setValue(this.representantsPersonnePhysique(mutationIndex, personnePhysiqueIndex).at(index).get('id')?.value)
      this.suppressionRepresentantPersonnePhysiqueForm.get('mutationIndex')?.setValue(mutationIndex)

      this.openSuppressionRepresentantPersonnePhysiqueModal()
    }
    else {
      this.removeRepresentantPersonnePhysiqueAtIndex(mutationIndex, personnePhysiqueIndex, index)
    }
  }

  private removeRepresentantPersonnePhysiqueAtIndex(mutationIndex: number, personnePhysiqueIndex: number, index: number): void {
    this.representantsPersonnePhysique(mutationIndex, personnePhysiqueIndex).removeAt(index)
  }

  addRepresentantPersonneMorale(mutationIndex: number, personneMoraleIndex: number, removeIds: boolean, value?: RepresentantPersonneMorale, personneMoraleFormGroup?: FormGroup): void {
    this.proprietairesSuccessifs(mutationIndex).markAllAsTouched()

    if (this.proprietairesSuccessifs(mutationIndex).valid) {
      // console.log(this.representantsPersonneMorale(mutationIndex, personneMoraleIndex).valid)
      // if (this.representantsPersonneMorale(mutationIndex, personneMoraleIndex).valid) {
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
        this.representantsPersonneMorale(mutationIndex, personneMoraleIndex).push(representantPersonneMoraleFormGroup)
      }
      else {
        (personneMoraleFormGroup.get('representants') as FormArray).push(representantPersonneMoraleFormGroup)
      }
      // }
    }
  }

  removeRepresentantPersonneMorale(mutationIndex: number, personneMoraleIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionRepresentantPersonneMoraleForm.get('index')?.setValue(index)
      this.suppressionRepresentantPersonneMoraleForm.get('personneMoraleIndex')?.setValue(personneMoraleIndex)
      this.suppressionRepresentantPersonneMoraleForm.get('id')?.setValue(this.representantsPersonneMorale(mutationIndex, personneMoraleIndex).at(index).get('id')?.value)
      this.suppressionRepresentantPersonneMoraleForm.get('mutationIndex')?.setValue(mutationIndex)

      this.openSuppressionRepresentantPersonneMoraleModal()
    }
    else {
      this.removeRepresentantPersonneMoraleAtIndex(mutationIndex, personneMoraleIndex, index)
    }
  }

  private removeRepresentantPersonneMoraleAtIndex(mutationIndex: number, personneMoraleIndex: number, index: number): void {
    this.representantsPersonneMorale(mutationIndex, personneMoraleIndex).removeAt(index)
  }

  addPersonneConjointe(mutationIndex: number, groupeConjointsIndex: number, removeIds: boolean, value?: PersonneConjointe, groupeConjointsFormGroup?: FormGroup): void {
    this.proprietairesSuccessifs(mutationIndex).markAllAsTouched()

    if (this.proprietairesSuccessifs(mutationIndex).valid) {
      // if (this.proprietairesSuccessifs(mutationIndex).at(groupeConjointsIndex).valid) {
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
        this.personnesConjointes(mutationIndex, groupeConjointsIndex).push(personneConjointeFormGroup)
      }
      else {
        (groupeConjointsFormGroup.get('personnesConjointes') as FormArray).push(personneConjointeFormGroup)

        // Initialiser les représentants
        if (value?.personnePhysique?.representants && value?.personnePhysique?.representants?.length > 0) {
          value?.personnePhysique?.representants.forEach((representant: RepresentantPersonnePhysique) => {
            this.addRepresentantPersonneConjointe(mutationIndex, groupeConjointsIndex, NaN, removeIds, representant, personneConjointeFormGroup)
          })
        }
      }
      // }
    }
  }

  removePersonneConjointe(mutationIndex: number, groupeConjointsIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionPersonneConjointeForm.get('index')?.setValue(index)
      this.suppressionPersonneConjointeForm.get('groupeConjointsIndex')?.setValue(groupeConjointsIndex)
      this.suppressionPersonneConjointeForm.get('id')?.setValue(this.personnesConjointes(mutationIndex, groupeConjointsIndex).at(index).get('id')?.value)
      this.suppressionPersonneConjointeForm.get('mutationIndex')?.setValue(mutationIndex)

      this.openSuppressionPersonneConjointeModal()
    }
    else {
      this.removePersonneConjointeAtIndex(mutationIndex, groupeConjointsIndex, index)
    }
  }

  private removePersonneConjointeAtIndex(mutationIndex: number, groupeConjointsIndex: number, index: number): void {
    this.personnesConjointes(mutationIndex, groupeConjointsIndex).removeAt(index)
  }

  addRepresentantPersonneMembre(mutationIndex: number, groupePersonnePhysiqueIndex: number, personneMembreIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique, personneMembreFormGroup?: FormGroup): void {
    // console.log(this.representantsPersonneMembre(mutationIndex, groupePersonnePhysiqueIndex, personneMembreIndex).valid)
    this.proprietairesSuccessifs(mutationIndex).markAllAsTouched()

    if (this.proprietairesSuccessifs(mutationIndex).valid) {
      // if (this.representantsPersonneMembre(mutationIndex, groupePersonnePhysiqueIndex, personneMembreIndex).valid) {
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
        this.representantsPersonneMembre(mutationIndex, groupePersonnePhysiqueIndex, personneMembreIndex).push(representantPersonneMembreFormGroup)
      }
      else {
        (personneMembreFormGroup.get('personnePhysique')!.get('representants') as FormArray).push(representantPersonneMembreFormGroup)
      }
      // }
    }
  }

  removeRepresentantPersonneMembre(mutationIndex: number, groupePersonnePhysiqueIndex: number, personneMembreIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionRepresentantPersonneMembreForm.get('index')?.setValue(index)
      this.suppressionRepresentantPersonneMembreForm.get('groupePersonnePhysiqueIndex')?.setValue(groupePersonnePhysiqueIndex)
      this.suppressionRepresentantPersonneMembreForm.get('personneMembreIndex')?.setValue(personneMembreIndex)
      this.suppressionRepresentantPersonneMembreForm.get('id')?.setValue(this.representantsPersonneMembre(mutationIndex, groupePersonnePhysiqueIndex, personneMembreIndex).at(index).get('id')?.value)
      this.suppressionRepresentantPersonneMembreForm.get('mutationIndex')?.setValue(mutationIndex)

      this.openSuppressionRepresentantPersonneMembreModal()
    }
    else {
      this.removeRepresentantPersonneMembreAtIndex(mutationIndex, groupePersonnePhysiqueIndex, personneMembreIndex, index)
    }
  }

  private removeRepresentantPersonneMembreAtIndex(mutationIndex: number, groupePersonnePhysiqueIndex: number, personneMembreIndex: number, index: number): void {
    this.representantsPersonneMembre(mutationIndex, groupePersonnePhysiqueIndex, personneMembreIndex).removeAt(index)
  }

  addRepresentantPersonneConjointe(mutationIndex: number, groupeConjointsIndex: number, personneConjointeIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique, personneConjointeFormGroup?: FormGroup): void {
    // console.log(this.representantsPersonneConjointe(mutationIndex, groupeConjointsIndex, personneConjointeIndex).valid)
    this.proprietairesSuccessifs(mutationIndex).markAllAsTouched()

    if (this.proprietairesSuccessifs(mutationIndex).valid) {
      // if (this.representantsPersonneConjointe(mutationIndex, groupeConjointsIndex, personneConjointeIndex).valid) {
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
        this.representantsPersonneConjointe(mutationIndex, groupeConjointsIndex, personneConjointeIndex).push(representantPersonneConjointeFormGroup)
      }
      else {
        (personneConjointeFormGroup.get('personnePhysique')!.get('representants') as FormArray).push(representantPersonneConjointeFormGroup)
      }
      // }
    }
  }

  removeRepresentantPersonneConjointe(mutationIndex: number, groupeConjointsIndex: number, personneConjointeIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionRepresentantPersonneConjointeForm.get('index')?.setValue(index)
      this.suppressionRepresentantPersonneConjointeForm.get('groupeConjointsIndex')?.setValue(groupeConjointsIndex)
      this.suppressionRepresentantPersonneConjointeForm.get('personneConjointeIndex')?.setValue(personneConjointeIndex)
      this.suppressionRepresentantPersonneConjointeForm.get('id')?.setValue(this.representantsPersonneConjointe(mutationIndex, groupeConjointsIndex, personneConjointeIndex).at(index).get('id')?.value)
      this.suppressionRepresentantPersonneConjointeForm.get('mutationIndex')?.setValue(mutationIndex)

      this.openSuppressionRepresentantPersonneConjointeModal()
    }
    else {
      this.removeRepresentantPersonneConjointeAtIndex(mutationIndex, groupeConjointsIndex, personneConjointeIndex, index)
    }
  }

  private removeRepresentantPersonneConjointeAtIndex(mutationIndex: number, groupeConjointsIndex: number, personneConjointeIndex: number, index: number): void {
    this.representantsPersonneConjointe(mutationIndex, groupeConjointsIndex, personneConjointeIndex).removeAt(index)
  }

  addConjointPersonneDisposant(mutationIndex: number, groupeHeritiersIndex: number, removeIds: boolean, value?: ConjointPersonneDisposant, groupeHeritiersFormGroup?: FormGroup): void {
    this.proprietairesSuccessifs(mutationIndex).markAllAsTouched()

    if (this.proprietairesSuccessifs(mutationIndex).valid) {
      // if (this.proprietairesSuccessifs(mutationIndex).at(groupeHeritiersIndex).valid) {
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
        this.conjointsPersonneDisposant(mutationIndex, groupeHeritiersIndex).push(conjointPersonneDisposantFormGroup)
      }
      else {
        (groupeHeritiersFormGroup.get('conjointsPersonneDisposant') as FormArray).push(conjointPersonneDisposantFormGroup)

        // Initialiser les héritiers
        if (value?.personnesHeritieres && value?.personnesHeritieres?.length > 0) {
          value?.personnesHeritieres.forEach((personneHeritiere: PersonneHeritiere) => {
            this.addPersonneHeritiere(mutationIndex, groupeHeritiersIndex, NaN, removeIds, personneHeritiere, conjointPersonneDisposantFormGroup)
          })
        }
      }
      // }
    }
  }

  removeConjointPersonneDisposant(mutationIndex: number, groupeHeritiersIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionConjointPersonneDisposantForm.get('index')?.setValue(index)
      this.suppressionConjointPersonneDisposantForm.get('groupeHeritiersIndex')?.setValue(groupeHeritiersIndex)
      this.suppressionConjointPersonneDisposantForm.get('id')?.setValue(this.conjointsPersonneDisposant(mutationIndex, groupeHeritiersIndex).at(index).get('id')?.value)

      this.openSuppressionConjointPersonneDisposantModal()
    }
    else {
      this.removeConjointPersonneDisposantAtIndex(mutationIndex, groupeHeritiersIndex, index)
    }
  }

  private removeConjointPersonneDisposantAtIndex(mutationIndex: number, groupeHeritiersIndex: number, index: number): void {
    this.conjointsPersonneDisposant(mutationIndex, groupeHeritiersIndex).removeAt(index)
  }


  addPersonneHeritiere(mutationIndex: number, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, removeIds: boolean, value?: PersonneHeritiere, conjointPersonneDisposantFormGroup?: FormGroup): void {
    this.proprietairesSuccessifs(mutationIndex).markAllAsTouched()

    if (this.proprietairesSuccessifs(mutationIndex).valid) {
      // if (this.conjointsPersonneDisposant(mutationIndex, groupeHeritiersIndex).at(conjointPersonneDisposantIndex).valid) {
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
        this.personnesHeritieres(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex).push(personneHeritiereFormGroup)
      }
      else {
        (conjointPersonneDisposantFormGroup.get('personnesHeritieres') as FormArray).push(personneHeritiereFormGroup)

        // Initialiser les représentants
        if (value?.personnePhysique?.representants && value?.personnePhysique?.representants?.length > 0) {
          value?.personnePhysique?.representants.forEach((representant: RepresentantPersonnePhysique) => {
            this.addRepresentantPersonneHeritiere(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex, NaN, removeIds, representant, personneHeritiereFormGroup)
          })
        }
      }
      // }
    }
  }

  removePersonneHeritiere(mutationIndex: number, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionPersonneHeritiereForm.get('index')?.setValue(index)
      this.suppressionPersonneHeritiereForm.get('groupeHeritiersIndex')?.setValue(groupeHeritiersIndex)
      this.suppressionPersonneHeritiereForm.get('conjointPersonneDisposantIndex')?.setValue(conjointPersonneDisposantIndex)
      this.suppressionPersonneHeritiereForm.get('id')?.setValue(this.personnesHeritieres(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex).at(index).get('id')?.value)
      this.suppressionPersonneHeritiereForm.get('mutationIndex')?.setValue(mutationIndex)

      this.openSuppressionPersonneHeritiereModal()
    }
    else {
      this.removePersonneHeritiereAtIndex(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex, index)
    }
  }

  private removePersonneHeritiereAtIndex(mutationIndex: number, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, index: number): void {
    this.personnesHeritieres(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex).removeAt(index)
  }

  addRepresentantPersonneHeritiere(mutationIndex: number, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number, removeIds: boolean, value?: RepresentantPersonnePhysique, personneHeritiereFormGroup?: FormGroup): void {
    // console.log(this.representantsPersonneHeritiere(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).valid)
    this.proprietairesSuccessifs(mutationIndex).markAllAsTouched()

    if (this.proprietairesSuccessifs(mutationIndex).valid) {
      // if (this.representantsPersonneHeritiere(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).valid) {
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
        this.representantsPersonneHeritiere(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).push(representantPersonneHeritiereFormGroup)
      }
      else {
        (personneHeritiereFormGroup.get('personnePhysique')!.get('representants') as FormArray).push(representantPersonneHeritiereFormGroup)
      }
      // }
    }
  }

  removeRepresentantPersonneHeritiere(mutationIndex: number, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number, index: number): void {
    if (this.progressionTacheIndexation) {
      this.suppressionRepresentantPersonneHeritiereForm.get('index')?.setValue(index)
      this.suppressionRepresentantPersonneHeritiereForm.get('groupeHeritiersIndex')?.setValue(groupeHeritiersIndex)
      this.suppressionRepresentantPersonneHeritiereForm.get('conjointPersonneDisposantIndex')?.setValue(conjointPersonneDisposantIndex)
      this.suppressionRepresentantPersonneHeritiereForm.get('personneHeritiereIndex')?.setValue(personneHeritiereIndex)
      this.suppressionRepresentantPersonneHeritiereForm.get('id')?.setValue(this.representantsPersonneHeritiere(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).at(index).get('id')?.value)
      this.suppressionRepresentantPersonneHeritiereForm.get('mutationIndex')?.setValue(mutationIndex)

      this.openSuppressionRepresentantPersonneHeritiereModal()
    }
    else {
      this.removeRepresentantPersonneHeritiereAtIndex(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex, index)
    }
  }

  private removeRepresentantPersonneHeritiereAtIndex(mutationIndex: number, groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number, index: number): void {
    this.representantsPersonneHeritiere(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).removeAt(index)
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
