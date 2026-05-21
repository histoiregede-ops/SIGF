import { AfterViewInit, Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { TypesRegistre } from '../../../../data/enums/TypesRegistre';
import { AuthenticatedUserService } from '../../../../core/services/authenticated-user.service';
import { RoleProfil } from '../../../../data/modules/auth/models/RoleProfil';
import { RolesIDs } from '../../../../data/enums/RolesIDs';
import { TypesTacheIndexation } from '../../../../data/enums/TypesTacheIndexation';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent implements OnInit {

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
