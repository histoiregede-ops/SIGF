import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { Utilisateur } from '../models/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  private readonly SERVICE_URL: string = `${environment.API_MODULES.AUTH}/utilisateurs`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Utilisateur>> {
    return this.httpClient.get<PagingData<Utilisateur>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(filtres?: CustomMapType): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(`${this.SERVICE_URL}`, { params: filtres })
  }

  get(id: string): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(`${this.SERVICE_URL}/${id}`)
  }

  register(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>(`${this.SERVICE_URL}`, utilisateur)
  }

  update(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`${this.SERVICE_URL}/${utilisateur.id!}`, utilisateur)
  }

  updateMotDePasse(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`${this.SERVICE_URL}/${utilisateur.id!}/password`, utilisateur)
  }

  updateActif(id: string): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`${this.SERVICE_URL}/${id}/actif`, {})
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
