import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Fichier } from '../models/Fichier';
import { TypesRegistre } from '../../../enums/TypesRegistre';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FichierService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.INDEXATION}/fichiers`

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getAll(page?: number, paginationSize?: number, typeRegistreId?: TypesRegistre, withProgression: boolean = false, filtres?: CustomMapType): Observable<PagingData<Fichier>> {
    return this.httpClient.get<PagingData<Fichier>>(
      `${this.SERVICE_URL}?page=${page}&size=${paginationSize}&typeRegistreId=${typeRegistreId}&withProgression=${Number(withProgression)}`,
      { params: filtres }
    )
  }

  get(id: string): Observable<Fichier> {
    return this.httpClient.get<Fichier>(`${this.SERVICE_URL}/${id}`)
  }

  getContenu(id: string): Observable<Blob> {
    const token = this.authService.getAuthToken()
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined

    return this.httpClient.get(`${this.SERVICE_URL}/${id}/contenu`, {
      responseType: 'blob',
      headers
    })
  }

  create(fichier: Fichier, fic: File | undefined): Observable<HttpEvent<any>> {
    let formData = new FormData()

    if (fichier.nom != null) formData.append('nom', fichier.nom);
    if (fichier.description != null) formData.append('description', fichier.description);
    if (fichier.indexable != null) formData.append('indexable', fichier.indexable.toString());
    if (fichier.typeRegistreId != null) formData.append('typeRegistreId', fichier.typeRegistreId);
    if (fichier.tailleEnOctets != null) formData.append('tailleEnOctets', fichier.tailleEnOctets.toString());
    if (fichier.dossierId != null) formData.append('dossierId', fichier.dossierId);
    if (fichier.regionId != null) formData.append('regionId', fichier.regionId);
    if (fic) formData.append('fichier', fic, fic.name);

    const token = this.authService.getAuthToken()
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined

    console.log(fichier, formData)

    const httpRequest = new HttpRequest('POST', `${this.SERVICE_URL}`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request<HttpEvent<any>>(httpRequest)
    // return this.httpClient.post<Fichier>(`${this.SERVICE_URL}`, formData)
  }

  update(fichier: Fichier): Observable<Fichier> {
    return this.httpClient.put<Fichier>(`${this.SERVICE_URL}/${fichier.id!}`, fichier)
  }

  updateContenu(fichier: Fichier, fic: File | undefined): Observable<HttpEvent<any>> {
    let formData = new FormData()

    if (fichier.tailleEnOctets != null) formData.append('tailleEnOctets', fichier.tailleEnOctets.toString())
    if (fic) formData.append('fichier', fic, fic.name)

    const token = this.authService.getAuthToken()
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined

    const httpRequest = new HttpRequest('PUT', `${this.SERVICE_URL}/${fichier.id!}/contenu`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request<HttpEvent<any>>(httpRequest)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
