import { Component, OnInit } from '@angular/core';
import { FormalitePrealableService } from '../../../../../data/modules/gestion-dossiers/services/formalite-prealable.service';
import { FormalitePrealable } from '../../../../../data/modules/gestion-dossiers/models/FormalitePrealable';
import { HttpErrorResponse } from '@angular/common/http';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { StatutsFormalitePrealable } from '../../../../../data/enums/StatutsFormalitePrealable';
import { CategoriesPartiePrenante } from '../../../../../data/enums/CategoriesPartiePrenante';
import { CantonService } from '../../../../../data/modules/commun/services/canton.service';
import { CommuneService } from '../../../../../data/modules/commun/services/commune.service';
import { PeriodeService } from '../../../../../data/modules/commun/services/periode.service';
import { PrefectureService } from '../../../../../data/modules/commun/services/prefecture.service';
import { QuartierService } from '../../../../../data/modules/commun/services/quartier.service';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';
import { VillageService } from '../../../../../data/modules/commun/services/village.service';
import { VilleService } from '../../../../../data/modules/commun/services/ville.service';
import { NatureEtatImmeubleService } from '../../../../../data/modules/gestion-dossiers/services/nature-etat-immeuble.service';
import { NatureTypeImmeubleService } from '../../../../../data/modules/gestion-dossiers/services/nature-type-immeuble.service';
import { NatureEtatImmeuble } from '../../../../../data/modules/gestion-dossiers/models/NatureEtatImmeuble';
import { NatureTypeImmeuble } from '../../../../../data/modules/gestion-dossiers/models/NatureTypeImmeuble';
import { DossierRegistre } from '../../../../../data/modules/gestion-dossiers/models/DossierRegistre';
import { DossierRegistreService } from '../../../../../data/modules/gestion-dossiers/services/dossier-registre.service';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { Canton } from '../../../../../data/modules/commun/models/Canton';
import { Commune } from '../../../../../data/modules/commun/models/Commune';
import { Prefecture } from '../../../../../data/modules/commun/models/Prefecture';
import { Quartier } from '../../../../../data/modules/commun/models/Quartier';
import { Region } from '../../../../../data/modules/commun/models/Region';
import { Village } from '../../../../../data/modules/commun/models/Village';
import { Ville } from '../../../../../data/modules/commun/models/Ville';
import { CentreConservationFonciere } from '../../../../../data/modules/auth/models/CentreConservationFonciere';
import { CentreConservationFonciereService } from '../../../../../data/modules/auth/services/centre-conservation-fonciere.service';
import { environment } from '../../../../../../environments/environment';
import { Civilite } from '../../../../../data/modules/commun/models/Civilite';
import { FormeJuridique } from '../../../../../data/modules/commun/models/FormeJuridique';
import { Nationalite } from '../../../../../data/modules/commun/models/Nationalite';
import { Profession } from '../../../../../data/modules/commun/models/Profession';
import { SecteurActivite } from '../../../../../data/modules/commun/models/SecteurActivite';
import { TypeLienGroupe } from '../../../../../data/modules/commun/models/TypeLienGroupe';
import { TypePersonneMorale } from '../../../../../data/modules/commun/models/TypePersonneMorale';
import { TypeRelationLegale } from '../../../../../data/modules/commun/models/TypeRelationLegale';
import { CiviliteService } from '../../../../../data/modules/commun/services/civilite.service';
import { FormeJuridiqueService } from '../../../../../data/modules/commun/services/forme-juridique.service';
import { NationaliteService } from '../../../../../data/modules/commun/services/nationalite.service';
import { ProfessionService } from '../../../../../data/modules/commun/services/profession.service';
import { SecteurActiviteService } from '../../../../../data/modules/commun/services/secteur-activite.service';
import { TypeLienGroupeService } from '../../../../../data/modules/commun/services/type-lien-groupe.service';
import { TypePersonneMoraleService } from '../../../../../data/modules/commun/services/type-personne-morale.service';
import { TypeRelationLegaleService } from '../../../../../data/modules/commun/services/type-relation-legale.service';
import { PartiePrenanteUtils } from '../../../../../data/utils/PartiePrenanteUtils';
import { ConjointPersonneDisposant } from '../../../../../data/modules/gestion-dossiers/models/ConjointPersonneDisposant';
import { PartiePrenante } from '../../../../../data/modules/gestion-dossiers/models/PartiePrenante';
import { PersonneConjointe } from '../../../../../data/modules/gestion-dossiers/models/PersonneConjointe';
import { PersonneHeritiere } from '../../../../../data/modules/gestion-dossiers/models/PersonneHeritiere';
import { PersonneMembre } from '../../../../../data/modules/gestion-dossiers/models/PersonneMembre';
import { RepresentantPersonneMorale } from '../../../../../data/modules/gestion-dossiers/models/RepresentantPersonneMorale';
import { RepresentantPersonnePhysique } from '../../../../../data/modules/gestion-dossiers/models/RepresentantPersonnePhysique';

