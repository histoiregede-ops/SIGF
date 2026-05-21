import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../../../../environments/environment';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { StatutsDemandeEtatDescriptif } from '../../../../../data/enums/StatutsDemandeEtatDescriptif';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Utilisateur } from '../../../../../data/modules/auth/models/Utilisateur';
import { UtilisateurService } from '../../../../../data/modules/auth/services/utilisateur.service';
import { ActeRegistre } from '../../../../../data/modules/gestion-dossiers/models/ActeRegistre';
import { DemandeEtatDescriptif } from '../../../../../data/modules/gestion-dossiers/models/DemandeEtatDescriptif';
import { DemandeEtatDescriptifService } from '../../../../../data/modules/gestion-dossiers/services/demande-etat-descriptif.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { NgSelectUtils } from '../../../../../data/utils/NgSelectUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { Region } from '../../../../../data/modules/commun/models/Region';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';

@Component({
  selector: 'app-liste-demandes-etats-descriptifs-page',
  templateUrl: './liste-demandes-etats-descriptifs-page.component.html',
  styleUrl: './liste-demandes-etats-descriptifs-page.component.scss'
})
export class ListeDemandesEtatsDescriptifsPageComponent {

  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  showDetailsDemandeEtatDescriptifModal: boolean = false

  listeDemandesEtatsDescriptifs: PagingData<DemandeEtatDescriptif> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: this.PAGINATION_DEFAULT_SIZE,
  }

  masquerfiltresListeDemandesEtatsDescriptifs: boolean = false
  filtresListeDemandesEtatsDescriptifsForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    creatDebut: new FormControl(null, []),
    creatFin: new FormControl({value: null, disabled: true}, []),
    requerant: new FormControl(null, []),
    statut: new FormControl(null, []),
    dateTraitement:  new FormControl(null, []),
    demandeur:  new FormControl(null, []),
    validateur:  new FormControl(null, []),
    centre:  new FormControl(null, []),
  })

  listeUtilisateurs: Utilisateur[] = []

  readonly statutsDemandeEtatDescriptif = StatutsDemandeEtatDescriptif

  statuts = [
    { id: StatutsDemandeEtatDescriptif.A_TRAITER, libelle: 'A traiter' },
    { id: StatutsDemandeEtatDescriptif.TRAITEE, libelle: 'Traitée' },
    { id: StatutsDemandeEtatDescriptif.EN_COURS, libelle: 'En cours' },
    { id: StatutsDemandeEtatDescriptif.ANNULEE, libelle: 'Annulée' },
    { id: StatutsDemandeEtatDescriptif.REJETEE, libelle: 'Rejetée' },
  ]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationsHandlerService: NotificationsHandlerService,
    private demandeEtatDescriptifService: DemandeEtatDescriptifService,
    private utilisateurService: UtilisateurService,
    private regionService: RegionService,
  ) {
    this.listeDemandesEtatsDescriptifs = {
      currentPage: 0,
      data: [],
      totalItems: 0,
      totalPages: 0,
      paginationSize: this.listeDemandesEtatsDescriptifs.paginationSize,
    }

    this.filtresListeDemandesEtatsDescriptifsForm.reset()
    this.filtrerListeDemandesEtatsDescriptifs(this.listeDemandesEtatsDescriptifs.currentPage, this.PAGINATION_DEFAULT_SIZE)
  }

  getDemandesTransferts(page: number, paginationSize: number, filtres?: CustomMapType): void {
    this.demandeEtatDescriptifService.getAll(page, paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<DemandeEtatDescriptif>) => {
          console.log(value)
          this.listeDemandesEtatsDescriptifs = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des demandes d\'états descriptifs' })
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
  regions: Region[] = []
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

  onDateDemandeDebut(): void {
    if(this.filtresListeDemandesEtatsDescriptifsForm.get('creatDebut')!.value == null || this.filtresListeDemandesEtatsDescriptifsForm.get('creatDebut')!.value == '') {
      this.filtresListeDemandesEtatsDescriptifsForm.get('creatFin')!.setValue(null)
      this.filtresListeDemandesEtatsDescriptifsForm.get('creatFin')!.disable({ emitEvent: false })
      this.filtresListeDemandesEtatsDescriptifsForm.get('creatFin')!.setValidators([])
      this.filtresListeDemandesEtatsDescriptifsForm.get('creatFin')!.updateValueAndValidity()
    }
    else {
      this.filtresListeDemandesEtatsDescriptifsForm.get('creatFin')!.enable({ emitEvent: false })
      this.filtresListeDemandesEtatsDescriptifsForm.get('creatFin')!.setValidators([Validators.required])
      this.filtresListeDemandesEtatsDescriptifsForm.get('creatFin')!.updateValueAndValidity()
    }
  }

  filtrerListeDemandesEtatsDescriptifs(page?: number, paginationSize?: number): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeDemandesEtatsDescriptifsForm.value)
    console.log(filtres)

    this.getDemandesTransferts(page ?? 0, paginationSize ?? this.PAGINATION_DEFAULT_SIZE, filtres)
  }

  effacerFiltresListeDemandesEtatsDescriptifs(): void {
    this.filtresListeDemandesEtatsDescriptifsForm.reset()

    this.filtrerListeDemandesEtatsDescriptifs()
  }

  annulerRechercheDemandeEtatDescriptif(): void {
    this.filtresListeDemandesEtatsDescriptifsForm.get('search')!.setValue(null)
    this.filtrerListeDemandesEtatsDescriptifs()
  }

  onPaginationChange(event: PaginationEventData): void {
    this.listeDemandesEtatsDescriptifs.currentPage = event.page
    this.listeDemandesEtatsDescriptifs.paginationSize = event.paginationSize

    this.filtrerListeDemandesEtatsDescriptifs(this.listeDemandesEtatsDescriptifs.currentPage, this.listeDemandesEtatsDescriptifs.paginationSize)
  }

  validerAnnulationDemandeEtatDescriptif(demande: DemandeEtatDescriptif): void {
    let demandeEtatDescriptif: DemandeEtatDescriptif = demande
    demandeEtatDescriptif.statut = StatutsDemandeEtatDescriptif.ANNULEE

    this.demandeEtatDescriptifService.update(demande)
      .subscribe({
        next: (value: DemandeEtatDescriptif) => {
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette demande a été annulée avec succès' })
          // console.log(value)
          this.filtrerListeDemandesEtatsDescriptifs(this.listeDemandesEtatsDescriptifs.currentPage, this.listeDemandesEtatsDescriptifs.paginationSize)
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de l\'annulation de cette demande' })
        },
      })
  }

  validerRejetDemandeEtatDescriptif(demande: DemandeEtatDescriptif): void {
    let demandeEtatDescriptif: DemandeEtatDescriptif = demande
    demandeEtatDescriptif.statut = StatutsDemandeEtatDescriptif.REJETEE

    this.demandeEtatDescriptifService.update(demande)
      .subscribe({
        next: (value: DemandeEtatDescriptif) => {
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette demande a été rejetée avec succès' })
          // console.log(value)
          this.filtrerListeDemandesEtatsDescriptifs(this.listeDemandesEtatsDescriptifs.currentPage, this.listeDemandesEtatsDescriptifs.paginationSize)
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors du rejet de cette demande' })
        },
      })
  }

  traiterDemandeEtatDescriptif(demande: DemandeEtatDescriptif): void {
    if (demande.statut == StatutsDemandeEtatDescriptif.EN_COURS) {
      this.router.navigate(['/dossiers/etats-descriptifs', demande.id, 'traitement'])
    }
    else if (demande.statut == StatutsDemandeEtatDescriptif.A_TRAITER) {
      let demandeEtatDescriptif: DemandeEtatDescriptif = demande
      demandeEtatDescriptif.statut = StatutsDemandeEtatDescriptif.EN_COURS

      this.demandeEtatDescriptifService.update(demandeEtatDescriptif)
        .subscribe({
          next: (value: DemandeEtatDescriptif) => {
            // this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette demande a été créée avec succès' })
            console.log(value)
            this.router.navigate(['/dossiers/etats-descriptifs', demandeEtatDescriptif.id, 'traitement'])
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

  annulerDemandeEtatDescriptif(demande: DemandeEtatDescriptif): void {
    this.demandeEtatDescriptifService.get(demande.id!)
      .subscribe({
        next: (value: DemandeEtatDescriptif) => {
          // this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette demande a été créée avec succès' })
          console.log(value)
          if (value.statut == StatutsDemandeEtatDescriptif.A_TRAITER) {
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
                this.validerAnnulationDemandeEtatDescriptif(demande)
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

  rejeterDemandeEtatDescriptif(demande: DemandeEtatDescriptif): void {
    this.demandeEtatDescriptifService.get(demande.id!)
      .subscribe({
        next: (value: DemandeEtatDescriptif) => {
          // this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette demande a été créée avec succès' })
          console.log(value)
          if (value.statut == StatutsDemandeEtatDescriptif.A_TRAITER) {
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
                this.validerRejetDemandeEtatDescriptif(demande)
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
  selectedDemandeEtatDescriptif?: DemandeEtatDescriptif
  openDetailsDemandeEtatDescriptifModal(demande: DemandeEtatDescriptif): void {
    this.selectedDemandeEtatDescriptif = demande
    this.showDetailsDemandeEtatDescriptifModal = true
    console.log(this.selectedDemandeEtatDescriptif)
  }

  closeDetailsDemandeEtatDescriptifModal(): void {
    this.selectedDemandeEtatDescriptif = undefined
    this.showDetailsDemandeEtatDescriptifModal = false
  }

}
