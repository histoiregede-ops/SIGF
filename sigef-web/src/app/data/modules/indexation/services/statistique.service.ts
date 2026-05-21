import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { Utilisateur } from '../../auth/models/Utilisateur';

export type StatistiquesGlobales = {
  injectes: { total: number, pourcentage: number }
  assignes: { total: number, pourcentage: number }
  indexes: { total: number, pourcentage: number }
  controles: { total: number, pourcentage: number }
}

export type StatistiquesIndexation = {
  assignes: { total: number, pourcentage: number }
  aIndexer: { total: number, pourcentage: number }
  enCours: { total: number, pourcentage: number }
  indexes: { total: number, pourcentage: number }
}

export type StatistiquesControle = {
  assignes: { total: number, pourcentage: number }
  aControler: { total: number, pourcentage: number }
  enCours: { total: number, pourcentage: number }
  controles: { total: number, pourcentage: number }
}

export type StatistiquesSuiviJournalier = {
  dates: Date[]
  indexees: number[]
  signalees: number[]
  rejetees: number[]
  validees: number[]
}

export type StatistiquesQuotasParOperateur = {
  operateur: Utilisateur
  quota: number
  derniereActivite?: Date
}

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.INDEXATION}/statistiques`

  constructor(private httpClient: HttpClient) { }

  getStatistiquesGlobales(filtres?: CustomMapType): Observable<StatistiquesGlobales> {
    return this.httpClient.get<StatistiquesGlobales>(`${this.SERVICE_URL}/globales`, { params: filtres })
  }

  getStatistiquesIndexation(filtres?: CustomMapType): Observable<StatistiquesIndexation> {
    return this.httpClient.get<StatistiquesIndexation>(`${this.SERVICE_URL}/indexation`, { params: filtres })
  }

  getStatistiquesControle(filtres?: CustomMapType): Observable<StatistiquesControle> {
    return this.httpClient.get<StatistiquesControle>(`${this.SERVICE_URL}/controle`, { params: filtres })
  }

  getStatistiquesSuiviJournalier(filtres?: CustomMapType): Observable<StatistiquesSuiviJournalier> {
    return this.httpClient.get<StatistiquesSuiviJournalier>(`${this.SERVICE_URL}/suiviJournalier`, { params: filtres })
  }

  getStatistiquesQuotasParIndexeur(filtres?: CustomMapType): Observable<StatistiquesQuotasParOperateur[]> {
    return this.httpClient.get<StatistiquesQuotasParOperateur[]>(`${this.SERVICE_URL}/quotas/indexation`, { params: filtres })
  }

  getStatistiquesQuotasParControleur(filtres?: CustomMapType): Observable<StatistiquesQuotasParOperateur[]> {
    return this.httpClient.get<StatistiquesQuotasParOperateur[]>(`${this.SERVICE_URL}/quotas/controle`, { params: filtres })
  }
}
