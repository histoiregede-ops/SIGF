import { AfterViewInit, Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { AuthenticatedUserService } from '../../../../core/services/authenticated-user.service';
import { RolesIDs } from '../../../../data/enums/RolesIDs';
import { TypesRegistre } from '../../../../data/enums/TypesRegistre';
import { TypesTacheIndexation } from '../../../../data/enums/TypesTacheIndexation';
import { RoleProfil } from '../../../../data/modules/auth/models/RoleProfil';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {

  rolesProfil: RolesIDs[] = []

  readonly rolesIDs = RolesIDs
  readonly typesRegistre = TypesRegistre
  readonly typesTacheIndexation = TypesTacheIndexation

  constructor(
    private authenticatedUserService: AuthenticatedUserService
  ) {
  }

  ngOnInit(): void {
    this.authenticatedUserService.rolesProfil
      .pipe(delay(0))
      .subscribe({
        next: (value: RoleProfil[] | null) => {
          if (value != null) {
this.rolesProfil = value.map(element => element.roleId! as unknown as RolesIDs)
          }
        }
      })
  }
}
