import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { CategoriesPartiePrenante } from '../../../../../data/enums/CategoriesPartiePrenante';
import { StatutsTitreFoncier } from '../../../../../data/enums/StatutsTitreFoncier';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';
import { ProcessusCreationTitreFoncier } from '../../../../../data/enums/ProcessusCreationTitreFoncier';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { Canton } from '../../../../../data/modules/commun/models/Canton';
import { Civilite } from '../../../../../data/modules/commun/models/Civilite';
import { Commune } from '../../../../../data/modules/commun/models/Commune';
import { FormeJuridique } from '../../../../../data/modules/commun/models/FormeJuridique';
import { Nationalite } from '../../../../../data/modules/commun/models/Nationalite';
import { Prefecture } from '../../../../../data/modules/commun/models/Prefecture';
import { Profession } from '../../../../../data/modules/commun/models/Profession';
import { Quartier } from '../../../../../data/modules/commun/models/Quartier';
import { Region } from '../../../../../data/modules/commun/models/Region';
import { SecteurActivite } from '../../../../../data/modules/commun/models/SecteurActivite';
import { TypeLienGroupe } from '../../../../../data/modules/commun/models/TypeLienGroupe';
import { TypePersonneMorale } from '../../../../../data/modules/commun/models/TypePersonneMorale';
import { TypeRelationLegale } from '../../../../../data/modules/commun/models/TypeRelationLegale';
import { Village } from '../../../../../data/modules/commun/models/Village';
import { Ville } from '../../../../../data/modules/commun/models/Ville';
import { CantonService } from '../../../../../data/modules/commun/services/canton.service';
import { CiviliteService } from '../../../../../data/modules/commun/services/civilite.service';
import { CommuneService } from '../../../../../data/modules/commun/services/commune.service';
import { FormeJuridiqueService } from '../../../../../data/modules/commun/services/forme-juridique.service';
import { NationaliteService } from '../../../../../data/modules/commun/services/nationalite.service';
import { PrefectureService } from '../../../../../data/modules/commun/services/prefecture.service';
import { ProfessionService } from '../../../../../data/modules/commun/services/profession.service';
import { QuartierService } from '../../../../../data/modules/commun/services/quartier.service';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';
import { SecteurActiviteService } from '../../../../../data/modules/commun/services/secteur-activite.service';
import { TypeLienGroupeService } from '../../../../../data/modules/commun/services/type-lien-groupe.service';
import { TypePersonneMoraleService } from '../../../../../data/modules/commun/services/type-personne-morale.service';
import { TypeRelationLegaleService } from '../../../../../data/modules/commun/services/type-relation-legale.service';
import { VillageService } from '../../../../../data/modules/commun/services/village.service';
import { VilleService } from '../../../../../data/modules/commun/services/ville.service';
import { Augmentation } from '../../../../../data/modules/gestion-dossiers/models/Augmentation';
import { CauseIndisponibilite } from '../../../../../data/modules/gestion-dossiers/models/CauseIndisponibilite';
import { ConjointPersonneDisposant } from '../../../../../data/modules/gestion-dossiers/models/ConjointPersonneDisposant';
import { Diminution } from '../../../../../data/modules/gestion-dossiers/models/Diminution';
import { DirectionLimite } from '../../../../../data/modules/gestion-dossiers/models/DirectionLimite';
import { DroitReelConstitueParDenombrement } from '../../../../../data/modules/gestion-dossiers/models/DroitReelConstitueParDenombrement';
import { Limite } from '../../../../../data/modules/gestion-dossiers/models/Limite';
import { ModeAcquisition } from '../../../../../data/modules/gestion-dossiers/models/ModeAcquisition';
import { ModeAlienation } from '../../../../../data/modules/gestion-dossiers/models/ModeAlienation';
import { Mutation } from '../../../../../data/modules/gestion-dossiers/models/Mutation';
import { OppositionCasInscriptionDifferee } from '../../../../../data/modules/gestion-dossiers/models/OppositionCasInscriptionDifferee';
import { PartiePrenante } from '../../../../../data/modules/gestion-dossiers/models/PartiePrenante';
import { PersonneConjointe } from '../../../../../data/modules/gestion-dossiers/models/PersonneConjointe';
import { PersonneHeritiere } from '../../../../../data/modules/gestion-dossiers/models/PersonneHeritiere';
import { PersonneMembre } from '../../../../../data/modules/gestion-dossiers/models/PersonneMembre';
import { PrivilegeHypotheque } from '../../../../../data/modules/gestion-dossiers/models/PrivilegeHypotheque';
import { RepresentantPersonneMorale } from '../../../../../data/modules/gestion-dossiers/models/RepresentantPersonneMorale';
import { RepresentantPersonnePhysique } from '../../../../../data/modules/gestion-dossiers/models/RepresentantPersonnePhysique';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { DirectionLimiteService } from '../../../../../data/modules/gestion-dossiers/services/direction-limite.service';
import { ModeAcquisitionService } from '../../../../../data/modules/gestion-dossiers/services/mode-acquisition.service';
import { ModeAlienationService } from '../../../../../data/modules/gestion-dossiers/services/mode-alienation.service';
import { TitreFoncierService } from '../../../../../data/modules/gestion-dossiers/services/titre-foncier.service';
import { ContenanceUtils } from '../../../../../data/utils/ContenanceUtils';
import { Router } from '@angular/router';
import { PartiePrenanteUtils } from '../../../../../data/utils/PartiePrenanteUtils';
import { SituationFiscale } from '../../../../../data/modules/gestion-dossiers/models/SituationFiscale';
import { DivisionEnVolume } from '../../../../../data/modules/gestion-dossiers/models/DivisionEnVolume';
import { DivisionEnLot } from '../../../../../data/modules/gestion-dossiers/models/DivisionEnLot';
import { CustomMapType } from '../../../../../data/utils/FiltresDonneesUtils';
import { Utilisateur } from '../../../../../data/modules/auth/models/Utilisateur';
import { AuthenticatedUserService } from '../../../../../core/services/authenticated-user.service';
import { CentreConservationFonciereService } from '../../../../../data/modules/auth/services/centre-conservation-fonciere.service';
import { DossierRegistreService } from '../../../../../data/modules/gestion-dossiers/services/dossier-registre.service';
import { delay } from 'rxjs';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { CentreConservationFonciere } from '../../../../../data/modules/auth/models/CentreConservationFonciere';
import { DossierRegistre } from '../../../../../data/modules/gestion-dossiers/models/DossierRegistre';

