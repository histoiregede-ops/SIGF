import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Periode } from '../../../../../data/modules/commun/models/Periode';
import { Region } from '../../../../../data/modules/commun/models/Region';
import { PeriodeService } from '../../../../../data/modules/commun/services/periode.service';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { DossierRegistreService } from '../../../../../data/modules/gestion-dossiers/services/dossier-registre.service';
import { DossierRegistre } from '../../../../../data/modules/gestion-dossiers/models/DossierRegistre';
import { TypeRegistre } from '../../../../../data/modules/commun/models/TypeRegistre';
import { TypeRegistreService } from '../../../../../data/modules/commun/services/type-registre.service';
import { CentreConservationFonciere } from '../../../../../data/modules/auth/models/CentreConservationFonciere';
import { CentreConservationFonciereService } from '../../../../../data/modules/auth/services/centre-conservation-fonciere.service';

@Component({
  selector: 'app-liste-registres-page',
  templateUrl: './liste-registres-page.component.html',
  styleUrl: './liste-registres-page.component.scss'
})
export class ListeRegistresPageComponent {

  showNouveauDossierModal: boolean = false
  showModificationDossierModal: boolean = false
  showSuppressionDossierModal: boolean = false

  typeRegistreId!: TypesRegistre
  typeRegistre?: TypeRegistre
  dossierRacineId!: TypesRegistre
  arborescenceDossiers: DossierRegistre[] = []

