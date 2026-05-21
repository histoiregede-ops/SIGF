import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { TypeRegistre } from '../../../../../data/modules/commun/models/TypeRegistre';
import { TypeRegistreService } from '../../../../../data/modules/commun/services/type-registre.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { DemandeTransfert } from '../../../../../data/modules/gestion-dossiers/models/DemandeTransfert';
import { DemandeTransfertService } from '../../../../../data/modules/gestion-dossiers/services/demande-transfert.service';
import { StatutsDemandeTransfert } from '../../../../../data/enums/StatutsDemandeTransfert';
import Swal from 'sweetalert2';
import { StatutsDemandeTransfertActeRegistre } from '../../../../../data/enums/StatutsDemandeTransfertActeRegistre';
import { Utilisateur } from '../../../../../data/modules/auth/models/Utilisateur';
import { UtilisateurService } from '../../../../../data/modules/auth/services/utilisateur.service';
import { CentreConservationFonciere } from '../../../../../data/modules/auth/models/CentreConservationFonciere';
import { CentreConservationFonciereService } from '../../../../../data/modules/auth/services/centre-conservation-fonciere.service';
import { NgSelectUtils } from '../../../../../data/utils/NgSelectUtils';
import { ActeRegistre } from '../../../../../data/modules/gestion-dossiers/models/ActeRegistre';

@Component({
  selector: 'app-liste-demandes-transferts-page',
  templateUrl: './liste-demandes-transferts-page.component.html',
  styleUrl: './liste-demandes-transferts-page.component.scss'
})
export class ListeDemandesTransfertsPageComponent {

  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  showDetailsDemandeTransfertModal: boolean = false