@Component({
  selector: 'app-liste-formalites-prealables-page',
  templateUrl: './liste-formalites-prealables-page.component.html',
  styleUrl: './liste-formalites-prealables-page.component.scss'
})
export class ListeFormalitesPrealablesPageComponent implements OnInit {

  listeFormalitesPrealables: PagingData<FormalitePrealable> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  filtresListeFormalitesPrealablesForm: FormGroup = new FormGroup({
    creatDebut: new FormControl(null, []),
    creatFin: new FormControl(null, []),
    registre: new FormControl(null, []),
    centre: new FormControl(null, []),
    folio: new FormControl(null, []),
    requisition: new FormControl(null, []),
    type: new FormControl(null, []),
    etat: new FormControl(null, []),
    statut: new FormControl(null, []),
    region: new FormControl(null, []),
    prefecture: new FormControl(null, []),
    commune: new FormControl(null, []),
    canton: new FormControl(null, []),
    village: new FormControl(null, []),
    ville: new FormControl(null, []),
    quartier: new FormControl(null, []),
    lieudit: new FormControl(null, []),
    rue: new FormControl(null, []),
    partiesPrenantes: new FormArray([]),
    // partiesPrenantes: PartiePrenanteUtils.getInstance().getPartiePrenateFilterFormGroup(),

    masquerFiltresListeFormalitesPrealables: new FormControl(true, []),
    masquerFiltresPartiesPrenantesListeFormalitesPrealables: new FormControl(false, []),
  })

  readonly typesPartiePrenante = TypesPartiePrenante
  readonly categoriesPartiePrenante = CategoriesPartiePrenante
  readonly statutsFormalitePrealable = StatutsFormalitePrealable

  categoriesPartie = [
    { id: CategoriesPartiePrenante.PERSONNE_PHYSIQUE, libelle: "Personne physique" },
    { id: CategoriesPartiePrenante.PERSONNE_MORALE, libelle: "Personne morale" },
    { id: CategoriesPartiePrenante.PERSONNE_RELATION_LEGALE, libelle: "Relation légale" },
    { id: CategoriesPartiePrenante.GROUPE_PERSONNE_PHYSIQUE, libelle: "Indivisaires" },
    { id: CategoriesPartiePrenante.GROUPE_CONJOINTS, libelle: "Conjoints" },
    { id: CategoriesPartiePrenante.GROUPE_HERITIERS, libelle: "Groupe d'héritiers" },
  ]

