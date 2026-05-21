import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PieceDeposee } from '../models/PieceDeposee';

@Injectable({
  providedIn: 'root'
})
export class PieceDeposeeService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/piecesDeposees`

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<PieceDeposee[]> {
    return this.httpClient.get<PieceDeposee[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<PieceDeposee> {
    return this.httpClient.get<PieceDeposee>(`${this.SERVICE_URL}/${id}`)
  }

  create(pieceDeposee: PieceDeposee, fichier: File | undefined): Observable<PieceDeposee> {
    let formData = new FormData()
    if (pieceDeposee.nom) {
      formData.append('nom', pieceDeposee.nom)
    }

    if (pieceDeposee.description) {
      formData.append('description', pieceDeposee.description)
    }

    if (fichier) {
      formData.append('fichier', fichier, fichier.name)
    }

    if (pieceDeposee.oppositionId) {
      formData.append('oppositionId', pieceDeposee.oppositionId)
    }

    if (pieceDeposee.depotId) {
      formData.append('depotId', pieceDeposee.depotId)
    }

    return this.httpClient.post<PieceDeposee>(`${this.SERVICE_URL}`, formData)
  }

  update(pieceDeposee: PieceDeposee): Observable<PieceDeposee> {
    return this.httpClient.put<PieceDeposee>(`${this.SERVICE_URL}/${pieceDeposee.id!}`, pieceDeposee)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