  typeRegistreId!: TypesRegistre
  typeRegistre?: TypeRegistre
  listeDemandesTransferts: PagingData<DemandeTransfert> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: this.PAGINATION_DEFAULT_SIZE,
  }

  masquerfiltresListeDemandesTransferts: boolean = false
  filtresListeDemandesTransfertsForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    creatDebut: new FormControl(null, []),
    creatFin: new FormControl({value: null, disabled: true}, []),
    statut: new FormControl(null, []),
    dateTraitement:  new FormControl(null, []),
    demandeur:  new FormControl(null, []),
    validateur:  new FormControl(null, []),
    centre:  new FormControl(null, []),
  })

  listeUtilisateurs: Utilisateur[] = []

  readonly typesRegistre = TypesRegistre
  readonly statutsDemandeTransfert = StatutsDemandeTransfert
  readonly statutsDemandeTransfertActeRegistre = StatutsDemandeTransfertActeRegistre

  statuts = [
    { id: StatutsDemandeTransfert.A_TRAITER, libelle: 'A traiter' },
    { id: StatutsDemandeTransfert.TRAITEE, libelle: 'Traitée' },
    { id: StatutsDemandeTransfert.EN_COURS, libelle: 'En cours' },
    { id: StatutsDemandeTransfert.ANNULEE, libelle: 'Annulée' },
    { id: StatutsDemandeTransfert.REJETEE, libelle: 'Rejetée' },
  ]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private typeRegistreService: TypeRegistreService,
    private notificationsHandlerService: NotificationsHandlerService,
    private demandeTransfertService: DemandeTransfertService,
    private utilisateurService: UtilisateurService,
    private centreConservationFonciereService: CentreConservationFonciereService,
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
          this.listeDemandesTransferts = {
            currentPage: 0,
            data: [],
            totalItems: 0,
            totalPages: 0,
            paginationSize: this.listeDemandesTransferts.paginationSize,
          }
          this.getTypeRegistre()

          this.filtresListeDemandesTransfertsForm.reset()
          this.filtrerListeDemandesTransferts(this.listeDemandesTransferts.currentPage, this.PAGINATION_DEFAULT_SIZE)
        }
      })
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

  getDemandesTransferts(page: number, paginationSize: number, filtres?: CustomMapType): void {
    this.demandeTransfertService.getAll(page, paginationSize, this.typeRegistreId, filtres)
      .subscribe({
        next: (value: PagingData<DemandeTransfert>) => {
          console.log(value)
          this.listeDemandesTransferts = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des demandes de transfert' })
        }
      })
  }

  getUtilisateurs(): void {
    const filtres: CustomMapType = {}//{ actif: 'true' }

    this.utilisateurService.getAllData(filtres)
      .subscribe({
        next: (value: Utilisateur[]) => {
          console.log(value)
          this.listeUtilisateurs = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des utilisateurs' })
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

  onDateDemandeDebut(): void {
    if(this.filtresListeDemandesTransfertsForm.get('creatDebut')!.value == null || this.filtresListeDemandesTransfertsForm.get('creatDebut')!.value == '') {
      this.filtresListeDemandesTransfertsForm.get('creatFin')!.setValue(null)
      this.filtresListeDemandesTransfertsForm.get('creatFin')!.disable({ emitEvent: false })
      this.filtresListeDemandesTransfertsForm.get('creatFin')!.setValidators([])
      this.filtresListeDemandesTransfertsForm.get('creatFin')!.updateValueAndValidity()
    }
    else {
      this.filtresListeDemandesTransfertsForm.get('creatFin')!.enable({ emitEvent: false })
      this.filtresListeDemandesTransfertsForm.get('creatFin')!.setValidators([Validators.required])
      this.filtresListeDemandesTransfertsForm.get('creatFin')!.updateValueAndValidity()
    }
  }

  filtrerListeDemandesTransferts(page?: number, paginationSize?: number): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeDemandesTransfertsForm.value)
    console.log(filtres)

    this.getDemandesTransferts(page ?? 0, paginationSize ?? this.PAGINATION_DEFAULT_SIZE, filtres)
  }

  effacerFiltresListeDemandesTransferts(): void {
    this.filtresListeDemandesTransfertsForm.reset()

    this.filtrerListeDemandesTransferts()
  }

  annulerRechercheDemandeTransfert(): void {
    this.filtresListeDemandesTransfertsForm.get('search')!.setValue(null)
    this.filtrerListeDemandesTransferts()
  }

  onPaginationChange(event: PaginationEventData): void {
    this.listeDemandesTransferts.currentPage = event.page
    this.listeDemandesTransferts.paginationSize = event.paginationSize

    this.filtrerListeDemandesTransferts(this.listeDemandesTransferts.currentPage, this.listeDemandesTransferts.paginationSize)
  }

  validerAnnulationDemandeTransfert(demande: DemandeTransfert): void {
    let demandeTransfert: DemandeTransfert = demande
    demandeTransfert.statut = StatutsDemandeTransfert.ANNULEE

    this.demandeTransfertService.update(demande)
      .subscribe({
        next: (value: DemandeTransfert) => {
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette demande a été annulée avec succès' })
          // console.log(value)
          this.filtrerListeDemandesTransferts(this.listeDemandesTransferts.currentPage, this.listeDemandesTransferts.paginationSize)
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de l\'annulation de cette demande' })
        },
      })
  }

  validerRejetDemandeTransfert(demande: DemandeTransfert): void {
    let demandeTransfert: DemandeTransfert = demande
    demandeTransfert.statut = StatutsDemandeTransfert.REJETEE

    this.demandeTransfertService.update(demande)
      .subscribe({
        next: (value: DemandeTransfert) => {
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette demande a été rejetée avec succès' })
          // console.log(value)
          this.filtrerListeDemandesTransferts(this.listeDemandesTransferts.currentPage, this.listeDemandesTransferts.paginationSize)
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors du rejet de cette demande' })
        },
      })
  }

  traiterDemandeTransfert(demande: DemandeTransfert): void {
    if (demande.statut == StatutsDemandeTransfert.EN_COURS) {
      this.router.navigate(['/dossiers/transferts', this.typeRegistreId, demande.id, 'traitement'])
    }
    else if (demande.statut == StatutsDemandeTransfert.A_TRAITER) {
      let demandeTransfert: DemandeTransfert = demande
      demandeTransfert.statut = StatutsDemandeTransfert.EN_COURS

      this.demandeTransfertService.update(demandeTransfert)
        .subscribe({
          next: (value: DemandeTransfert) => {
            // this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette demande a été créée avec succès' })
            console.log(value)
            this.router.navigate(['/dossiers/transferts', this.typeRegistreId, demandeTransfert.id, 'traitement'])
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de cette demande' })
          },
        })
    }
    else {
      Swal.fire({
        title: '<h5 class="modal-title">Demande déjà traitée ou annulée</h5>',
        html: '<div>La demande que vous voulez traiter a été déjà traitée par un autre utilisateur ou a été annulée.</div>',
        icon: 'error',
        showCloseButton: true,
        confirmButtonText: 'O!k',
        // confirmButtonColor: 'var(--es-primary)'
        customClass: {
          htmlContainer: "text-muted",
          confirmButton: "btn btn-primary",
        }
      });
    }
  }

  annulerDemandeTransfert(demande: DemandeTransfert): void {
    this.demandeTransfertService.get(demande.id!)
      .subscribe({
        next: (value: DemandeTransfert) => {
          // this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette demande a été créée avec succès' })
          console.log(value)
          if (value.statut == StatutsDemandeTransfert.A_TRAITER) {
            Swal.fire({
              title: '<h5 class="modal-title">Annuler la demande de transfert</h5>',
              html: '<div>Etes-vous sûr de vouloir d\'annuler cette demande ? Vous ne pourrez pas revenir en arrière.</div>',
              icon: 'error',
              showCloseButton: true,
              showDenyButton: true,
              confirmButtonText: 'Oui',
              denyButtonText: 'Non',
              // confirmButtonColor: 'var(--es-primary)'
              customClass: {
                htmlContainer: "text-muted",
                confirmButton: "btn btn-primary",
                denyButton: "btn btn-danger",
              }
            }).then((result) => {
              if (result.isConfirmed) {
                this.validerAnnulationDemandeTransfert(demande)
              }
            });
          }
          else {
            Swal.fire({
              title: '<h5 class="modal-title">Demande déjà traitée ou annulée ou en cours de traitement</h5>',
              html: '<div>La demande que vous voulez annuler a été déjà traitée par un autre utilisateur ou a été annulée.</div>',
              icon: 'error',
              showCloseButton: true,
              confirmButtonText: 'O!k',
              // confirmButtonColor: 'var(--es-primary)'
              customClass: {
                htmlContainer: "text-muted",
                confirmButton: "btn btn-primary",
              }
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération des informations de cette demande' })
        },
      })
  }

  rejeterDemandeTransfert(demande: DemandeTransfert): void {
    this.demandeTransfertService.get(demande.id!)
      .subscribe({
        next: (value: DemandeTransfert) => {
          // this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette demande a été créée avec succès' })
          console.log(value)
          if (value.statut == StatutsDemandeTransfert.A_TRAITER) {
            Swal.fire({
              title: '<h5 class="modal-title">Rejeter la demande de transfert</h5>',
              html: '<div>Etes-vous sûr de vouloir de rejeter cette demande ? Vous ne pourrez pas revenir en arrière.</div>',
              icon: 'error',
              showCloseButton: true,
              showDenyButton: true,
              confirmButtonText: 'Oui',
              denyButtonText: 'Non',
              // confirmButtonColor: 'var(--es-primary)'
              customClass: {
                htmlContainer: "text-muted",
                confirmButton: "btn btn-primary",
                denyButton: "btn btn-danger",
              }
            }).then((result) => {
              if (result.isConfirmed) {
                this.validerRejetDemandeTransfert(demande)
              }
            });
          }
          else {
            Swal.fire({
              title: '<h5 class="modal-title">Demande déjà traitée ou annulée ou en cours de traitement</h5>',
              html: '<div>La demande que vous voulez rejeter a été déjà traitée par un autre utilisateur ou a été annulée.</div>',
              icon: 'error',
              showCloseButton: true,
              confirmButtonText: 'O!k',
              // confirmButtonColor: 'var(--es-primary)'
              customClass: {
                htmlContainer: "text-muted",
                confirmButton: "btn btn-primary",
              }
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération des informations de cette demande' })
        },
      })
  }

  // Utils
  customUtilisateurSearchFn(term: string, item: Utilisateur) {
    return NgSelectUtils.getInstance().customUtilisateurSearchFn(term, item)
  }

  openActeRegistreDetailsPage(acteRegistre: ActeRegistre): void {
    console.log(acteRegistre)
  }

  // Modals
  selectedDemandeTransfert?: DemandeTransfert
  openDetailsDemandeTransfertModal(demande: DemandeTransfert): void {
    this.selectedDemandeTransfert = demande
    this.showDetailsDemandeTransfertModal = true
    console.log(this.selectedDemandeTransfert)
  }

  closeDetailsDemandeTransfertModal(): void {
    this.selectedDemandeTransfert = undefined
    this.showDetailsDemandeTransfertModal = false
  }

}