  currentDossierId!: string
  currentDossier?: DossierRegistre
  listeDossiers: PagingData<DossierRegistre> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: 8,
  }

  resultatsRechercheDossiers: DossierRegistre[] = []
  resultatsRechercheDossiersError: boolean = false
  rechercheDossiersForm: FormGroup = new FormGroup({
    show: new FormControl(false, []),
    nom: new FormControl(null, []),
  })

  nouveauDossierForm: FormGroup = new FormGroup({
    nom: new FormControl(null, [Validators.required]),
    volume: new FormControl(null, []),
    periode: new FormControl(null, [Validators.required]),
    regionId: new FormControl(null, [Validators.required]),
    estRegistre: new FormControl(false, [Validators.required]),
    description: new FormControl(null, []),
    centreConservationFonciereId: new FormControl(null, [Validators.required]),
  })

  modificationDossierForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    nom: new FormControl(null, [Validators.required]),
    volume: new FormControl(null, []),
    periode: new FormControl(null, [Validators.required]),
    regionId: new FormControl(null, [Validators.required]),
    estRegistre: new FormControl(false, [Validators.required]),
    description: new FormControl(null, []),
    centreConservationFonciereId: new FormControl(null, [Validators.required]),
  })

  suppressionDossierForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    estRegistre: new FormControl(false, [Validators.required]),
  })


  periodes: Periode[] = []
  _regions: Region[] = []
  regions: Region[] = []
  listeCentresConservationFonciere: CentreConservationFonciere[] = []

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private activatedRoute: ActivatedRoute,
    private typeRegistreService: TypeRegistreService,
    private dossierRegistreService: DossierRegistreService,
    private periodeService: PeriodeService,
    private regionService: RegionService,
    private centreConservationFonciereService: CentreConservationFonciereService,
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log("Param changing: ", params["type"])

        this.typeRegistreId = params["type"] as TypesRegistre
        this.dossierRacineId = params["type"] as TypesRegistre
        this.currentDossierId = this.dossierRacineId
        console.log(this.dossierRacineId)

        if (!Object.values(TypesRegistre).includes(this.dossierRacineId)) {
          this.router.navigate(['/'])
        }
        else {
          // let dossierQueryParam: string | null = this.activatedRoute.snapshot.queryParamMap.get('dossier')
          // if(dossierQueryParam != null) {
          //   this.currentDossierId = dossierQueryParam
          // }
          this.arborescenceDossiers = []

          this.getTypeRegistre()
          this.initDossiers()
          this.getDossier(this.currentDossierId)

          // // Nouveau dossier form change
          // this.nouveauDossierForm.valueChanges.subscribe((value) => {
          //   this.onTypeDossierRegistreChange()
          // })
        }
      })
  }

  ngOnInit(): void {
    this.getPeriodes()
    this.getRegions()
    this.getCentresConservationFonciere()
  }

  onTypeDossierRegistreChange(): void {
    if (this.nouveauDossierForm.get('estRegistre')!.value == true) {
      this.nouveauDossierForm.controls['volume'].setValidators([Validators.required])
      this.nouveauDossierForm.controls['volume'].updateValueAndValidity()
      this.nouveauDossierForm.controls['periode'].setValidators([Validators.required])
      this.nouveauDossierForm.controls['periode'].updateValueAndValidity()
      this.nouveauDossierForm.controls['regionId'].setValidators([Validators.required])
      this.nouveauDossierForm.controls['regionId'].updateValueAndValidity()
      this.nouveauDossierForm.controls['centreConservationFonciereId'].setValidators([Validators.required])
      this.nouveauDossierForm.controls['centreConservationFonciereId'].updateValueAndValidity()
    }
    else {
      this.nouveauDossierForm.controls['volume'].setValidators([])
      this.nouveauDossierForm.controls['volume'].updateValueAndValidity()
      this.nouveauDossierForm.controls['periode'].setValidators([])
      this.nouveauDossierForm.controls['periode'].updateValueAndValidity()
      this.nouveauDossierForm.controls['regionId'].setValidators([])
      this.nouveauDossierForm.controls['regionId'].updateValueAndValidity()
      this.nouveauDossierForm.controls['centreConservationFonciereId'].setValidators([])
      this.nouveauDossierForm.controls['centreConservationFonciereId'].updateValueAndValidity()
    }
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

  getCentresConservationFonciere(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    this.centreConservationFonciereService.getAllData()
      .subscribe({
        next: (value: CentreConservationFonciere[]) => {
          console.log(value)
          this.listeCentresConservationFonciere = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des centres de conservation foncière' })
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

    this.dossierRegistreService.getAllData(this.typeRegistreId, undefined, filtres)
      .subscribe({
        next: (value: DossierRegistre[]) => {
          console.log(value)
          this.resultatsRechercheDossiers = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la recherche de dossier' })
        }
      })
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
    this.annulerRechercheDossier()
    // this.router.navigate([], {
    //   queryParams: { dossier: id },
    //   queryParamsHandling: 'merge', // to keep existing params
    // });

    this.dossierRegistreService.get(id)
      .subscribe({
        next: (value: DossierRegistre) => {
          if (value.estRegistre == true) {
            this.router.navigate(['/dossiers', this.typeRegistreId], {
              queryParams: { registre: value.id! }
            })
            console.log("Est un registre")
          }
          else if (value.estRegistre == false) {

            if (this.currentDossierId != value.id || this.arborescenceDossiers.length == 0) {
              if (index != undefined) {
                this.arborescenceDossiers.splice(index + 1)
                console.log(this.arborescenceDossiers.splice(index + 1), index)
              }
              else {
                this.arborescenceDossiers.push(value)
              }
              this.currentDossierId = value.id!
              this.currentDossier = value
            }

            this.filtrerListeDossiers(this.listeDossiers.currentPage)
            // this.listeDossiers = value.sousDossiers?.sort((a, b) => a.nom!.localeCompare(b.nom!)) ?? []
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération des informations du dossier courant' })
        }
      })
  }

  getDossiers(page: number, filtres?: CustomMapType): void {
    this.dossierRegistreService.getAll(page, this.listeDossiers.paginationSize, this.typeRegistreId, filtres)
      .subscribe({
        next: (value: PagingData<DossierRegistre>) => {
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
    // const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeDossiersForm.value)
    // console.log(filtres)

    this.getDossiers(page ?? 0, { dossierRegistre: this.currentDossierId })
  }

  onDossierPaginationChange(event: PaginationEventData): void {
    this.listeDossiers.currentPage = event.page
    this.listeDossiers.paginationSize = event.paginationSize

    this.filtrerListeDossiers(this.listeDossiers.currentPage)
  }

  actualiser(): void {
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
    console.log(this.nouveauDossierForm.value, this.nouveauDossierForm.valid)
    if (this.nouveauDossierForm.valid) {
      let dossier: DossierRegistre = this.nouveauDossierForm.value
      dossier.dossierRegistreParentId = this.currentDossierId
      dossier.typeRegistreId = this.typeRegistreId

      this.dossierRegistreService.create(dossier)
        .subscribe({
          next: (value: DossierRegistre) => {
            this.getDossier(this.currentDossierId)
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

  validerModificationDossier(): void {
    console.log(this.modificationDossierForm.value)
    this.modificationDossierForm.markAllAsTouched()

    if (this.modificationDossierForm.valid) {
      let dossier: DossierRegistre = this.modificationDossierForm.value

      this.dossierRegistreService.update(dossier)
        .subscribe({
          next: (value: DossierRegistre) => {
            this.getDossier(this.currentDossierId)
            this.closeModificationDossierModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce dossier a été mis à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un dossier avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du dossier' })
            }
          },
        })
    }
  }

  annulerModificationDossier(): void {
    this.closeModificationDossierModal()
  }

  validerSuppressionDossier(): void {
    console.log(this.suppressionDossierForm.value)
    this.suppressionDossierForm.markAllAsTouched()

    if (this.suppressionDossierForm.valid) {
      let dossierId: DossierRegistre['id'] = this.suppressionDossierForm.get('id')!.value

      this.dossierRegistreService.delete(dossierId!)
        .subscribe({
          next: (value: DossierRegistre) => {
            this.getDossier(this.currentDossierId)
            this.closeSuppressionDossierModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce dossier a été supprimé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression du dossier' })
          },
        })
    }
  }

  annulerSuppressionDossier(): void {
    this.closeSuppressionDossierModal()
  }

  // Modals
  openNouveauDossierModal(estRegistre: boolean = false): void {
    this.nouveauDossierForm.get('estRegistre')!.setValue(estRegistre)
    this.onTypeDossierRegistreChange()
    this.showNouveauDossierModal = true
  }

  closeNouveauDossierModal(): void {
    this.nouveauDossierForm.reset()
    this.showNouveauDossierModal = false
  }

  openModificationDossierModal(index: number): void {
    const selectedDossier: DossierRegistre | undefined = this.listeDossiers.data[index]

    if (selectedDossier != undefined) {
      this.getPeriodes()
      this.getRegions()
      this.getCentresConservationFonciere()
      this.modificationDossierForm.patchValue(selectedDossier)
      this.modificationDossierForm.get('periode')!.setValue(selectedDossier.region?.periodeId)
      this.onPeriodeChange(selectedDossier.region?.periodeId)

      this.showModificationDossierModal = true
    }
  }

  closeModificationDossierModal(): void {
    this.showModificationDossierModal = false
    this.modificationDossierForm.reset()
  }

  openSuppressionDossierModal(index: number): void {
    const selectedDossier: DossierRegistre | undefined = this.listeDossiers.data[index]

    if (selectedDossier != undefined) {
      this.suppressionDossierForm.get('id')?.setValue(selectedDossier.id)
      this.suppressionDossierForm.get('estRegistre')?.setValue(selectedDossier.estRegistre)

      this.showSuppressionDossierModal = true
    }
  }

  closeSuppressionDossierModal(): void {
    this.showSuppressionDossierModal = false
    this.suppressionDossierForm.reset()
  }

}
