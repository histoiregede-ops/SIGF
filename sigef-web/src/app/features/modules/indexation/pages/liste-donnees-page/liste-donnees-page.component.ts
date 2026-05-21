import { Component } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { DonneeIndexation } from '../../../../../data/modules/indexation/models/DonneeIndexation';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { HttpErrorResponse } from '@angular/common/http';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { DonneeIndexationService } from '../../../../../data/modules/indexation/services/donnee-indexation.service';
import { StatutsDepot } from '../../../../../data/enums/StatutsDepot';
import { StatutsFormalitePrealable } from '../../../../../data/enums/StatutsFormalitePrealable';
import { StatutsOpposition } from '../../../../../data/enums/StatutsOpposition';
import { StatutsTitreFoncier } from '../../../../../data/enums/StatutsTitreFoncier';
import { getClassWithColor } from 'file-icons-js';
import { EtatsProgressionIndexation } from '../../../../../data/enums/EtatsProgressionIndexation';
import { TypesTacheIndexation } from '../../../../../data/enums/TypesTacheIndexation';
import Swal from 'sweetalert2';
import { TypeRegistreService } from '../../../../../data/modules/commun/services/type-registre.service';
import { TypeRegistre } from '../../../../../data/modules/commun/models/TypeRegistre';

@Component({
  selector: 'app-liste-donnees-page',
  templateUrl: './liste-donnees-page.component.html',
  styleUrl: './liste-donnees-page.component.scss'
})
export class ListeDonneesPageComponent {

  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  typeRegistreId!: TypesRegistre
  typeRegistre?: TypeRegistre
  listeDonneesIndexation: PagingData<DonneeIndexation> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: this.PAGINATION_DEFAULT_SIZE,
  }

  masquerfiltresListeDonneesIndexation: boolean = true
  filtresListeDonneesIndexationForm: FormGroup = new FormGroup({
    fichier: new FormControl(null, []),
  })

  readonly typesRegistre = TypesRegistre
  readonly statutsFormalitePrealable = StatutsFormalitePrealable
  readonly statutsOpposition = StatutsOpposition
  readonly statutsDepot = StatutsDepot
  readonly statutsTitreFoncier = StatutsTitreFoncier
  readonly etatsProgressionIndexation = EtatsProgressionIndexation

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private typeRegistreService: TypeRegistreService,
    private notificationsHandlerService: NotificationsHandlerService,
    private donneeIndexationService: DonneeIndexationService,
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
          this.listeDonneesIndexation = {
            currentPage: 0,
            data: [],
            totalItems: 0,
            totalPages: 0,
            paginationSize: this.listeDonneesIndexation.paginationSize,
          }
          this.getTypeRegistre()
          
          this.filtresListeDonneesIndexationForm.reset()
          this.filtrerListeDonneesIndexation(this.listeDonneesIndexation.currentPage, this.PAGINATION_DEFAULT_SIZE)
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

  getDonneesIndexation(page: number, paginationSize: number, filtres?: CustomMapType): void {
    this.donneeIndexationService.getAll(page, paginationSize, this.typeRegistreId, filtres)
      .subscribe({
        next: (value: PagingData<DonneeIndexation>) => {
          console.log(value)
          this.listeDonneesIndexation = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des données d\'indexation' })
        }
      })
  }

  initFiltresListeDonneesIndexation(): void {
    this.filtresListeDonneesIndexationForm.get('rejete')!.setValue(false)
  }

  filtrerListeDonneesIndexation(page?: number, paginationSize?: number): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeDonneesIndexationForm.value)
    console.log(filtres)

    this.getDonneesIndexation(page ?? 0, paginationSize ?? this.PAGINATION_DEFAULT_SIZE, filtres)
  }

  effacerFiltresListeDonneesIndexation(): void {
    this.filtresListeDonneesIndexationForm.reset()

    this.initFiltresListeDonneesIndexation()
    this.filtrerListeDonneesIndexation()
  }

  onPaginationChange(event: PaginationEventData): void {
    this.listeDonneesIndexation.currentPage = event.page
    this.listeDonneesIndexation.paginationSize = event.paginationSize

    this.filtrerListeDonneesIndexation(this.listeDonneesIndexation.currentPage, this.listeDonneesIndexation.paginationSize)
  }

  openTacheDetails(donneeIndexation: DonneeIndexation): void {
    if(donneeIndexation.progressionTacheIndexation && donneeIndexation.progressionTacheIndexation.tacheIndexation) {
          this.openTacheDetailsPage(donneeIndexation.progressionTacheIndexation.tacheIndexation.id!, donneeIndexation.progressionTacheIndexation.page!)
    }
    else {
      Swal.fire({
        title: '<h5 class="modal-title">Accès impossible</h5>',
        html: '<div>Une erreur est survenue lors de l\'ouverture de l\'espace d\'indexation</div>',
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

  private openTacheDetailsPage(tacheIndexationId: string, page: number): void {
    this.router.navigate(['/indexation', TypesTacheIndexation.ADMIN, this.typeRegistreId, tacheIndexationId], {
      queryParams: { page: page }
    })
  }

  getFichierRessourceIcone(nomFichier: string): string {
    return getClassWithColor(nomFichier)
  }
  
}
