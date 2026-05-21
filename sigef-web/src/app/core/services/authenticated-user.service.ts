import { Injectable } from '@angular/core';
import { AuthService } from '../../data/modules/auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Utilisateur } from '../../data/modules/auth/models/Utilisateur';
import { RoleProfil } from '../../data/modules/auth/models/RoleProfil';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserService {

  private _utilisateur = new BehaviorSubject<Utilisateur | null>(null)
  private _rolesProfil = new BehaviorSubject<RoleProfil[] | null>(null)

  constructor() { }

  setUtilisateur(utilisateur: Utilisateur | null): void {
    this._utilisateur.next(utilisateur)
  }

  get utilisateur(): Observable<Utilisateur | null> {
    return this._utilisateur
  }

  setRolesProfil(RolesProfil: RoleProfil[] | null): void {
    this._rolesProfil.next(RolesProfil)
  }

  get rolesProfil(): Observable<RoleProfil[] | null> {
    return this._rolesProfil
  }
}
