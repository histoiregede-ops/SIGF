import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { TypesMedia } from '../../../../../data/enums/TypesMedia';
import { Fichier } from '../../../../../data/modules/indexation/models/Fichier';
import { getClassWithColor } from 'file-icons-js';
import { FichierService } from '../../../../../data/modules/indexation/services/fichier.service';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { EtatsControleIndexation, EtatsSaisieIndexation } from '../../../../../data/enums/EtatsIndexation';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from '../../../../../data/modules/auth/models/Utilisateur';
import { ControleurService } from '../../../../../data/modules/auth/services/controleur.service';
import { IndexeurService } from '../../../../../data/modules/auth/services/indexeur.service';
import { TacheIndexationService } from '../../../../../data/modules/indexation/services/tache-indexation.service';
import { TacheIndexation } from '../../../../../data/modules/indexation/models/TacheIndexation';
import { NgSelectUtils } from '../../../../../data/utils/NgSelectUtils';
import { TacheIndexationUtils } from '../../../../../data/utils/TacheIndexationUtils';
import Swal from 'sweetalert2';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypeRegistreService } from '../../../../../data/modules/commun/services/type-registre.service';
import { TypeRegistre } from '../../../../../data/modules/commun/models/TypeRegistre';
import { UtilisateurService } from '../../../../../data/modules/auth/services/utilisateur.service';

@Component({
  selector: 'app-liste-attributions-lots-page',
  templateUrl: './liste-attributions-lots-page.component.html',
  styleUrl: './liste-attributions-lots-page.component.scss'
})
export class ListeAttributionsLotsPageComponent {

  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  showAttributionLotModal: boolean = false
  showAttributionIndexeurPlusieursLotsModal: boolean = false
  showAttributionControleurPlusieursLotsModal: boolean = false
  showRepriseIndexationModal: boolean = false
  showPagesSignaleesOuRejeteesModal: boolean = false

