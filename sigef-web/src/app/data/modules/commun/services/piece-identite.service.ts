import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { PieceIdentite } from '../models/PieceIdentite';

@Injectable({
  providedIn: 'root'
})
export class PieceIdentiteService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/piecesIdentite`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<PieceIdentite>> {
    return this.httpClient.get<PagingData<PieceIdentite>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(filtres?: CustomMapType): Observable<PieceIdentite[]> {
    return this.httpClient.get<PieceIdentite[]>(`${this.SERVICE_URL}`, { params: filtres })
  }

  get(id: string): Observable<PieceIdentite> {
    return this.httpClient.get<PieceIdentite>(`${this.SERVICE_URL}/${id}`)
  }

  create(pieceIdentite: PieceIdentite): Observable<PieceIdentite> {
    return this.httpClient.post<PieceIdentite>(`${this.SERVICE_URL}`, pieceIdentite)
  }

  update(pieceIdentite: PieceIdentite): Observable<PieceIdentite> {
    return this.httpClient.put<PieceIdentite>(`${this.SERVICE_URL}/${pieceIdentite.id!}`, pieceIdentite)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
