import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Fichier } from '../../../../../data/modules/indexation/models/Fichier';
import { TacheIndexationService } from '../../../../../data/modules/indexation/services/tache-indexation.service';
import { TypesTacheIndexation } from '../../../../../data/enums/TypesTacheIndexation';
import { TacheIndexation } from '../../../../../data/modules/indexation/models/TacheIndexation';
import { HttpErrorResponse } from '@angular/common/http';
import { NgSelectUtils } from '../../../../../data/utils/NgSelectUtils';
import { Utilisateur } from '../../../../../data/modules/auth/models/Utilisateur';
import { getClassWithColor } from 'file-icons-js';
import { EtatsControleIndexation, EtatsSaisieIndexation } from '../../../../../data/enums/EtatsIndexation';
import Swal from 'sweetalert2';
import { TacheIndexationUtils } from '../../../../../data/utils/TacheIndexationUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { TypeRegistre } from '../../../../../data/modules/commun/models/TypeRegistre';
import { TypeRegistreService } from '../../../../../data/modules/commun/services/type-registre.service';
import { EtatsProgressionIndexation } from '../../../../../data/enums/EtatsProgressionIndexation';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-taches-indexation-page',
  templateUrl: './liste-taches-indexation-page.component.html',
  styleUrl: './liste-taches-indexation-page.component.scss'
})
export class ListeTachesIndexationPageComponent {

  showPagesSignaleesOuRejeteesModal: boolean = false

  typeTacheIndexation!: TypesTacheIndexation
  typeRegistreId!: TypesRegistre
  typeRegistre?: TypeRegistre
  listeTachesIndexation: PagingData<TacheIndexation> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeTachesIndexation: boolean = false
  filtresListeTachesIndexationForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    etatSaisie: new FormControl(null, []),
    etatControle: new FormControl(null, []),
    etat: new FormControl(null, []),
  })

  readonly etatsSaisieIndexation = EtatsSaisieIndexation
  readonly etatsControleIndexation = EtatsControleIndexation
  readonly etatsProgressionIndexation = EtatsProgressionIndexation
  readonly typesTacheIndexation = TypesTacheIndexation

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationsHandlerService: NotificationsHandlerService,
    private tacheIndexationService: TacheIndexationService,
    private typeRegistreService: TypeRegistreService,
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log("Param changing: ", params)

        this.typeTacheIndexation = this.activatedRoute.snapshot.paramMap.get("tache") as TypesTacheIndexation
        this.typeRegistreId = this.activatedRoute.snapshot.paramMap.get("type") as TypesRegistre

        if (!Object.values(TypesTacheIndexation).includes(this.typeTacheIndexation) || !Object.values(TypesRegistre).includes(this.typeRegistreId)) {
          this.router.navigate(['/'])
        }
        else {
          this.listeTachesIndexation = {
            currentPage: 0,
            data: [],
            totalItems: 0,
            totalPages: 0,
            paginationSize: this.listeTachesIndexation.paginationSize,
          }
          this.getTypeRegistre()
          
          this.filtresListeTachesIndexationForm.reset()
          this.getTachesIndexation()
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

  getTachesIndexation(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeTachesIndexationForm.value)

    this.tacheIndexationService.getAll(this.typeTacheIndexation, this.typeRegistreId, event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<TacheIndexation>) => {
          console.log(value)
          this.listeTachesIndexation = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des tâches' })
        }
      })
  }

  annulerRechercheTacheIndexation(): void {
    this.filtresListeTachesIndexationForm.get('search')!.setValue(null)
    this.filtrerListeTachesIndexation()
  }

  filtrerListeTachesIndexation(): void {
    this.getTachesIndexation({ page: this.listeTachesIndexation.currentPage, paginationSize: this.listeTachesIndexation.paginationSize! })
  }

  effacerFiltresListeTachesIndexation(): void {
    this.filtresListeTachesIndexationForm.reset()

    this.filtrerListeTachesIndexation()
  }

  onEtatTacheIndexationChange(etat?: EtatsSaisieIndexation | EtatsControleIndexation, etatProgressionIndexation?: EtatsProgressionIndexation): void {
    if (this.typeTacheIndexation == TypesTacheIndexation.SAISIE) {
      this.filtresListeTachesIndexationForm.get('etatSaisie')!.setValue(etat ?? null)
    }
    else if (this.typeTacheIndexation == TypesTacheIndexation.CONTROLE) {
      this.filtresListeTachesIndexationForm.get('etatControle')!.setValue(etat ?? null)
    }

    if(etatProgressionIndexation) {
      this.filtresListeTachesIndexationForm.get('etat')!.setValue(etatProgressionIndexation ?? null)
    }

    this.filtrerListeTachesIndexation()
  }

  openTacheDetails(tacheIndexation: TacheIndexation): void {
    if (!tacheIndexation.fichier?.nombrePages) {
      Swal.fire({
        title: '<h5 class="modal-title">Fichier pas encore prêt</h5>',
        html: '<div>Vous ne pouvez pas encore traiter ce fichier. <br><br> Demandez à l\'administrateur de renseigner le nombre de pages du document avant de pouvoir contineur</div>',
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
    else {
      if (this.typeTacheIndexation == TypesTacheIndexation.CONTROLE && tacheIndexation.etatControle == EtatsControleIndexation.EN_ATTENTE) {
        Swal.fire({
          title: '<h5 class="modal-title">Fichier en cours d\'indexation</h5>',
          html: '<div>Vous ne pouvez pas encore contrôler ce fichier</div>',
          icon: 'warning',
          showCloseButton: true,
          confirmButtonText: 'Ok',
          // confirmButtonColor: 'var(--es-primary)'
          customClass: {
            htmlContainer: "text-muted fs-6",
            confirmButton: "btn btn-primary"
          }
        });
      }
      else {
        this.openTacheDetailsPage(tacheIndexation.id!)
      }
    }
  }

  private openTacheDetailsPage(tacheIndexationId: string): void {
    this.router.navigate(['/indexation', this.typeTacheIndexation, this.typeRegistreId, tacheIndexationId])
  }

  customUtilisateurSearchFn(term: string, item: Utilisateur) {
    return NgSelectUtils.getInstance().customUtilisateurSearchFn(term, item)
  }

  getFichierRessourceIcone(nomFichier: string): string {
    return getClassWithColor(nomFichier)
  }

  getEtatSignalisationOuRejetTacheIndexation(tacheIndexation?: TacheIndexation): boolean {
    return TacheIndexationUtils.getInstance().getEtatSignalisationOuRejetTacheIndexation(tacheIndexation)
  }

  // Modals
  selectedFichier?: Fichier
  openPagesSignaleesOuRejeteesModal(tacheIndexation: TacheIndexation): void {
    this.selectedFichier = tacheIndexation.fichier
    if (this.selectedFichier) {
      this.selectedFichier.tacheIndexation = tacheIndexation
    }
    this.showPagesSignaleesOuRejeteesModal = true
  }
  closePagesSignaleesOuRejeteesModal(): void {
    this.selectedFichier = undefined
    this.showPagesSignaleesOuRejeteesModal = false
  }
}
