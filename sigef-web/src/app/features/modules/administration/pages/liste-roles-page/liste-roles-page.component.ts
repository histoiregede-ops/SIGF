import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Role } from '../../../../../data/modules/auth/models/Role';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { RoleService } from '../../../../../data/modules/auth/services/role.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-roles-page',
  templateUrl: './liste-roles-page.component.html',
  styleUrl: './liste-roles-page.component.scss'
})
export class ListeRolesPageComponent {

  listeRoles: PagingData<Role> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeRoles: boolean = false
  filtresListeRolesForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private roleService: RoleService,
  ) {
    this.getRoles()
  }

  getRoles(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeRolesForm.value)

    this.roleService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Role>) => {
          console.log(value)
          this.listeRoles = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des rôles' })
        }
      })
  }

  annulerRechercheRole(): void {
    this.filtresListeRolesForm.get('search')!.setValue(null)
    this.filtrerListeRoles()
  }

  filtrerListeRoles(page?: number, paginationSize?: number): void {
    this.getRoles({ page: this.listeRoles.currentPage, paginationSize: this.listeRoles.paginationSize! })
  }

  effacerFiltresListeRoles(): void {
    this.filtresListeRolesForm.reset()

    this.filtrerListeRoles()
  }


}
