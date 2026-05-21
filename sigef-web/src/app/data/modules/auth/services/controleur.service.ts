import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { Utilisateur } from '../models/Utilisateur';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class ControleurService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.AUTH}/controleurs`

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

  // register(controleur: Utilisateur): Observable<Utilisateur> {
  //   return this.httpClient.post<Utilisateur>(`${this.SERVICE_URL}`, controleur)
  // }

  update(controleur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`${this.SERVICE_URL}/${controleur.id!}`, controleur)
  }

  updateMotDePasse(controleur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`${this.SERVICE_URL}/${controleur.id!}/password`, controleur)
  }

  updateActif(id: string): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`${this.SERVICE_URL}/${id}/actif`, {})
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
