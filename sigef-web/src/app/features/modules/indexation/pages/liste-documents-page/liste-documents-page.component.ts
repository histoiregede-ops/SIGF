import { Component, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { DossierService } from '../../../../../data/modules/indexation/services/dossier.service';
import { Dossier } from '../../../../../data/modules/indexation/models/Dossier';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { Router, ActivatedRoute } from '@angular/router';
import { FichierService } from '../../../../../data/modules/indexation/services/fichier.service';
import { Fichier } from '../../../../../data/modules/indexation/models/Fichier';
import { TypesMedia } from '../../../../../data/enums/TypesMedia';
import { getClassWithColor } from 'file-icons-js';
import { EtatsControleIndexation, EtatsSaisieIndexation } from '../../../../../data/enums/EtatsIndexation';
import { PeriodeService } from '../../../../../data/modules/commun/services/periode.service';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';
import { Region } from '../../../../../data/modules/commun/models/Region';
import { Periode } from '../../../../../data/modules/commun/models/Periode';
import { FichierUtils } from '../../../../../data/utils/FichierUtils';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { environment } from '../../../../../../environments/environment';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { AuthenticatedUserService } from '../../../../../core/services/authenticated-user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesIDs } from '../../../../../data/enums/RolesIDs';

@Component({
  selector: 'app-liste-documents-page',
  templateUrl: './liste-documents-page.component.html',
  styleUrl: './liste-documents-page.component.scss'
})
export class ListeDocumentsPageComponent implements OnInit {

  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  showNouveauDossierModal: boolean = false
  showNouveauFichierModal: boolean = false
  showModificationFichierModal: boolean = false
  showRemplacementFichierModal: boolean = false
  showImportationPlusieursFichiersModal: boolean = false

  typeRegistre!: TypesRegistre
  dossierRacineId!: TypesRegistre
  arborescenceDossiers: Dossier[] = []

  currentDossierId?: string
  listeDossiers: PagingData<Dossier> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: 8,
  }
  listeFichiers: PagingData<Fichier> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: this.PAGINATION_DEFAULT_SIZE,
  }

  resultatsRechercheDossiers: Dossier[] = []
  resultatsRechercheDossiersError: boolean = false
  rechercheDossiersForm: FormGroup = new FormGroup({
    show: new FormControl(false, []),
    nom: new FormControl(null, []),
  })

  filtresListeFichiersForm: FormGroup = new FormGroup({
    dossier: new FormControl(null, []),
    fichier: new FormControl(null, []),
    periode: new FormControl(null, []),
    region: new FormControl(null, []),
  })

  nouveauDossierForm: FormGroup = new FormGroup({
    nom: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  nouveauFichierForm: FormGroup = new FormGroup({
    nom: new FormControl(null, [Validators.required]),
    indexable: new FormControl(true, [Validators.required]),
    description: new FormControl(null, []),
    tailleEnOctets: new FormControl(null, [Validators.required]),
    fichier: new FormControl(null, [Validators.required]),
    periode: new FormControl(null, [Validators.required]),
    region: new FormControl(null, [Validators.required]),
  })

  modificationFichierForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    nom: new FormControl(null, [Validators.required]),
    indexable: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    nombrePages: new FormControl(null, [Validators.required]),
    periode: new FormControl(null, [Validators.required]),
    region: new FormControl(null, [Validators.required]),
  })

  remplacementFichierForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    tailleEnOctets: new FormControl(null, [Validators.required]),
    fichier: new FormControl(null, [Validators.required]),
  })

  @ViewChild('pdfViewerModal') pdfViewerModal!: TemplateRef<any>

  selectedPdfToPreview?: Uint8Array
  selectedPdfUrl?: string
  selectedPdfName: string = ''
  selectedPdfPage: number = 1
  loadingPdfPreview: boolean = false
  pdfPreviewError: boolean = false

  progressionImportationPlusieursFichiers: any[] = []
  importationPlusieursFichiersForm: FormGroup = new FormGroup({
    type: new FormControl(null, []),
    fichiers: new FormArray([]),
    indexable: new FormControl(true, [Validators.required]),
    periode: new FormControl(null, [Validators.required]),
    region: new FormControl(null, [Validators.required]),
  })

  get importationPlusieursFichiersFormListeFichiers() {
    return this.importationPlusieursFichiersForm.controls['fichiers'] as FormArray
  }

  periodes: Periode[] = []
  _regions: Region[] = []
  regions: Region[] = []

  readonly typesMedia = TypesMedia
  readonly etatsSaisieIndexation = EtatsSaisieIndexation
  readonly etatsControleIndexation = EtatsControleIndexation

  rolesProfil: RolesIDs[] = []
  readonly rolesIDs = RolesIDs

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private activatedRoute: ActivatedRoute,
    private dossierService: DossierService,
    private fichierService: FichierService,
    private periodeService: PeriodeService,
    private regionService: RegionService,
    private modalService: NgbModal,
    private authenticatedUserService: AuthenticatedUserService
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log("Param changing: ", params["type"])

        this.typeRegistre = params["type"] as TypesRegistre
        this.dossierRacineId = params["type"] as TypesRegistre
        this.currentDossierId = undefined
        console.log(this.dossierRacineId)

        if (!Object.values(TypesRegistre).includes(this.dossierRacineId)) {
          this.router.navigate(['/'])
        }
        else {
          this.arborescenceDossiers = []

          this.initFichiers()
          this.initDossiers()
          this.filtresListeFichiersForm.get('dossier')!.setValue(null)
          this.filtrerListeDossiers(0)
          this.filtrerListeFichiers(0)
        }
      })
  }

  ngOnInit(): void {
    this.getPeriodes()
    this.getRegions()

    this.authenticatedUserService.rolesProfil.subscribe({
      next: (value: any[] | null) => {
        if (value != null) {
          this.rolesProfil = value.map(element => element.roleId! as unknown as RolesIDs)
        }
      }
    })
  }

  rechercherDossier(): void {
    const nom: string = this.rechercheDossiersForm.get('nom')!.value ?? ''
    console.log(nom)
    if (nom.length > 0) {
      this.rechercheDossiersForm.get('show')!.setValue(true)
      this.getResultatsDossiers()
    }
    else {
      this.rechercheDossiersForm.get('show')!.setValue(false)
    }
  }

  annulerRechercheDossier(): void {
    this.rechercheDossiersForm.reset()

    this.resultatsRechercheDossiers = []
  }

  getResultatsDossiers(): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.rechercheDossiersForm.value)
    console.log(filtres)

    this.dossierService.getAllData(this.typeRegistre, undefined, filtres)
      .subscribe({
        next: (value: Dossier[]) => {
          console.log(value)
          this.resultatsRechercheDossiers = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la recherche de dossier' })
        }
      })
  }

  visualiserFichier(fichier: Fichier): void {
    if (!fichier.id) {
      this.notificationsHandlerService.addNotification({
        type: TypesNotificationAlert.WARNING,
        title: 'Fichier invalide',
        description: 'Impossible de visualiser ce fichier.'
      })
      return
    }

    this.openPdfViewer(fichier)
  }

  private openPdfViewer(fichier: Fichier): void {
    this.selectedPdfName = fichier.nom || 'Document PDF'
    this.selectedPdfPage = 1
    this.loadingPdfPreview = true
    this.pdfPreviewError = false
    this.selectedPdfToPreview = undefined

    const modalRef = this.modalService.open(this.pdfViewerModal, { size: 'xl', centered: true, scrollable: true, windowClass: 'pdf-viewer-modal' })

    const fichierId = fichier.id
    if (!fichierId) {
      this.pdfPreviewError = true
      this.loadingPdfPreview = false
      console.error('Fichier indisponible pour l’aperçu PDF', fichier)
      return
    }

    this.fichierService.getContenu(fichierId)
      .subscribe({
        next: (blob: Blob) => {
          if (blob && blob.size > 0) {
            this.selectedPdfUrl = URL.createObjectURL(blob)
            blob.arrayBuffer().then((data) => {
              this.selectedPdfToPreview = new Uint8Array(data)
              this.loadingPdfPreview = false
            }).catch((error) => {
              console.error('Erreur de conversion du blob en Uint8Array', error)
              this.pdfPreviewError = true
              this.loadingPdfPreview = false
            })
          } else {
            this.pdfPreviewError = true
            this.loadingPdfPreview = false
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erreur de chargement PDF', err)
          this.pdfPreviewError = true
          this.loadingPdfPreview = false
        }
      })

    modalRef.result.finally(() => {
      this.selectedPdfToPreview = undefined
      this.selectedPdfUrl = undefined
      this.loadingPdfPreview = false
      this.pdfPreviewError = false
      this.revokeSelectedPdfUrl()
    })
  }

  private revokeSelectedPdfUrl(): void {
    if (this.selectedPdfUrl) {
      URL.revokeObjectURL(this.selectedPdfUrl)
      this.selectedPdfUrl = undefined
    }
  }

  initFichiers(): void {
    this.listeFichiers = {
      currentPage: 0,
      data: [],
      totalItems: 0,
      totalPages: 0,
      paginationSize: this.listeFichiers.paginationSize,
    }
    this.filtresListeFichiersForm.reset()
  }

  initDossiers(): void {
    this.listeDossiers = {
      currentPage: 0,
      data: [],
      totalItems: 0,
      totalPages: 0,
      paginationSize: this.listeDossiers.paginationSize,
    }
  }

  getDossier(id: string, index?: number): void {
    if (!id || id === 'undefined' || id === 'null') {
      this.notificationsHandlerService.addNotification({
        type: TypesNotificationAlert.WARNING,
        title: 'Information',
        description: 'Dossier courant invalide, retour au dossier racine.'
      })
      this.currentDossierId = undefined
      this.filtresListeFichiersForm.get('dossier')!.setValue(null)
      this.filtrerListeFichiers(this.listeFichiers.currentPage)
      this.filtrerListeDossiers(this.listeDossiers.currentPage)
      return
    }

    this.initFichiers()
    this.annulerRechercheDossier()

    this.dossierService.get(id)
      .subscribe({
        next: (value: Dossier) => {
          this.filtresListeFichiersForm.reset()

          if (value.id && (this.currentDossierId != value.id || this.arborescenceDossiers.length == 0)) {
            if (index != undefined) {
              this.arborescenceDossiers.splice(index + 1)
              console.log(this.arborescenceDossiers.splice(index + 1), index)
            }
            else {
              this.arborescenceDossiers.push(value)
            }
            this.currentDossierId = value.id!
          }

          this.filtrerListeDossiers(this.listeDossiers.currentPage)
          // this.listeDossiers = value.sousDossiers?.sort((a, b) => a.nom!.localeCompare(b.nom!)) ?? []

          this.filtresListeFichiersForm.get('dossier')!.setValue(this.currentDossierId)
          this.filtrerListeFichiers(this.listeFichiers.currentPage)
          // this.listeFichiers = value.fichiers?.sort((a, b) => a.nom!.localeCompare(b.nom!)) ?? []
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération des informations du dossier courant' })
        }
      })
  }

  getDossiers(page: number, filtres?: CustomMapType): void {
    this.dossierService.getAll(page, this.listeDossiers.paginationSize, this.typeRegistre, filtres)
      .subscribe({
        next: (value: PagingData<Dossier>) => {
          console.log(value)
          this.listeDossiers = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des sous dossiers' })
        }
      })
  }

  filtrerListeDossiers(page?: number): void {
    const filtres: CustomMapType = {}
    if (this.currentDossierId && !this.isRegistreRootId(this.currentDossierId)) {
      filtres['dossier'] = this.currentDossierId
    }
    this.getDossiers(page ?? 0, Object.keys(filtres).length ? filtres : undefined)
  }

  onDossierPaginationChange(event: PaginationEventData): void {
    this.listeDossiers.currentPage = event.page
    this.listeDossiers.paginationSize = event.paginationSize

    this.filtrerListeDossiers(this.listeDossiers.currentPage)
  }

  getFichiers(page: number, filtres?: CustomMapType): void {
    this.fichierService.getAll(page, this.listeFichiers.paginationSize, this.typeRegistre, false, filtres)
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

  filtrerListeFichiers(page?: number): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeFichiersForm.value)
    console.log(filtres)

    this.getFichiers(page ?? 0, filtres)
  }

  onPaginationChange(event: PaginationEventData): void {
    this.listeFichiers.currentPage = event.page
    this.listeFichiers.paginationSize = event.paginationSize

    this.filtrerListeFichiers(this.listeFichiers.currentPage)
  }

  actualiser(): void {
    this.filtresListeFichiersForm.reset()
    this.revenirAuDossier(this.arborescenceDossiers.length - 1)
  }

  getPeriodes(): void {
    this.periodeService.getAllData()
      .subscribe({
        next: (value: Periode[]) => {
          this.periodes = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des périodes' })
        }
      })
  }

  getRegions(periodeId?: string): void {
    this.regionService.getAllData()
      .subscribe({
        next: (value: Region[]) => {
          this._regions = value
          this.regions = [] //this._regions
          if (periodeId) {
            this.onPeriodeChange(periodeId)
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des régions' })
        }
      })
  }

  onPeriodeChange(selectedPeriodeId?: string): void {
    if (selectedPeriodeId) {
      this.regions = this._regions.filter(value => value.periodeId == selectedPeriodeId)
    }
    else {
      this.regions = this._regions
    }
  }

  revenirAuDossier(index: number) {
    this.getDossier(this.arborescenceDossiers[index].id!, index)
  }

  validerCreationDossier(): void {
    this.nouveauDossierForm.markAllAsTouched()
    // console.log(this.nouveauDossierForm.value)
    if (this.nouveauDossierForm.valid) {
      let dossier: Dossier = this.nouveauDossierForm.value
      dossier.dossierParentId = this.currentDossierId
      dossier.typeRegistreId = this.typeRegistre

      this.dossierService.create(dossier)
        .subscribe({
          next: (value: Dossier) => {
            this.refreshCurrentContext()
            this.closeNouveauDossierModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce dossier a été créé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un dossier avec le même nom existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création du dossier' })
            }
          },
        })
    }
  }

  annulerCreationDossier(): void {
    this.closeNouveauDossierModal()
  }

  validerCreationFichier(): void {
    this.nouveauFichierForm.markAllAsTouched()
    console.log(this.nouveauFichierForm.value, this.currentDossierId)
    if (this.nouveauFichierForm.valid) {
      let fichier: Fichier = new Fichier()
      fichier.nom = this.nouveauFichierForm.get('nom')!.value
      fichier.description = this.nouveauFichierForm.get('description')!.value
      fichier.indexable = this.nouveauFichierForm.get('indexable')!.value
      fichier.typeRegistreId = this.typeRegistre
      fichier.tailleEnOctets = this.nouveauFichierForm.get('tailleEnOctets')!.value
      fichier.dossierId = this.getUploadDossierId()
      fichier.regionId = this.nouveauFichierForm.get('region')!.value

      this.fichierService.create(fichier, this.nouveauFichierForm.get('fichier')!.value)
        .subscribe({
          next: (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.refreshCurrentContext()
              this.closeNouveauFichierModal()

              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce fichier a été importé avec succès' })
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un fichier avec le même nom existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de l\'importation du fichier' })
            }
          },
        })
    }
  }

  annulerCreationFichier(): void {
    this.closeNouveauFichierModal()
  }

  validerModificationFichier(): void {
    this.modificationFichierForm.markAllAsTouched()
    console.log(this.modificationFichierForm.value, this.currentDossierId)
    if (this.modificationFichierForm.valid) {
      let fichier: Fichier = new Fichier()
      fichier.id = this.modificationFichierForm.get('id')!.value
      fichier.nom = this.modificationFichierForm.get('nom')!.value
      fichier.indexable = this.modificationFichierForm.get('indexable')!.value
      fichier.description = this.modificationFichierForm.get('description')!.value
      fichier.nombrePages = this.modificationFichierForm.get('nombrePages')!.value
      fichier.regionId = this.modificationFichierForm.get('region')!.value

      this.fichierService.update(fichier)
        .subscribe({
          next: (value: Fichier) => {
            this.refreshCurrentContext()
            this.closeModificationFichierModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce fichier a été mis à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du fichier' })
          },
        })
    }
  }

  annulerModificationFichier(): void {
    this.closeModificationFichierModal()
  }

  validerRemplacementFichier(): void {
    this.remplacementFichierForm.markAllAsTouched()
    console.log(this.remplacementFichierForm.value)
    if (this.remplacementFichierForm.valid) {
      let fichier: Fichier = new Fichier()
      fichier.id = this.remplacementFichierForm.get('id')!.value
      fichier.tailleEnOctets = this.remplacementFichierForm.get('tailleEnOctets')!.value

      this.fichierService.updateContenu(fichier, this.remplacementFichierForm.get('fichier')!.value)
        .subscribe({
          next: (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.refreshCurrentContext()
              this.closeRemplacementFichierModal()

              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Le contenu de ce fichier a été mis à jour avec succès' })
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du contenu du fichier' })
          },
        })
    }
  }

  annulerRemplacementFichier(): void {
    this.closeRemplacementFichierModal()
  }

  validerCreationPlusieursFichiers(): void {
    console.log(this.importationPlusieursFichiersFormListeFichiers.value)

    if (this.importationPlusieursFichiersForm.valid) {
      const importationPlusieursFichiersFormListeFichiers: any[] = this.importationPlusieursFichiersFormListeFichiers.value
      let nombreFichiersTraites: number = 0

      for (let index = 0; index < importationPlusieursFichiersFormListeFichiers.length; index++) {
        this.progressionImportationPlusieursFichiers[index] = { value: 0, error: false }

        const fichier = this.importationPlusieursFichiersFormListeFichiers.value[index]
        fichier.indexable = this.importationPlusieursFichiersForm.get('indexable')!.value
        fichier.typeRegistreId = this.typeRegistre
        fichier.dossierId = this.getUploadDossierId()
        fichier.regionId = this.importationPlusieursFichiersForm.get('region')!.value

        this.fichierService.create(fichier, fichier.fichier)
          .subscribe({
            next: (event: HttpEvent<any>) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progressionImportationPlusieursFichiers[index].value = Math.round(100 * event.loaded / (event.total ?? 1))
              } else if (event instanceof HttpResponse) {
                nombreFichiersTraites += 1
                this.progressionImportationPlusieursFichiers[index].error = false

                if (nombreFichiersTraites == importationPlusieursFichiersFormListeFichiers.length) {
                  this.refreshCurrentContext()
                  this.closeImportationPlusieursFichiersModal()

                  this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ces fichiers ont été importés avec succès' })
                }
              }
            },
            error: (err: HttpErrorResponse) => {
              console.log(err)
              nombreFichiersTraites += 1
              this.progressionImportationPlusieursFichiers[index].error = true
              this.progressionImportationPlusieursFichiers[index].value = 0

              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de l\'importation du fichier #' + (index + 1) })
            },
          })
      }
    }
  }

  annulerCreationPlusieursFichiers(): void {
    this.closeImportationPlusieursFichiersModal()
  }

  onFichierChange(event: File | null): void {
    console.log(event)
    if (event != null) {
      if (this.nouveauFichierForm.get('nom')!.errors?.['required']) {
        this.nouveauFichierForm.get('nom')!.setValue(FichierUtils.getInstance().getNameWithoutExtension(event.name))
      }
      this.nouveauFichierForm.get('tailleEnOctets')!.setValue(event.size)
    }
    else {
      this.nouveauFichierForm.get('tailleEnOctets')!.setValue(null)
    }
    this.nouveauFichierForm.get('fichier')!.setValue(event)
  }

  onRemplacementFichierChange(event: File | null): void {
    console.log(event)
    if (event != null) {
      // if (this.remplacementFichierForm.get('nom')!.errors?.['required']) {
      //   this.remplacementFichierForm.get('nom')!.setValue(FichierUtils.getInstance().getNameWithoutExtension(event.name))
      // }
      this.remplacementFichierForm.get('tailleEnOctets')!.setValue(event.size)
    }
    else {
      this.remplacementFichierForm.get('tailleEnOctets')!.setValue(null)
    }
    this.remplacementFichierForm.get('fichier')!.setValue(event)
  }

  onFichiersChange(event: File[] | null): void {
    console.log(event)

    if (event != null) {
      this.importationPlusieursFichiersFormListeFichiers.clear()
      event.forEach((file: File) => {
        this.importationPlusieursFichiersFormListeFichiers.push(new FormGroup({
          nom: new FormControl(FichierUtils.getInstance().getNameWithoutExtension(file.name), [Validators.required]),
          fichier: new FormControl(file, [Validators.required]),
          tailleEnOctets: new FormControl(file.size, [Validators.required]),
        }))
      })
    }
    else {
      this.importationPlusieursFichiersFormListeFichiers.clear()
    }
  }

  getFichierRessourceIcone(nomFichier: string): string {
    return getClassWithColor(nomFichier)
  }

  private isRegistreRootId(value: string | null | undefined): boolean {
    if (!value) {
      return false
    }
    return Object.values(TypesRegistre).includes(value as TypesRegistre)
  }

  private getUploadDossierId(): string | undefined {
    if (!this.currentDossierId || this.isRegistreRootId(this.currentDossierId)) {
      return undefined
    }
    return this.currentDossierId
  }

  private refreshCurrentContext(): void {
    if (this.currentDossierId && !this.isRegistreRootId(this.currentDossierId)) {
      this.getDossier(this.currentDossierId)
      return
    }
    this.filtrerListeDossiers(this.listeDossiers.currentPage)
    this.filtrerListeFichiers(this.listeFichiers.currentPage)
  }

  // Modals
  openNouveauDossierModal(): void {
    this.showNouveauDossierModal = true
  }

  closeNouveauDossierModal(): void {
    this.nouveauDossierForm.reset()
    this.showNouveauDossierModal = false
  }

  openNouveauFichierModal(): void {
    this.getPeriodes()
    this.getRegions()
    this.showNouveauFichierModal = true
  }

  closeNouveauFichierModal(): void {
    this.nouveauFichierForm.reset()
    this.nouveauFichierForm.get('indexable')!.setValue(true)
    this.showNouveauFichierModal = false
  }

  openModificationFichierModal(fichier: Fichier): void {
    this.getPeriodes()
    this.getRegions(fichier.region?.periodeId)

    this.modificationFichierForm.get('id')!.setValue(fichier.id)
    this.modificationFichierForm.get('nom')!.setValue(fichier.nom)
    this.modificationFichierForm.get('description')!.setValue(fichier.description)
    this.modificationFichierForm.get('indexable')!.setValue(fichier.indexable)
    this.modificationFichierForm.get('nombrePages')!.setValue(fichier.nombrePages)
    this.modificationFichierForm.get('periode')!.setValue(fichier.region?.periodeId)
    this.modificationFichierForm.get('region')!.setValue(fichier.regionId)

    this.showModificationFichierModal = true
  }

  closeModificationFichierModal(): void {
    this.modificationFichierForm.reset()
    this.showModificationFichierModal = false
  }

  openRemplacementFichierModal(fichier: Fichier): void {
    this.remplacementFichierForm.get('id')!.setValue(fichier.id)
    this.remplacementFichierForm.get('tailleEnOctets')!.setValue(fichier.tailleEnOctets)

    this.showRemplacementFichierModal = true
  }

  closeRemplacementFichierModal(): void {
    this.remplacementFichierForm.reset()
    this.showRemplacementFichierModal = false
  }

  openImportationPlusieursFichiersModal(type: TypesMedia): void {
    this.getPeriodes()
    this.getRegions()
    this.importationPlusieursFichiersForm.get('type')!.setValue(type)
    this.showImportationPlusieursFichiersModal = true
  }

  closeImportationPlusieursFichiersModal(): void {
    this.importationPlusieursFichiersFormListeFichiers.clear()
    this.importationPlusieursFichiersForm.reset()
    this.importationPlusieursFichiersForm.get('indexable')!.setValue(true)

    this.progressionImportationPlusieursFichiers = []
    this.showImportationPlusieursFichiersModal = false
  }
}