  status = [
    { id: StatutsFormalitePrealable.A_VALIDER, libelle: 'A valider' },
    { id: StatutsFormalitePrealable.VALIDEE, libelle: 'Validée' },
    { id: StatutsFormalitePrealable.REJETEE, libelle: 'Rejetée' },
    { id: StatutsFormalitePrealable.ANNULEE, libelle: 'Annulée' },
    { id: StatutsFormalitePrealable.SUSPENDUE, libelle: 'Suspendue' },
  ]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formalitePrealableService: FormalitePrealableService,
    private notificationsHandlerService: NotificationsHandlerService,
    // Informations
    private natureTypeImmeubleService: NatureTypeImmeubleService,
    private natureEtatImmeubleService: NatureEtatImmeubleService,
    // Situation
    private regionService: RegionService,
    private prefectureService: PrefectureService,
    private communeService: CommuneService,
    private cantonService: CantonService,
    private villageService: VillageService,
    private villeService: VilleService,
    private quartierService: QuartierService,
    // Registre + Acte
    private dossierRegistreService: DossierRegistreService,
    // Centre
    private centreConservationFonciereService: CentreConservationFonciereService,
    // Parties prenantes
    private formeJuridiqueService: FormeJuridiqueService,
    private typePersonneMoraleService: TypePersonneMoraleService,
    private typeRelationLegaleService: TypeRelationLegaleService,
    private typeLienGroupeService: TypeLienGroupeService,
    private civiliteService: CiviliteService,
    private nationaliteService: NationaliteService,
    private professionService: ProfessionService,
    private secteurActiviteService: SecteurActiviteService
  ) {
    this.activatedRoute.queryParams
      .subscribe((queryParams) => {
        console.log("Query Param changing: ", queryParams["registre"])

        let dossierRegistreId: string | null = queryParams["registre"]
        if (dossierRegistreId) {
          this.getDossiersRegistres()
          this.filtresListeFormalitesPrealablesForm.get('registre')!.setValue(dossierRegistreId)
          console.log(dossierRegistreId, this.filtresListeFormalitesPrealablesForm.get('registre')!.value)
        }

        this.filtrerListeFormalitesPrealables()
      })
  }

  ngOnInit(): void {
  }

  getFormalitesPrealables(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerFiltres(this.filtresListeFormalitesPrealablesForm.value)

    this.formalitePrealableService.filterAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<FormalitePrealable>) => {
          // console.log(value)
          this.listeFormalitesPrealables = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des formalités préalables' })
        }
      })
  }

  filtrerListeFormalitesPrealables(): void {
    // console.log(this.filtresListeFormalitesPrealablesForm.value)
    this.getFormalitesPrealables({ page: this.listeFormalitesPrealables.currentPage, paginationSize: this.listeFormalitesPrealables.paginationSize! })
  }

  effacerFiltresListeFormalitesPrealables(): void {
    this.filtresListeFormalitesPrealablesForm.reset()

    this.filtrerListeFormalitesPrealables()
  }


  onDateDemandeDebut(): void {
    if (this.filtresListeFormalitesPrealablesForm.get('creatDebut')!.value == null || this.filtresListeFormalitesPrealablesForm.get('creatDebut')!.value == '') {
      this.filtresListeFormalitesPrealablesForm.get('creatFin')!.setValue(null)
      this.filtresListeFormalitesPrealablesForm.get('creatFin')!.disable({ emitEvent: false })
      this.filtresListeFormalitesPrealablesForm.get('creatFin')!.setValidators([])
      this.filtresListeFormalitesPrealablesForm.get('creatFin')!.updateValueAndValidity()
    }
    else {
      this.filtresListeFormalitesPrealablesForm.get('creatFin')!.enable({ emitEvent: false })
      this.filtresListeFormalitesPrealablesForm.get('creatFin')!.setValidators([Validators.required])
      this.filtresListeFormalitesPrealablesForm.get('creatFin')!.updateValueAndValidity()
    }
  }

  // Registre + Acte
  dossiersRegistres: DossierRegistre[] = []
  getDossiersRegistres(estRegistre: boolean = true): void {
    const filtres: CustomMapType = { estRegistre: '' + estRegistre }

    this.dossierRegistreService.getAllData(TypesRegistre.FORMALITES_PREALABLES, undefined, filtres)
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

  // Informations
  naturesTypesImmeuble: NatureTypeImmeuble[] = []
  naturesEtatsImmeuble: NatureEtatImmeuble[] = []

  getNaturesTypesImmeuble(): void {
    this.natureTypeImmeubleService.getAllData()
      .subscribe({
        next: (value: NatureTypeImmeuble[]) => {
          // console.log(value)
          this.naturesTypesImmeuble = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des types d\'immeubles' })
        }
      })
  }

  getNaturesEtatsImmeuble(): void {
    this.natureEtatImmeubleService.getAllData()
      .subscribe({
        next: (value: NatureEtatImmeuble[]) => {
          // console.log(value)
          this.naturesEtatsImmeuble = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des etats d\'immeubles' })
        }
      })
  }

  // Situation
  regions: Region[] = []
  prefectures: Prefecture[] = []
  communes: Commune[] = []
  cantons: Canton[] = []
  villages: Village[] = []
  villes: Ville[] = []
  quartiers: Quartier[] = []

  getRegions(): void {
    this.regionService.getAllData()
      .subscribe({
        next: (value: Region[]) => {
          this.regions = value
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
          this.prefectures = value
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
          this.communes = value
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
          this.cantons = value
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
          this.villages = value
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
          this.villes = value
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
          this.quartiers = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des quartiers' })
        }
      })
  }

  // Filtres Parties prenantes
  partiesPrenantes(): FormArray {
      return this.filtresListeFormalitesPrealablesForm.controls['partiesPrenantes'] as FormArray
  }

  representantsPersonnePhysique(personnePhysiqueIndex: number): FormArray {
    return this.partiesPrenantes().at(personnePhysiqueIndex).get('representants') as FormArray
  }

  representantsPersonneMorale(personneMoraleIndex: number): FormArray {
    return this.partiesPrenantes().at(personneMoraleIndex).get('representants') as FormArray
  }

  personnesMembres(groupePersonnePhysiqueIndex: number): FormArray {
    return this.partiesPrenantes().at(groupePersonnePhysiqueIndex).get('personnesMembres') as FormArray
  }

  representantsPersonneMembre(groupePersonnePhysiqueIndex: number, personneMembreIndex: number): FormArray {
    return this.personnesMembres(groupePersonnePhysiqueIndex).at(personneMembreIndex).get('personnePhysique')!.get('representants') as FormArray
  }

  personnesConjointes(groupeConjointsIndex: number): FormArray {
    return this.partiesPrenantes().at(groupeConjointsIndex).get('personnesConjointes') as FormArray
  }

  representantsPersonneConjointe(groupeConjointsIndex: number, personneConjointeIndex: number): FormArray {
    return this.personnesConjointes(groupeConjointsIndex).at(personneConjointeIndex).get('personnePhysique')!.get('representants') as FormArray
  }

  conjointsPersonneDisposant(groupeHeritiersIndex: number): FormArray {
    return this.partiesPrenantes().at(groupeHeritiersIndex).get('conjointsPersonneDisposant') as FormArray
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

  // Utils
  // getPartiesPrenantes(removeIds: boolean = true): PartiePrenante[] {
  //   return PartiePrenanteUtils.getInstance().getPartiesPrenantesFromFormGroup(this.nouvelleFormalitePrealableForm, removeIds)
  // }

  addPartiePrenante(categorie: CategoriesPartiePrenante | null): void {
    this.partiesPrenantes().markAllAsTouched()

    console.log(categorie)

    if (this.partiesPrenantes().valid) {
      let partiePrenanteFormGroup: FormGroup

      switch (categorie) {
        case null:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, []),
            type: new FormControl(null, []),
            nom: new FormControl(null, []),
            prenoms: new FormControl(null, []),
            civiliteId: new FormControl(null, []),
            nationaliteId: new FormControl(null, []),
            professionId: new FormControl(null, []),
            nif: new FormControl(null, []),
          })
          break;

        case CategoriesPartiePrenante.PERSONNE_PHYSIQUE:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, []),
            type: new FormControl(null, []),
            nom: new FormControl(null, []),
            prenoms: new FormControl(null, []),
            telephone: new FormControl(null, []),
            adresseDomicile: new FormControl(null, []),
            adresseResidence: new FormControl(null, []),
            anneeNaissance: new FormControl(null, []),
            dateNaissance: new FormControl(null, []),
            lieuNaissance: new FormControl(null, []),
            nif: new FormControl(null, []),
            nomEpoux: new FormControl(null, []),
            nomJeuneFille: new FormControl(null, []),
            vivant: new FormControl(null, []),
            civiliteId: new FormControl(null, []),
            nationaliteId: new FormControl(null, []),
            professionId: new FormControl(null, []),
            representants: new FormArray([]),
          })
          break;

        case CategoriesPartiePrenante.PERSONNE_MORALE:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, []),
            type: new FormControl(null, []),
            raisonSocialeOuDenomination: new FormControl(null, []),
            formeJuridiqueId: new FormControl(null, []),
            typePersonneMoraleId: new FormControl(null, []),
            secteurActiviteId: new FormControl(null, []),
            adresse: new FormControl(null, []),
            telephone: new FormControl(null, []),
            representants: new FormArray([]),
          })
          break;

        case CategoriesPartiePrenante.PERSONNE_RELATION_LEGALE:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, []),
            type: new FormControl(null, []),
            typeRelationLegaleId: new FormControl(null, []),
            personneCible: new FormGroup({
              personnePhysique: new FormGroup({
                nom: new FormControl(null, []),
                prenoms: new FormControl(null, []),
                telephone: new FormControl(null, []),
                adresseDomicile: new FormControl(null, []),
                adresseResidence: new FormControl(null, []),
                anneeNaissance: new FormControl(null, []),
                dateNaissance: new FormControl(null, []),
                lieuNaissance: new FormControl(null, []),
                nif: new FormControl(null, []),
                nomEpoux: new FormControl(null, []),
                nomJeuneFille: new FormControl(null, []),
                vivant: new FormControl(null, []),
                civiliteId: new FormControl(null, []),
                nationaliteId: new FormControl(null, []),
                professionId: new FormControl(null, []),
              })
            })
          })
          break;

        case CategoriesPartiePrenante.GROUPE_PERSONNE_PHYSIQUE:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, []),
            type: new FormControl(null, []),
            typeLienGroupeId: new FormControl(null, []),
            personnesMembres: new FormArray([]),
          })
          break;

        case CategoriesPartiePrenante.GROUPE_CONJOINTS:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, []),
            type: new FormControl(null, []),
            personnesConjointes: new FormArray([]),
          })
          break;

        case CategoriesPartiePrenante.GROUPE_HERITIERS:
          partiePrenanteFormGroup = new FormGroup({
            categorie: new FormControl(categorie, []),
            type: new FormControl(null, []),
            termesSuccession: new FormControl(null, []),
            description: new FormControl(null, []),
            personneDisposant: new FormGroup({
              personnePhysique: new FormGroup({
                nom: new FormControl(null, []),
                prenoms: new FormControl(null, []),
                telephone: new FormControl(null, []),
                adresseDomicile: new FormControl(null, []),
                adresseResidence: new FormControl(null, []),
                anneeNaissance: new FormControl(null, []),
                dateNaissance: new FormControl(null, []),
                lieuNaissance: new FormControl(null, []),
                nif: new FormControl(null, []),
                nomEpoux: new FormControl(null, []),
                nomJeuneFille: new FormControl(null, []),
                vivant: new FormControl(null, []),
                civiliteId: new FormControl(null, []),
                nationaliteId: new FormControl(null, []),
                professionId: new FormControl(null, []),
              })
            }),
            conjointsPersonneDisposant: new FormArray([]),
          })
          break;
      }

      this.partiesPrenantes().push(partiePrenanteFormGroup)
    }
  }

  removePartiePrenante(index: number): void {
    this.partiesPrenantes().removeAt(index)
  }

  addPersonneMembre(groupePersonnePhysiqueIndex: number): void {
    this.partiesPrenantes().markAllAsTouched()

    if (this.partiesPrenantes().valid) {
      // if (this.partiesPrenantes().at(groupePersonnePhysiqueIndex).valid) {
      let personneMembreFormGroup: FormGroup = new FormGroup({
        personnePhysique: new FormGroup({
          nom: new FormControl(null, []),
          prenoms: new FormControl(null, []),
          telephone: new FormControl(null, []),
          adresseDomicile: new FormControl(null, []),
          adresseResidence: new FormControl(null, []),
          anneeNaissance: new FormControl(null, []),
          dateNaissance: new FormControl(null, []),
          lieuNaissance: new FormControl(null, []),
          nif: new FormControl(null, []),
          nomEpoux: new FormControl(null, []),
          nomJeuneFille: new FormControl(null, []),
          vivant: new FormControl(null, []),
          civiliteId: new FormControl(null, []),
          nationaliteId: new FormControl(null, []),
          professionId: new FormControl(null, []),
          representants: new FormArray([]),
        })
      })

      this.personnesMembres(groupePersonnePhysiqueIndex).push(personneMembreFormGroup)
    }
  }

  removePersonneMembre(groupePersonnePhysiqueIndex: number, index: number): void {
    this.personnesMembres(groupePersonnePhysiqueIndex).removeAt(index)
  }

  addRepresentantPersonnePhysique(personnePhysiqueIndex: number): void {
    // console.log(this.representantsPersonnePhysique(personnePhysiqueIndex).valid)
    this.partiesPrenantes().markAllAsTouched()

    if (this.partiesPrenantes().valid) {
      // if (this.representantsPersonnePhysique(personnePhysiqueIndex).valid) {
      let representantPersonnePhysiqueFormGroup: FormGroup = new FormGroup({
        representant: new FormGroup({
          nom: new FormControl(null, []),
          prenoms: new FormControl(null, []),
          telephone: new FormControl(null, []),
          adresseDomicile: new FormControl(null, []),
          adresseResidence: new FormControl(null, []),
          anneeNaissance: new FormControl(null, []),
          dateNaissance: new FormControl(null, []),
          lieuNaissance: new FormControl(null, []),
          nif: new FormControl(null, []),
          nomEpoux: new FormControl(null, []),
          nomJeuneFille: new FormControl(null, []),
          vivant: new FormControl(null, []),
          civiliteId: new FormControl(null, []),
          nationaliteId: new FormControl(null, []),
          professionId: new FormControl(null, []),
        })
      })

      this.representantsPersonnePhysique(personnePhysiqueIndex).push(representantPersonnePhysiqueFormGroup)
    }
  }

  removeRepresentantPersonnePhysique(personnePhysiqueIndex: number, index: number): void {
    this.representantsPersonnePhysique(personnePhysiqueIndex).removeAt(index)
  }

  addRepresentantPersonneMorale(personneMoraleIndex: number): void {
    this.partiesPrenantes().markAllAsTouched()

    if (this.partiesPrenantes().valid) {
      // console.log(this.representantsPersonneMorale(personneMoraleIndex).valid)
      // if (this.representantsPersonneMorale(personneMoraleIndex).valid) {
      let representantPersonneMoraleFormGroup: FormGroup = new FormGroup({
        representant: new FormGroup({
          nom: new FormControl(null, []),
          prenoms: new FormControl(null, []),
          telephone: new FormControl(null, []),
          adresseDomicile: new FormControl(null, []),
          adresseResidence: new FormControl(null, []),
          anneeNaissance: new FormControl(null, []),
          dateNaissance: new FormControl(null, []),
          lieuNaissance: new FormControl(null, []),
          nif: new FormControl(null, []),
          nomEpoux: new FormControl(null, []),
          nomJeuneFille: new FormControl(null, []),
          vivant: new FormControl(null, []),
          civiliteId: new FormControl(null, []),
          nationaliteId: new FormControl(null, []),
          professionId: new FormControl(null, []),
        })
      })

      this.representantsPersonneMorale(personneMoraleIndex).push(representantPersonneMoraleFormGroup)
    }
  }

  removeRepresentantPersonneMorale(personneMoraleIndex: number, index: number): void {
    this.representantsPersonneMorale(personneMoraleIndex).removeAt(index)
  }

  addPersonneConjointe(groupeConjointsIndex: number): void {
    this.partiesPrenantes().markAllAsTouched()

    if (this.partiesPrenantes().valid) {
      // if (this.partiesPrenantes().at(groupeConjointsIndex).valid) {
      let personneConjointeFormGroup: FormGroup = new FormGroup({
        personnePhysique: new FormGroup({
          nom: new FormControl(null, []),
          prenoms: new FormControl(null, []),
          telephone: new FormControl(null, []),
          adresseDomicile: new FormControl(null, []),
          adresseResidence: new FormControl(null, []),
          anneeNaissance: new FormControl(null, []),
          dateNaissance: new FormControl(null, []),
          lieuNaissance: new FormControl(null, []),
          nif: new FormControl(null, []),
          nomEpoux: new FormControl(null, []),
          nomJeuneFille: new FormControl(null, []),
          vivant: new FormControl(null, []),
          civiliteId: new FormControl(null, []),
          nationaliteId: new FormControl(null, []),
          professionId: new FormControl(null, []),
          representants: new FormArray([]),
        })
      })

      this.personnesConjointes(groupeConjointsIndex).push(personneConjointeFormGroup)
    }
  }

  removePersonneConjointe(groupeConjointsIndex: number, index: number): void {
    this.personnesConjointes(groupeConjointsIndex).removeAt(index)
  }

  addRepresentantPersonneMembre(groupePersonnePhysiqueIndex: number, personneMembreIndex: number): void {
    // console.log(this.representantsPersonneMembre(groupePersonnePhysiqueIndex, personneMembreIndex).valid)
    this.partiesPrenantes().markAllAsTouched()

    if (this.partiesPrenantes().valid) {
      // if (this.representantsPersonneMembre(groupePersonnePhysiqueIndex, personneMembreIndex).valid) {
      let representantPersonneMembreFormGroup: FormGroup = new FormGroup({
        representant: new FormGroup({
          nom: new FormControl(null, []),
          prenoms: new FormControl(null, []),
          telephone: new FormControl(null, []),
          adresseDomicile: new FormControl(null, []),
          adresseResidence: new FormControl(null, []),
          anneeNaissance: new FormControl(null, []),
          dateNaissance: new FormControl(null, []),
          lieuNaissance: new FormControl(null, []),
          nif: new FormControl(null, []),
          nomEpoux: new FormControl(null, []),
          nomJeuneFille: new FormControl(null, []),
          vivant: new FormControl(null, []),
          civiliteId: new FormControl(null, []),
          nationaliteId: new FormControl(null, []),
          professionId: new FormControl(null, []),
        })
      })

      this.representantsPersonneMembre(groupePersonnePhysiqueIndex, personneMembreIndex).push(representantPersonneMembreFormGroup)
    }
  }

  removeRepresentantPersonneMembre(groupePersonnePhysiqueIndex: number, personneMembreIndex: number, index: number): void {
    this.representantsPersonneMembre(groupePersonnePhysiqueIndex, personneMembreIndex).removeAt(index)
  }

  addRepresentantPersonneConjointe(groupeConjointsIndex: number, personneConjointeIndex: number): void {
    // console.log(this.representantsPersonneConjointe(groupeConjointsIndex, personneConjointeIndex).valid)
    this.partiesPrenantes().markAllAsTouched()

    if (this.partiesPrenantes().valid) {
      // if (this.representantsPersonneConjointe(groupeConjointsIndex, personneConjointeIndex).valid) {
      let representantPersonneConjointeFormGroup: FormGroup = new FormGroup({
        representant: new FormGroup({
          nom: new FormControl(null, []),
          prenoms: new FormControl(null, []),
          telephone: new FormControl(null, []),
          adresseDomicile: new FormControl(null, []),
          adresseResidence: new FormControl(null, []),
          anneeNaissance: new FormControl(null, []),
          dateNaissance: new FormControl(null, []),
          lieuNaissance: new FormControl(null, []),
          nif: new FormControl(null, []),
          nomEpoux: new FormControl(null, []),
          nomJeuneFille: new FormControl(null, []),
          vivant: new FormControl(null, []),
          civiliteId: new FormControl(null, []),
          nationaliteId: new FormControl(null, []),
          professionId: new FormControl(null, []),
        })
      })

      this.representantsPersonneConjointe(groupeConjointsIndex, personneConjointeIndex).push(representantPersonneConjointeFormGroup)
    }
  }

  removeRepresentantPersonneConjointe(groupeConjointsIndex: number, personneConjointeIndex: number, index: number): void {
    this.representantsPersonneConjointe(groupeConjointsIndex, personneConjointeIndex).removeAt(index)
  }

  addConjointPersonneDisposant(groupeHeritiersIndex: number): void {
    this.partiesPrenantes().markAllAsTouched()

    if (this.partiesPrenantes().valid) {
      // if (this.partiesPrenantes().at(groupeHeritiersIndex).valid) {
      let conjointPersonneDisposantFormGroup: FormGroup = new FormGroup({
        personnePhysique: new FormGroup({
          nom: new FormControl(null, []),
          prenoms: new FormControl(null, []),
          telephone: new FormControl(null, []),
          adresseDomicile: new FormControl(null, []),
          adresseResidence: new FormControl(null, []),
          anneeNaissance: new FormControl(null, []),
          dateNaissance: new FormControl(null, []),
          lieuNaissance: new FormControl(null, []),
          nif: new FormControl(null, []),
          nomEpoux: new FormControl(null, []),
          nomJeuneFille: new FormControl(null, []),
          vivant: new FormControl(null, []),
          civiliteId: new FormControl(null, []),
          nationaliteId: new FormControl(null, []),
          professionId: new FormControl(null, []),
        }),
        personnesHeritieres: new FormArray([]),
      })

      this.conjointsPersonneDisposant(groupeHeritiersIndex).push(conjointPersonneDisposantFormGroup)
    }
  }

  removeConjointPersonneDisposant(groupeHeritiersIndex: number, index: number): void {
    this.conjointsPersonneDisposant(groupeHeritiersIndex).removeAt(index)
  }


  addPersonneHeritiere(groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number): void {
    this.partiesPrenantes().markAllAsTouched()

    if (this.partiesPrenantes().valid) {
      // if (this.conjointsPersonneDisposant(groupeHeritiersIndex).at(conjointPersonneDisposantIndex).valid) {
      let personneHeritiereFormGroup: FormGroup = new FormGroup({
        personnePhysique: new FormGroup({
          nom: new FormControl(null, []),
          prenoms: new FormControl(null, []),
          telephone: new FormControl(null, []),
          adresseDomicile: new FormControl(null, []),
          adresseResidence: new FormControl(null, []),
          anneeNaissance: new FormControl(null, []),
          dateNaissance: new FormControl(null, []),
          lieuNaissance: new FormControl(null, []),
          nif: new FormControl(null, []),
          nomEpoux: new FormControl(null, []),
          nomJeuneFille: new FormControl(null, []),
          vivant: new FormControl(null, []),
          civiliteId: new FormControl(null, []),
          nationaliteId: new FormControl(null, []),
          professionId: new FormControl(null, []),
          representants: new FormArray([]),
        })
      })

      this.personnesHeritieres(groupeHeritiersIndex, conjointPersonneDisposantIndex).push(personneHeritiereFormGroup)
    }
  }

  removePersonneHeritiere(groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, index: number): void {
    this.personnesHeritieres(groupeHeritiersIndex, conjointPersonneDisposantIndex).removeAt(index)
  }

  addRepresentantPersonneHeritiere(groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number): void {
    // console.log(this.representantsPersonneHeritiere(groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).valid)
    this.partiesPrenantes().markAllAsTouched()

    if (this.partiesPrenantes().valid) {
      // if (this.representantsPersonneHeritiere(groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).valid) {
      let representantPersonneHeritiereFormGroup: FormGroup = new FormGroup({
        representant: new FormGroup({
          nom: new FormControl(null, []),
          prenoms: new FormControl(null, []),
          telephone: new FormControl(null, []),
          adresseDomicile: new FormControl(null, []),
          adresseResidence: new FormControl(null, []),
          anneeNaissance: new FormControl(null, []),
          dateNaissance: new FormControl(null, []),
          lieuNaissance: new FormControl(null, []),
          nif: new FormControl(null, []),
          nomEpoux: new FormControl(null, []),
          nomJeuneFille: new FormControl(null, []),
          vivant: new FormControl(null, []),
          civiliteId: new FormControl(null, []),
          nationaliteId: new FormControl(null, []),
          professionId: new FormControl(null, []),
        })
      })

      this.representantsPersonneHeritiere(groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).push(representantPersonneHeritiereFormGroup)
    }
  }

  removeRepresentantPersonneHeritiere(groupeHeritiersIndex: number, conjointPersonneDisposantIndex: number, personneHeritiereIndex: number, index: number): void {
    this.representantsPersonneHeritiere(groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).removeAt(index)
  }
}
