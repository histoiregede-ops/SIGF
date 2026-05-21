import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.AUTH}/roles`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Role>> {
    return this.httpClient.get<PagingData<Role>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Role> {
    return this.httpClient.get<Role>(`${this.SERVICE_URL}/${id}`)
  }
}
