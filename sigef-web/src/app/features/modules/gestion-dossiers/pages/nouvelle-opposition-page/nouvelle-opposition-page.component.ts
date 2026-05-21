import { Component, OnInit } from '@angular/core';
import { OppositionService } from '../../../../../data/modules/gestion-dossiers/services/opposition.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';
import { CategoriesPartiePrenante } from '../../../../../data/enums/CategoriesPartiePrenante';
import { Opposition } from '../../../../../data/modules/gestion-dossiers/models/Opposition';
import { PartiePrenante } from '../../../../../data/modules/gestion-dossiers/models/PartiePrenante';
import { FormalitePrealableService } from '../../../../../data/modules/gestion-dossiers/services/formalite-prealable.service';
import { FormalitePrealable } from '../../../../../data/modules/gestion-dossiers/models/FormalitePrealable';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
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
import { PartiePrenanteUtils } from '../../../../../data/utils/PartiePrenanteUtils';
import { CiviliteService } from '../../../../../data/modules/commun/services/civilite.service';
import { FormeJuridiqueService } from '../../../../../data/modules/commun/services/forme-juridique.service';
import { NationaliteService } from '../../../../../data/modules/commun/services/nationalite.service';
import { ProfessionService } from '../../../../../data/modules/commun/services/profession.service';
import { SecteurActiviteService } from '../../../../../data/modules/commun/services/secteur-activite.service';
import { TypeLienGroupeService } from '../../../../../data/modules/commun/services/type-lien-groupe.service';
import { TypePersonneMoraleService } from '../../../../../data/modules/commun/services/type-personne-morale.service';
import { TypeRelationLegaleService } from '../../../../../data/modules/commun/services/type-relation-legale.service';
import { getClassWithColor } from 'file-icons-js';
import { Utilisateur } from '../../../../../data/modules/auth/models/Utilisateur';
import { AuthenticatedUserService } from '../../../../../core/services/authenticated-user.service';
import { CentreConservationFonciereService } from '../../../../../data/modules/auth/services/centre-conservation-fonciere.service';
import { DossierRegistreService } from '../../../../../data/modules/gestion-dossiers/services/dossier-registre.service';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { CentreConservationFonciere } from '../../../../../data/modules/auth/models/CentreConservationFonciere';
import { DossierRegistre } from '../../../../../data/modules/gestion-dossiers/models/DossierRegistre';
import { CustomMapType } from '../../../../../data/utils/FiltresDonneesUtils';
import { delay } from 'rxjs';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';
import { Region } from '../../../../../data/modules/commun/models/Region';

@Component({
  selector: 'app-nouvelle-opposition-page',
  templateUrl: './nouvelle-opposition-page.component.html',
  styleUrl: './nouvelle-opposition-page.component.scss'
})
export class NouvelleOppositionPageComponent implements OnInit {

  listeFormalitesPrealables: FormalitePrealable[] = []

  nouvelleOppositionForm: FormGroup = new FormGroup({
    description: new FormControl(null, []),
    dateOpposition: new FormControl(null, [Validators.required]),
    requerants: new FormArray([]),
    intervenants: new FormArray([]),
    oppositionsRequisitions: new FormArray([]),
    piecesDeposees: new FormArray([]),
    acteRegistre: new FormGroup({
      dossierRegistreId: new FormControl(null, [Validators.required]),
      typeRegistreId: new FormControl(null, [Validators.required]),
      regionId: new FormControl(null, [Validators.required]),
      centreConservationFonciereId: new FormControl(null, [Validators.required]),
    }),
  })

  utilisateurDemande?: Utilisateur

  constructor(
    private router: Router,
    private authenticatedUserService: AuthenticatedUserService,
    private formalitePrealableService: FormalitePrealableService,
    private oppositionService: OppositionService,
    private notificationsHandlerService: NotificationsHandlerService,

    // Registre + Acte
    private dossierRegistreService: DossierRegistreService,
    // Centre
    private centreConservationFonciereService: CentreConservationFonciereService,
    // Situation
    private regionService: RegionService,
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
    this.nouvelleOppositionForm.get('acteRegistre')!.get('typeRegistreId')?.setValue(TypesRegistre.OPPOSITIONS)
  }

  ngOnInit(): void {
    this.authenticatedUserService.utilisateur
      .pipe(delay(0))
      .subscribe({
        next: (value: Utilisateur | null) => {
          if (value != null) {
            this.utilisateurDemande = value

            console.log(this.utilisateurDemande.centreConservationFonciere?.id)
            this.nouvelleOppositionForm.get('acteRegistre')!.get('centreConservationFonciereId')?.setValue(this.utilisateurDemande.centreConservationFonciere?.id)
          }
        }
      })

    this.getFormalitesPrealables()
  }

  getFormalitesPrealables(): void {
    this.formalitePrealableService.getAllData()
      .subscribe({
        next: (value: FormalitePrealable[]) => {
          // console.log(value)
          this.listeFormalitesPrealables = value
        },
        error: (err: HttpErrorResponse) => {
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des formalités' })
        }
      })
  }