  typeRegistreId!: TypesRegistre
  typeRegistre?: TypeRegistre
  listeFichiers: PagingData<Fichier> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: this.PAGINATION_DEFAULT_SIZE,
  }

  masquerfiltresListeFichiers: boolean = false
  filtresListeFichiersForm: FormGroup = new FormGroup({
    fichier: new FormControl(null, []),
    // creatDebut: new FormControl(null, []),
    // creatFin: new FormControl(null, []),
    indexeur: new FormControl(null, []),
    controleur: new FormControl(null, []),
    etatSaisie: new FormControl(null, []),
    etatControle: new FormControl(null, []),
    rejete: new FormControl(null, []),
    signale: new FormControl(null, []),
  })

  attributionLotForm: FormGroup = new FormGroup({
    fichierId: new FormControl(null, [Validators.required]),
    tacheIndexationId: new FormControl(null, []),
    indexeurUtilisateurId: new FormControl(null, [Validators.required]),
    controleurUtilisateurId: new FormControl(null, []),
  })

  attributionIndexeurPlusieursLotsForm: FormGroup = new FormGroup({
    lots: new FormArray([]),
    indexeurUtilisateurId: new FormControl(null, [Validators.required]),
  })

  attributionControleurPlusieursLotsForm: FormGroup = new FormGroup({
    lots: new FormArray([]),
    controleurUtilisateurId: new FormControl(null, [Validators.required]),
  })

  repriseIndexationForm: FormGroup = new FormGroup({
    tacheIndexationId: new FormControl(null, [Validators.required]),
  })

  selectedAllFichiers: boolean = false
  selectedFichiersId: { [key: string]: boolean } = {}
  selectedFichiers: Fichier[] = []

  listeIndexeurs: Utilisateur[] = []
  listeControleurs: Utilisateur[] = []

  readonly typesMedia = TypesMedia
  readonly etatsSaisieIndexation = EtatsSaisieIndexation
  readonly etatsControleIndexation = EtatsControleIndexation

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private activatedRoute: ActivatedRoute,
    private typeRegistreService: TypeRegistreService,
    private fichierService: FichierService,
    private indexeurService: IndexeurService,
    private controleurService: ControleurService,
    private utilisateurService: UtilisateurService,
    private tacheIndexationService: TacheIndexationService,
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log("Param changing: ", params["type"])

        this.typeRegistreId = this.activatedRoute.snapshot.paramMap.get("type") as TypesRegistre
        console.log(this.typeRegistreId)

        if (!Object.values(TypesRegistre).includes(this.typeRegistreId)) {
          this.router.navigate(['/'])
        }
        else {
          this.listeFichiers = {
            currentPage: 0,
            data: [],
            totalItems: 0,
            totalPages: 0,
            paginationSize: this.listeFichiers.paginationSize,
          }
          
          this.getTypeRegistre()
          this.filtresListeFichiersForm.reset()
          this.filtrerListeFichiers(this.listeFichiers.currentPage, this.PAGINATION_DEFAULT_SIZE)
        }
      })
  }

  ngOnInit(): void {
    this.initFiltresListeFichiers()
  }

  onSelectedAllFichiersChange(): void {
    // console.log(this.selectedAllFichiers)
    this.listeFichiers.data.forEach(fichier => {
      this.selectedFichiersId[fichier.id!] = this.selectedAllFichiers
    });
  }

  getSelectedFichiers(): void {
    this.selectedFichiers = this.listeFichiers.data.filter(value => this.selectedFichiersId[value.id!] == true)
  }

  getTypeRegistre(): void {
    this.typeRegistreService.get(this.typeRegistreId)
    .subscribe({
      next: (value: TypeRegistre) => {
        console.log(value)
        this.typeRegistre = value
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)

        this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération du type de registre' })
      }
    })
  }

  getFichiers(page: number, paginationSize: number, filtres?: CustomMapType): void {
    this.fichierService.getAll(page, paginationSize, this.typeRegistreId, true, filtres)
      .subscribe({
        next: (value: PagingData<Fichier>) => {
          console.log(value)
          this.listeFichiers = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des fichiers' })
        }
      })
  }

  initFiltresListeFichiers(): void {
    this.filtresListeFichiersForm.get('rejete')!.setValue(false)
    this.filtresListeFichiersForm.get('signale')!.setValue(false)
  }

  filtrerListeFichiers(page?: number, paginationSize?: number): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeFichiersForm.value)
    console.log(filtres)

    this.getFichiers(page ?? 0, paginationSize ?? this.PAGINATION_DEFAULT_SIZE, filtres)
  }

  effacerFiltresListeFichiers(): void {
    this.filtresListeFichiersForm.reset()

    this.initFiltresListeFichiers()
    this.filtrerListeFichiers()
  }

  onEtatDuFichierChange(event: number): void {
    // console.log(event)
    switch (event) {
      case 1:
        // Contenant des pages rejetées
        this.filtresListeFichiersForm.get('rejete')!.setValue(true)
        this.filtresListeFichiersForm.get('signale')!.setValue(null)
        break;

      case 2:
        // Contenant des pages signalées
        this.filtresListeFichiersForm.get('rejete')!.setValue(null)
        this.filtresListeFichiersForm.get('signale')!.setValue(true)
        break;

      case 3:
        // Contenant des pages rejetées et signalées
        this.filtresListeFichiersForm.get('rejete')!.setValue(true)
        this.filtresListeFichiersForm.get('signale')!.setValue(true)
        break;

      default:
        this.filtresListeFichiersForm.get('rejete')!.setValue(null)
        this.filtresListeFichiersForm.get('signale')!.setValue(null)
        break;
    }
  }

  onPaginationChange(event: PaginationEventData): void {
    this.listeFichiers.currentPage = event.page
    this.listeFichiers.paginationSize = event.paginationSize

    this.filtrerListeFichiers(this.listeFichiers.currentPage, this.listeFichiers.paginationSize)
  }

  getIndexeurs(): void {
    this.indexeurService.getAllData()
      .subscribe({
        next: (value: Utilisateur[]) => {
          console.log('[Attribution Lots] indexeurs charges:', value.length, value)
          if (value.length === 0) {
            this.loadIndexeursFallback()
            return
          }
          this.listeIndexeurs = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des indexeurs' })
        }
      })
  }

  private loadIndexeursFallback(): void {
    this.utilisateurService.getAllData({ actif: 'true' })
      .subscribe({
        next: (users: Utilisateur[]) => {
          console.log('[Attribution Lots] fallback utilisateurs->indexeurs:', users.length, users)
          this.listeIndexeurs = users
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        },
      })
  }

  getControleurs(): void {
    this.controleurService.getAllData()
      .subscribe({
        next: (value: Utilisateur[]) => {
          console.log('[Attribution Lots] controleurs charges:', value.length, value)
          this.listeControleurs = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des contrôleurs' })
        }
      })
  }

  validerAttributionLot(): void {
    this.attributionLotForm.markAllAsTouched()
    console.log(this.attributionLotForm.value)

    if (this.attributionLotForm.valid) {
      let tacheIndexation: TacheIndexation = new TacheIndexation()
      tacheIndexation.fichierId = this.attributionLotForm.get('fichierId')!.value
      tacheIndexation.indexeurUtilisateurId = this.attributionLotForm.get('indexeurUtilisateurId')!.value
      tacheIndexation.controleurUtilisateurId = this.attributionLotForm.get('controleurUtilisateurId')!.value

      if (this.attributionLotForm.get('tacheIndexationId')!.value == null) {
        this.tacheIndexationService.create(tacheIndexation)
          .subscribe({
            next: () => {
              this.filtrerListeFichiers(this.listeFichiers.currentPage)
              this.closeAttributionLotModal()

              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce lot a été attribué avec succès' })
            },
            error: (err: HttpErrorResponse) => {
              console.log(err)

              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de l\'attribution du lot' })
            },
          })
      }
      else {
        tacheIndexation.id = this.attributionLotForm.get('tacheIndexationId')!.value

        this.tacheIndexationService.update(tacheIndexation)
          .subscribe({
            next: () => {
              this.filtrerListeFichiers(this.listeFichiers.currentPage)
              this.closeAttributionLotModal()

              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce lot a été attribué avec succès' })
            },
            error: (err: HttpErrorResponse) => {
              console.log(err)

              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de l\'attribution du lot' })
            },
          })
      }
    }
  }

  annulerAttributionLot(): void {
    this.closeAttributionLotModal()
  }

  validerAttributionIndexeurPlusieursLots(): void {
    this.attributionIndexeurPlusieursLotsForm.markAllAsTouched()
    console.log(this.attributionIndexeurPlusieursLotsForm.value)

    if (this.attributionIndexeurPlusieursLotsForm.valid) {
      const value: any = this.attributionIndexeurPlusieursLotsForm.value

      for (let index = 0; index < value.lots.length; index++) {
        const lot = value.lots[index];
        console.log(lot)

        let tacheIndexation: TacheIndexation = new TacheIndexation()
        tacheIndexation.fichierId = lot.fichierId
        tacheIndexation.indexeurUtilisateurId = value.indexeurUtilisateurId

        if (lot.tacheIndexationId == null) {
          this.tacheIndexationService.create(tacheIndexation)
            .subscribe({
              next: () => {
                if (index == (value.lots.length - 1)) {
                  this.filtrerListeFichiers(this.listeFichiers.currentPage)
                  this.closeAttributionIndexeurPlusieursLotsModal()

                  this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ces lots ont été attribués avec succès' })
                }
              },
              error: (err: HttpErrorResponse) => {
                console.log(err)

                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de l\'attribution du lot #' + (index + 1) })
              },
            })
        }
        else {
          tacheIndexation.id = lot.tacheIndexationId

          this.tacheIndexationService.update(tacheIndexation)
            .subscribe({
              next: () => {
                if (index == (value.lots.length - 1)) {
                  this.filtrerListeFichiers(this.listeFichiers.currentPage)
                  this.closeAttributionIndexeurPlusieursLotsModal()

                  this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ces lots ont été attribués avec succès' })
                }
              },
              error: (err: HttpErrorResponse) => {
                console.log(err)

                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de l\'attribution du lot #' + (index + 1) })
              },
            })
        }
      }
    }
  }

  annulerAttributionIndexeurPlusieursLots(): void {
    this.closeAttributionIndexeurPlusieursLotsModal()
  }

  validerAttributionControleurPlusieursLots(): void {
    this.attributionControleurPlusieursLotsForm.markAllAsTouched()
    console.log(this.attributionControleurPlusieursLotsForm.value)

    if (this.attributionControleurPlusieursLotsForm.valid) {
      const value: any = this.attributionControleurPlusieursLotsForm.value

      for (let index = 0; index < value.lots.length; index++) {
        const lot = value.lots[index];
        console.log(lot)

        let tacheIndexation: TacheIndexation = new TacheIndexation()
        tacheIndexation.fichierId = lot.fichierId
        tacheIndexation.controleurUtilisateurId = value.controleurUtilisateurId

        if (lot.tacheIndexationId == null) {
          this.tacheIndexationService.create(tacheIndexation)
            .subscribe({
              next: () => {
                if (index == (value.lots.length - 1)) {
                  this.filtrerListeFichiers(this.listeFichiers.currentPage)
                  this.closeAttributionControleurPlusieursLotsModal()

                  this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ces lots ont été attribués avec succès' })
                }
              },
              error: (err: HttpErrorResponse) => {
                console.log(err)

                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de l\'attribution du lot #' + (index + 1) })
              },
            })
        }
        else {
          tacheIndexation.id = lot.tacheIndexationId

          this.tacheIndexationService.update(tacheIndexation)
            .subscribe({
              next: () => {
                if (index == (value.lots.length - 1)) {
                  this.filtrerListeFichiers(this.listeFichiers.currentPage)
                  this.closeAttributionControleurPlusieursLotsModal()

                  this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ces lots ont été attribués avec succès' })
                }
              },
              error: (err: HttpErrorResponse) => {
                console.log(err)

                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de l\'attribution du lot #' + (index + 1) })
              },
            })
        }
      }
    }
  }

  annulerAttributionControleurPlusieursLots(): void {
    this.closeAttributionControleurPlusieursLotsModal()
  }

  validerRepriseIndexation(): void {
    this.repriseIndexationForm.markAllAsTouched()
    console.log(this.repriseIndexationForm.value)

    if (this.repriseIndexationForm.valid) {
      let tacheIndexation: TacheIndexation = new TacheIndexation()
      tacheIndexation.id = this.repriseIndexationForm.get('tacheIndexationId')!.value
      tacheIndexation.etatSaisie = EtatsSaisieIndexation.A_INDEXER
      tacheIndexation.etatControle = this.etatsControleIndexation.EN_ATTENTE

      this.tacheIndexationService.update(tacheIndexation)
        .subscribe({
          next: () => {
            this.filtrerListeFichiers(this.listeFichiers.currentPage)
            this.closeRepriseIndexationModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'La reprise d\'indexation a été effectuée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la reprise d\'indexation' })
          },
        })
    }
  }

  annulerRepriseIndexation(): void {
    this.closeRepriseIndexationModal()
  }

  getEtatSignalisationOuRejetTacheIndexation(tacheIndexation?: TacheIndexation): boolean {
    return TacheIndexationUtils.getInstance().getEtatSignalisationOuRejetTacheIndexation(tacheIndexation)
  }

  getFichierRessourceIcone(nomFichier: string): string {
    return getClassWithColor(nomFichier)
  }

  customUtilisateurSearchFn(term: string, item: Utilisateur) {
    return NgSelectUtils.getInstance().customUtilisateurSearchFn(term, item)
  }

  // Modals
  openAttributionLotModal(fichier: Fichier): void {
    this.getIndexeurs()
    this.getControleurs()
    this.attributionLotForm.get('fichierId')!.setValue(fichier.id!)
    this.attributionLotForm.get('tacheIndexationId')!.setValue(fichier.tacheIndexation ? fichier.tacheIndexation.id : null)

    if (fichier.tacheIndexation) {
      this.attributionLotForm.get('indexeurUtilisateurId')!.setValue(fichier.tacheIndexation.indexeurUtilisateurId)
      this.attributionLotForm.get('controleurUtilisateurId')!.setValue(fichier.tacheIndexation.controleurUtilisateurId)
    }

    this.showAttributionLotModal = true
  }
  closeAttributionLotModal(): void {
    this.attributionLotForm.reset()
    this.showAttributionLotModal = false
  }

  openAttributionIndexeurPlusieursLotsModal(): void {
    this.getSelectedFichiers()
    console.log(this.selectedFichiers)

    if (this.selectedFichiers.length != 0) {
      this.getIndexeurs()
      this.getControleurs()

      for (let index = 0; index < this.selectedFichiers.length; index++) {
        const fichier = this.selectedFichiers[index];

        (this.attributionIndexeurPlusieursLotsForm.get('lots')! as FormArray).push(new FormGroup({
          fichierId: new FormControl(fichier.id, [Validators.required]),
          tacheIndexationId: new FormControl(fichier.tacheIndexation ? fichier.tacheIndexation.id : null, []),
        }))
      }

      this.showAttributionIndexeurPlusieursLotsModal = true
    }
    else {
      Swal.fire({
        title: '<h5 class="modal-title">Aucun lot choisi</h5>',
        html: '<div>Sélectionner au moins un lot pour assigner un indexeur</div>',
        icon: 'error',
        showCloseButton: true,
        confirmButtonText: 'Ok',
        // confirmButtonColor: 'var(--es-primary)'
        customClass: {
          htmlContainer: "text-muted fs-6",
          confirmButton: "btn btn-primary"
        }
      });
    }
  }

  closeAttributionIndexeurPlusieursLotsModal(): void {
    this.attributionIndexeurPlusieursLotsForm.reset();
    (this.attributionIndexeurPlusieursLotsForm.get('lots')! as FormArray).clear()
    this.selectedAllFichiers = false
    this.selectedFichiersId = {}
    this.selectedFichiers = []
    this.showAttributionIndexeurPlusieursLotsModal = false
  }

  openAttributionControleurPlusieursLotsModal(): void {
    this.getSelectedFichiers()
    console.log(this.selectedFichiers)

    if (this.selectedFichiers.length != 0) {
      this.getIndexeurs()
      this.getControleurs()

      for (let index = 0; index < this.selectedFichiers.length; index++) {
        const fichier = this.selectedFichiers[index];

        (this.attributionControleurPlusieursLotsForm.get('lots')! as FormArray).push(new FormGroup({
          fichierId: new FormControl(fichier.id, [Validators.required]),
          tacheIndexationId: new FormControl(fichier.tacheIndexation ? fichier.tacheIndexation.id : null, []),
          // indexeurUtilisateurId: new FormControl(fichier.tacheIndexation ? fichier.tacheIndexation.indexeurUtilisateurId : null, [Validators.required]),
          // controleurUtilisateurId: new FormControl(fichier.tacheIndexation ? fichier.tacheIndexation.controleurUtilisateurId : null, []),
        }))
      }

      this.showAttributionControleurPlusieursLotsModal = true
    }
    else {
      Swal.fire({
        title: '<h5 class="modal-title">Aucun lot choisi</h5>',
        html: '<div>Sélectionner au moins un lot pour assigner un contrôleur</div>',
        icon: 'error',
        showCloseButton: true,
        confirmButtonText: 'Ok',
        // confirmButtonColor: 'var(--es-primary)'
        customClass: {
          htmlContainer: "text-muted fs-6",
          confirmButton: "btn btn-primary"
        }
      });
    }
  }

  closeAttributionControleurPlusieursLotsModal(): void {
    this.attributionControleurPlusieursLotsForm.reset();
    (this.attributionControleurPlusieursLotsForm.get('lots')! as FormArray).clear()
    this.selectedAllFichiers = false
    this.selectedFichiersId = {}
    this.selectedFichiers = []
    this.showAttributionControleurPlusieursLotsModal = false
  }

  selectedFichier?: Fichier
  openPagesSignaleesOuRejeteesModal(fichier: Fichier): void {
    this.selectedFichier = fichier
    this.showPagesSignaleesOuRejeteesModal = true
  }

  closePagesSignaleesOuRejeteesModal(): void {
    this.selectedFichier = undefined
    this.showPagesSignaleesOuRejeteesModal = false
  }


  openRepriseIndexationModal(fichier: Fichier): void {
    if (fichier.tacheIndexation) {
      this.repriseIndexationForm.get('tacheIndexationId')!.setValue(fichier.tacheIndexation.id)
      this.showRepriseIndexationModal = true
    }
    else {
      Swal.fire({
        title: '<h5 class="modal-title">Impossible de reprendre l\'indexation</h5>',
        html: '<div>Ce fichier n\'est pas encore assigné à un indexeur ni à un contrôleur</div>',
        icon: 'error',
        showCloseButton: true,
        confirmButtonText: 'Ok',
        // confirmButtonColor: 'var(--es-primary)'
        customClass: {
          htmlContainer: "text-muted fs-6",
          confirmButton: "btn btn-primary"
        }
      });
    }
  }

  closeRepriseIndexationModal(): void {
    this.repriseIndexationForm.reset()
    this.showRepriseIndexationModal = false
  }
}