@Component({
  selector: 'app-nouveau-titre-foncier-page',
  templateUrl: './nouveau-titre-foncier-page.component.html',
  styleUrl: './nouveau-titre-foncier-page.component.scss'
})
export class NouveauTitreFoncierPageComponent {

  nouveauTitreFoncierForm: FormGroup = new FormGroup({
    statut: new FormControl(StatutsTitreFoncier.VALIDE, [Validators.required]),
    informationsStatut: new FormControl(null, []),
    // numeroPrefixe: new FormControl(null, []),
    // numero: new FormControl(null, [Validators.required]),
    // numeroSuffixe: new FormControl(null, []),
    // numeroTitreFoncier: new FormControl(null, [Validators.required]),
    processusCreation: new FormControl(null, [Validators.required]),
    numeroRequisition: new FormControl(null, []),
    numeroTitreFoncierMorcelle: new FormControl(null, []),
    oppositionsCasInscriptionDifferee: new FormArray([]),
    natureConsistanceImmeuble: new FormControl(null, [Validators.required]),
    contenanceEnHectare: new FormControl(null, [Validators.required]),
    contenanceEnAre: new FormControl(null, [Validators.required]),
    contenanceEnCentiare: new FormControl(null, [Validators.required]),
    nupParcelleAssise: new FormControl(null, []),
    titreParcelleAssise: new FormControl(null, []),
    numeroLot: new FormControl(null, []),
    numeroVolume: new FormControl(null, []),
    affectation: new FormControl(null, []),
    modificationDescription: new FormControl(null, []),
    descriptionPartiesCommunes: new FormControl(null, []),
    situationPropriete: new FormGroup({
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
    situationsFiscales: new FormArray([]),
    augmentations: new FormArray([]),
    diminutions: new FormArray([]),
    divisionsEnVolumes: new FormArray([]),
    divisionsEnLots: new FormArray([]),
    droitsReelsConstituesParDenombrement: new FormArray([]),
    causesIndisponibilite: new FormArray([]),
    mutations: new FormArray([]),
    privilegesHypotheques: new FormArray([]),
    acteRegistre: new FormGroup({
      dossierRegistreId: new FormControl(null, [Validators.required]),
      typeRegistreId: new FormControl(null, [Validators.required]),
      regionId: new FormControl(null, [Validators.required]),
      centreConservationFonciereId: new FormControl(null, [Validators.required]),
    }),
  })

  utilisateurDemande?: Utilisateur

  get oppositionsCasInscriptionDifferee() {
    return this.nouveauTitreFoncierForm.controls['oppositionsCasInscriptionDifferee'] as FormArray
  }

  get limitesTitreFoncier() {
    return this.nouveauTitreFoncierForm.controls['limitesTitreFoncier'] as FormArray
  }

  get situationsFiscales() {
    return this.nouveauTitreFoncierForm.controls['situationsFiscales'] as FormArray
  }

  get augmentations() {
    return this.nouveauTitreFoncierForm.controls['augmentations'] as FormArray
  }

  get diminutions() {
    return this.nouveauTitreFoncierForm.controls['diminutions'] as FormArray
  }

  get divisionsEnVolumes() {
    return this.nouveauTitreFoncierForm.controls['divisionsEnVolumes'] as FormArray
  }

  get divisionsEnLots() {
    return this.nouveauTitreFoncierForm.controls['divisionsEnLots'] as FormArray
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

  readonly ProcessusCreationTitreFoncier = ProcessusCreationTitreFoncier

  constructor(
    private router: Router,
    private authenticatedUserService: AuthenticatedUserService,
    private titreFoncierService: TitreFoncierService,
    private notificationsHandlerService: NotificationsHandlerService,
    private modeAcquisitionService: ModeAcquisitionService,
    private modeAlienationService: ModeAlienationService,
    private directionLimiteService: DirectionLimiteService,

    // Registre + Acte
    private dossierRegistreService: DossierRegistreService,
    // Centre
    private centreConservationFonciereService: CentreConservationFonciereService,
    // Situation
    private regionService: RegionService,
    private prefectureService: PrefectureService,
    private communeService: CommuneService,
    private cantonService: CantonService,
    private villageService: VillageService,
    private villeService: VilleService,
    private quartierService: QuartierService,
    // Parties prenantes
    private formeJuridiqueService: FormeJuridiqueService,
    private typePersonneMoraleService: TypePersonneMoraleService,
    private typeRelationLegaleService: TypeRelationLegaleService,
    private typeLienGroupeService: TypeLienGroupeService,
    private civiliteService: CiviliteService,
    private nationaliteService: NationaliteService,
    private professionService: ProfessionService,
    private secteurActiviteService: SecteurActiviteService,
  ) {
    this.getCentresConservationFonciere()
    this.nouveauTitreFoncierForm.get('acteRegistre')!.get('typeRegistreId')?.setValue(TypesRegistre.TITRES_FONCIERS)
  }

  ngOnInit(): void {
    this.authenticatedUserService.utilisateur
      .pipe(delay(0))
      .subscribe({
        next: (value: Utilisateur | null) => {
          if (value != null) {
            this.utilisateurDemande = value

            console.log(this.utilisateurDemande.centreConservationFonciere?.id)
            this.nouveauTitreFoncierForm.get('acteRegistre')!.get('centreConservationFonciereId')?.setValue(this.utilisateurDemande.centreConservationFonciere?.id)
          }
        }
      })

    this.onProcessusCreationTitreFoncierChange()
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

      case ProcessusCreationTitreFoncier.COPROPRIETE:
        this.nouveauTitreFoncierForm.controls['numeroRequisition'].setValidators([])
        this.nouveauTitreFoncierForm.controls['numeroRequisition'].updateValueAndValidity()
        this.nouveauTitreFoncierForm.controls['numeroTitreFoncierMorcelle'].setValidators([])
        this.nouveauTitreFoncierForm.controls['numeroTitreFoncierMorcelle'].updateValueAndValidity()
        break;

      default:
        break;
    }
  }

  validerCreationTitreFoncier(): void {
    // console.log(this.nouveauTitreFoncierForm.value)

    this.nouveauTitreFoncierForm.markAllAsTouched()
    if (this.nouveauTitreFoncierForm.valid) {
      if (this.mutations.length >= 1) {
        let titreFoncier: TitreFoncier = new TitreFoncier()
        titreFoncier = this.nouveauTitreFoncierForm.value
        if (titreFoncier.mutations) {
          for (let index = 0; index < titreFoncier.mutations.length; index++) {
            const mutationFormGroup: FormGroup = (this.mutations.controls as FormGroup[])[index];
            // console.log(index, mutationFormGroup.value.proprietairesSuccessifs, this.getPartiesPrenantes(removeIds, mutationFormGroup))
            titreFoncier.mutations[index].partiesPrenantes = this.getPartiesPrenantes(true, mutationFormGroup)
          }
        }

        this.titreFoncierService.create(titreFoncier)
          .subscribe({
            next: (value: TitreFoncier) => {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce titre foncier a été créé avec succès' })
              this.router.navigate(['/dossiers/titres-fonciers', value.id])
            },
            error: (err: HttpErrorResponse) => {
              console.log(err)
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de ce titre foncier' })
            },
          })
      }
      else {
        this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Il faut au moins une mutation' })
      }
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Certains champs ne sont pas valides' })
    }
  }

  annulerCreationTitreFoncier(): void {
    this.router.navigate(['/dossiers/titres-fonciers'])
  }

  // Registre + Acte
  dossiersRegistres: DossierRegistre[] = []
  getDossiersRegistres(estRegistre: boolean = true): void {
    const filtres: CustomMapType = { estRegistre: '' + estRegistre }

    this.dossierRegistreService.getAllData(TypesRegistre.TITRES_FONCIERS, undefined, filtres)
      .subscribe({
        next: (value: DossierRegistre[]) => {
          // console.log(value)
          this.dossiersRegistres = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des registres' })
        }
      })
  }

  // Centres
  centresConservationFonciere: CentreConservationFonciere[] = []
  getCentresConservationFonciere(): void {
    this.centreConservationFonciereService.getAllData()
      .subscribe({
        next: (value: CentreConservationFonciere[]) => {
          // console.log(value)
          this.centresConservationFonciere = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des centres de conservation foncière' })
        }
      })
  }

  // Situation
  onRegionChange(selectedRegionId?: string): void {
    // this.getProchainNumeroTitreFoncier(selectedRegionId)

    if (selectedRegionId) {
      this.nouveauTitreFoncierForm.get('situationPropriete')!.get('regionId')!.setValue(selectedRegionId)
    }
    else {
      this.nouveauTitreFoncierForm.get('situationPropriete')!.get('regionId')!.setValue(null)
    }
  }

  getRegions(actuelle: boolean): void {
    const filtres: CustomMapType = {
      'actuelle': actuelle.toString()
    }

    this.regionService.getAllData(filtres)
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

      this.oppositionsCasInscriptionDifferee.push(oppositionCasInscriptionDiffereeFormGroup)
    }
  }

  removeOppositionCasInscriptionDifferee(index: number): void {
    this.oppositionsCasInscriptionDifferee.removeAt(index)
  }

  addLimiteTitreFoncier(removeIds: boolean, value?: Limite): void {
    this.limitesTitreFoncier.markAllAsTouched()

    // console.log("Limte validddddd: ", this.limitesTitreFoncier.valid, this.limitesTitreFoncier.length, this.limitesTitreFoncier.controls.length)
    if (this.limitesTitreFoncier.valid) {
      let limiteTitreFoncierFormGroup: FormGroup = new FormGroup({
        directionLimiteId: new FormControl(value ? value.directionLimiteId : null, [Validators.required]),
        limitrophe: new FormControl(value ? value.limitrophe : null, [Validators.required]),
      })

      if (!removeIds) {
        limiteTitreFoncierFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      this.limitesTitreFoncier.push(limiteTitreFoncierFormGroup)
    }
  }

  removeLimiteTitreFoncier(index: number): void {
    this.limitesTitreFoncier.removeAt(index)
  }

  addSituationFiscale(removeIds: boolean, value?: SituationFiscale): void {
    this.situationsFiscales.markAllAsTouched()

    if (this.situationsFiscales.valid) {
      let situationFiscaleFormGroup: FormGroup = new FormGroup({
        annee: new FormControl(value ? value.annee : null, [Validators.required]),
        valeurVenale: new FormControl(value ? value.valeurVenale : null, [Validators.required]),
        valeurLocative: new FormControl(value ? value.valeurLocative : null, [Validators.required]),
        exoneration: new FormControl(value ? value.exoneration : null, [Validators.required]),
        taxeLiquidee: new FormControl(value ? value.taxeLiquidee : null, [Validators.required]),
        taxePayee: new FormControl(value ? value.taxePayee : null, [Validators.required]),
        taxeRestanteDue: new FormControl(value ? value.taxeRestanteDue : null, [Validators.required]),
      })

      if (!removeIds) {
        situationFiscaleFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      this.situationsFiscales.push(situationFiscaleFormGroup)
    }
  }

  removeSituationFiscale(index: number): void {
    this.situationsFiscales.removeAt(index)
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

      this.augmentations.push(augmentationFormGroup)
    }
  }

  removeAugmentation(index: number): void {
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

      this.diminutions.push(diminutionFormGroup)
    }
  }

  removeDiminution(index: number): void {
    this.diminutions.removeAt(index)
  }

  addDivisionEnVolume(removeIds: boolean, value?: DivisionEnVolume): void {
    this.divisionsEnVolumes.markAllAsTouched()

    if (this.divisionsEnVolumes.valid) {
      let divisionEnVolumeFormGroup: FormGroup = new FormGroup({
        numeroVolume: new FormControl(value ? value.numeroVolume : null, [Validators.required]),
        situationBatiment: new FormControl(value ? value.situationBatiment : null, [Validators.required]),
        situationNiveau: new FormControl(value ? value.situationNiveau : null, [Validators.required]),
        natureDescription: new FormControl(value ? value.natureDescription : null, [Validators.required]),
        affectation: new FormControl(value ? value.affectation : null, [Validators.required]),
        contenance: new FormControl(value ? value.contenance : null, [Validators.required]),
        valeurVolume: new FormControl(value ? value.valeurVolume : null, [Validators.required]),
        mutationTitreFoncier: new FormControl(value ? value.mutationTitreFoncier : null, [Validators.required]),
        extinctionVolume: new FormControl(value ? value.extinctionVolume : null, [Validators.required]),
        modeAlienationId: new FormControl(value ? value.modeAlienationId : null, [Validators.required]),
      })

      if (!removeIds) {
        divisionEnVolumeFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      this.divisionsEnVolumes.push(divisionEnVolumeFormGroup)
    }
  }

  removeDivisionEnVolume(index: number): void {
    this.divisionsEnVolumes.removeAt(index)
  }

  addDivisionEnLot(removeIds: boolean, value?: DivisionEnLot): void {
    this.divisionsEnLots.markAllAsTouched()

    if (this.divisionsEnLots.valid) {
      let divisionEnLotFormGroup: FormGroup = new FormGroup({
        numeroLotOuVolume: new FormControl(value ? value.numeroLotOuVolume : null, [Validators.required]),
        situationBatiment: new FormControl(value ? value.situationBatiment : null, [Validators.required]),
        situationNiveau: new FormControl(value ? value.situationNiveau : null, [Validators.required]),
        natureDescription: new FormControl(value ? value.natureDescription : null, [Validators.required]),
        affectation: new FormControl(value ? value.affectation : null, [Validators.required]),
        contenance: new FormControl(value ? value.contenance : null, [Validators.required]),
        quotePartPartiesCommunes: new FormControl(value ? value.quotePartPartiesCommunes : null, [Validators.required]),
        valeurLot: new FormControl(value ? value.valeurLot : null, [Validators.required]),
        mutationTitreFoncier: new FormControl(value ? value.mutationTitreFoncier : null, [Validators.required]),
        extinctionLot: new FormControl(value ? value.extinctionLot : null, [Validators.required]),
        modeAlienationId: new FormControl(value ? value.modeAlienationId : null, [Validators.required]),
      })

      if (!removeIds) {
        divisionEnLotFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      this.divisionsEnLots.push(divisionEnLotFormGroup)
    }
  }

  removeDivisionEnLot(index: number): void {
    this.divisionsEnLots.removeAt(index)
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

      this.droitsReelsConstituesParDenombrement.push(droitReelConstitueParDenombrementFormGroup)
    }
  }

  removeDroitReelConstitueParDenombrement(index: number): void {
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

      this.causesIndisponibilite.push(causeIndisponibiliteFormGroup)
    }
  }

  removeCauseIndisponibilite(index: number): void {
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

      this.mutations.push(mutationFormGroup)
    }
  }

  removeMutation(index: number): void {
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

      this.privilegesHypotheques.push(privilegeHypothequeFormGroup)
    }
  }

  removePrivilegeHypotheque(index: number): void {
    this.privilegesHypotheques.removeAt(index)
  }

  // Parties Prenantes
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

      if (!mutationFormGroup) {
        this.proprietairesSuccessifs(mutationIndex).push(partiePrenanteFormGroup)
      }
      else {
        (mutationFormGroup.get('proprietairesSuccessifs') as FormArray).push(partiePrenanteFormGroup)
      }

    }
  }

  removePartiePrenante(mutationIndex: number, index: number): void {
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
    this.representantsPersonneHeritiere(mutationIndex, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).removeAt(index)
  }

}