  validerCreationOpposition(): void {
    console.log(this.nouvelleOppositionForm.value)

    this.nouvelleOppositionForm.markAllAsTouched()
    if (this.nouvelleOppositionForm.valid) {
      if (this.requerants.length >= 1 && this.intervenants.length >= 1) {
        if (this.oppositionsRequisitions.length >= 1) {
          let opposition: Opposition = new Opposition()
          opposition = this.nouvelleOppositionForm.value
          opposition.partiesPrenantes = this.getPartiesPrenantes()

          this.oppositionService.create(opposition)
            .subscribe({
              next: (value: Opposition) => {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette opposition a été créée avec succès' })
                this.router.navigate(['/dossiers/oppositions', value.id])
              },
              error: (err: HttpErrorResponse) => {
                console.log(err)

                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de cette opposition' })
              },
            })
        }
        else {
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Il faut au moins un numéro de réquisition' })
        }
      }
      else {
        this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Il faut au moins un réquérant et au moins un propriétaire' })
      }
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Certains champs ne sont pas valides' })
    }
  }

  annulerCreationOpposition(): void {
    this.router.navigate(['/dossiers/oppositions'])
  }

  // Registre + Acte
  dossiersRegistres: DossierRegistre[] = []
  getDossiersRegistres(estRegistre: boolean = true): void {
    const filtres: CustomMapType = { estRegistre: '' + estRegistre }

    this.dossierRegistreService.getAllData(TypesRegistre.OPPOSITIONS, undefined, filtres)
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

  getFichierRessourceIcone(nomFichier: string): string {
    return getClassWithColor(nomFichier)
  }


  // Situation
  _regions: Region[] = []
  regions: Region[] = []

  onRegionChange(selectedRegionId?: string): void {
    if (selectedRegionId) {
      this.nouvelleOppositionForm.get('situationPropriete')!.get('regionId')!.setValue(selectedRegionId)
    }
    else {
      this.nouvelleOppositionForm.get('situationPropriete')!.get('regionId')!.setValue(null)
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

  // Oppositions requisitions
  get oppositionsRequisitions() {
    return this.nouvelleOppositionForm.controls['oppositionsRequisitions'] as FormArray
  }

  addOppositionRequisition(removeIds: boolean, value?: any): void {
    if (this.oppositionsRequisitions.valid) {
      let oppositionRequisitionFormGroup: FormGroup = new FormGroup({
        numeroRequisition: new FormControl(value ? value.numeroRequisition : null, [Validators.required]),
      })

      if (!removeIds) {
        oppositionRequisitionFormGroup.addControl('id', new FormControl(value ? value.id : null, []))
      }

      this.oppositionsRequisitions.push(oppositionRequisitionFormGroup)
    }
  }

  removeOppositionRequisition(index: number): void {
    this.removeOppositionRequisitionAtIndex(index)
  }

  private removeOppositionRequisitionAtIndex(index: number): void {
    this.oppositionsRequisitions.removeAt(index)
  }

  // Pièces déposées
  get piecesDeposees() {
    return this.nouvelleOppositionForm.controls['piecesDeposees'] as FormArray
  }

  onFichierChange(event: any, pieceDeposeeIndex: number): void {
    this.piecesDeposees.controls[pieceDeposeeIndex].get('fichier')!.setValue(event.target.files[0])
    console.log(event.target.files[0], this.piecesDeposees.controls[pieceDeposeeIndex].get('fichier')!.value)
  }

  addPieceDeposee(): void {
    if (this.piecesDeposees.valid) {
      let pieceDeposeeFormGroup: FormGroup = new FormGroup({
        nom: new FormControl(null, [Validators.required]),
        description: new FormControl(null, []),
        fichier: new FormControl(null, []),
      })

      this.piecesDeposees.push(pieceDeposeeFormGroup)
    }
  }

  removePieceDeposee(index: number): void {
    this.piecesDeposees.removeAt(index)
  }

  // Parties Prenantes
  get requerants() {
    return this.partiesPrenantes(TypesPartiePrenante.REQUERANT)
  }

  get intervenants() {
    return this.partiesPrenantes(TypesPartiePrenante.INTERVENANT)
  }

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

      // if (!this.formulaireEtatActif) {
      //   partiePrenanteFormGroup.disable()
      // }

      this.partiesPrenantes(typePartiePrenante).push(partiePrenanteFormGroup)
    }
  }

  removePartiePrenante(typePartiePrenante: TypesPartiePrenante, index: number): void {
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

      // if (!this.formulaireEtatActif) {
      //   personneMembreFormGroup.disable()
      // }

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

      // if (!this.formulaireEtatActif) {
      //   representantPersonnePhysiqueFormGroup.disable()
      // }

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

      // if (!this.formulaireEtatActif) {
      //   representantPersonneMoraleFormGroup.disable()
      // }

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

      // if (!this.formulaireEtatActif) {
      //   personneConjointeFormGroup.disable()
      // }

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

      // if (!this.formulaireEtatActif) {
      //   representantPersonneMembreFormGroup.disable()
      // }

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

      // if (!this.formulaireEtatActif) {
      //   representantPersonneConjointeFormGroup.disable()
      // }

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

      // if (!this.formulaireEtatActif) {
      //   conjointPersonneDisposantFormGroup.disable()
      // }

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

      // if (!this.formulaireEtatActif) {
      //   personneHeritiereFormGroup.disable()
      // }

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

      // if (!this.formulaireEtatActif) {
      //   representantPersonneHeritiereFormGroup.disable()
      // }

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
    this.representantsPersonneHeritiere(typePartiePrenante, groupeHeritiersIndex, conjointPersonneDisposantIndex, personneHeritiereIndex).removeAt(index)
  }

  // Modals
}
