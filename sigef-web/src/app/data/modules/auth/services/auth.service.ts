import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Utilisateur } from '../models/Utilisateur';
import { StorageTokensService } from '../../../../core/services/storage-tokens.service';
import { SessionStorageService } from '../../../../core/services/session-storage.service';
import { RoleProfil } from '../models/RoleProfil';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.AUTH}`

  constructor(
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private httpClient: HttpClient) { }

  login(utilisateur: Utilisateur): Observable<any> {
    return this.httpClient.post(`${this.SERVICE_URL}/login`, utilisateur)
  }

  register(utilisateur: Utilisateur): Observable<any> {
    const redirectTo: string = window.location.origin + '/auth/confirm'

    let queryParams: HttpParams = new HttpParams()
    queryParams = queryParams.append("redirectTo", redirectTo)

    return this.httpClient.post(`${this.SERVICE_URL}/register`, utilisateur, { params: queryParams })
  }

  updateProfile(id: string, photo: File): Observable<Utilisateur> {
    let formData: FormData = new FormData()
    formData.append('photo', photo, photo.name)

    return this.httpClient.put<Utilisateur>(`${this.SERVICE_URL}`, formData)
  }

  resetPassword(data: { oldPassword: string, password: string }): Observable<any> {
    return this.httpClient.put(`${this.SERVICE_URL}/reset`, data)
  }

  logout(): void {
    this.localStorageService.remove(StorageTokensService.AUTH_REMEMBER_ME);
    this.localStorageService.remove(StorageTokensService.AUTH_TOKEN);
    this.sessionStorageService.remove(StorageTokensService.AUTH_TOKEN);
    
    this.router.navigateByUrl("/auth/connexion");
  }

  getLoggedUser(): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(`${this.SERVICE_URL}/logged-user`).pipe(
      map(value => {
        if (value == null) {
          console.log("eerpo,")
          // this.router.navigateByUrl("/error")
        }
        return value;
      }),
      catchError((err: HttpErrorResponse) => {
        // this.router.navigateByUrl("/error")
        return throwError(err)
      })
    )
  }

  getLoggedUserRoles(): Observable<RoleProfil[]> {
    return this.httpClient.get<RoleProfil[]>(`${this.SERVICE_URL}/logged-user/roles`).pipe(
      map(value => {
        if (value.length == 0) {
          // this.router.navigateByUrl("/error")
        }
        return value;
      }),
      catchError((err: HttpErrorResponse) => {
        // this.router.navigateByUrl("/error")
        return throwError(err)
      })
    )
  }

  getAuthToken(): string | null {
    let token: string | null = null
    const AUTH_REMEMBER_ME: number = Number(this.localStorageService.get(StorageTokensService.AUTH_REMEMBER_ME) ?? 0)  
    if(AUTH_REMEMBER_ME == 1) {
      token = this.localStorageService.get(StorageTokensService.AUTH_TOKEN)
    }
    else {
      token = this.sessionStorageService.get(StorageTokensService.AUTH_TOKEN)
    }

    return token
  }
}
