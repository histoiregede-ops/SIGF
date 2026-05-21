import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { ListeRegionsPageComponent } from './pages/liste-regions-page/liste-regions-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { ListePeriodesPageComponent } from './pages/liste-periodes-page/liste-periodes-page.component';
import { ListePrefecturesPageComponent } from './pages/liste-prefectures-page/liste-prefectures-page.component';
import { ListeCommunesPageComponent } from './pages/liste-communes-page/liste-communes-page.component';
import { ListeCantonsPageComponent } from './pages/liste-cantons-page/liste-cantons-page.component';
import { ListeQuartiersPageComponent } from './pages/liste-quartiers-page/liste-quartiers-page.component';
import { ListeQualitesDocumentPageComponent } from './pages/liste-qualites-document-page/liste-qualites-document-page.component';
import { ListeTypesRegistrePageComponent } from './pages/liste-types-registre-page/liste-types-registre-page.component';
import { ListeUtilisateursPageComponent } from './pages/liste-utilisateurs-page/liste-utilisateurs-page.component';
import { ListeRolesPageComponent } from './pages/liste-roles-page/liste-roles-page.component';
import { ListeProfilsPageComponent } from './pages/liste-profils-page/liste-profils-page.component';
import { ListeCivilitesPageComponent } from './pages/liste-civilites-page/liste-civilites-page.component';
import { ListeNationalitesPageComponent } from './pages/liste-nationalites-page/liste-nationalites-page.component';
import { ListeProfessionsPageComponent } from './pages/liste-professions-page/liste-professions-page.component';
import { ListeFormesJuridiquesPageComponent } from './pages/liste-formes-juridiques-page/liste-formes-juridiques-page.component';
import { ListeSecteursActivitePageComponent } from './pages/liste-secteurs-activite-page/liste-secteurs-activite-page.component';
import { ListeTypesPersonneMoralePageComponent } from './pages/liste-types-personne-morale-page/liste-types-personne-morale-page.component';
import { ListeLiensGroupePageComponent } from './pages/liste-liens-groupe-page/liste-liens-groupe-page.component';
import { ListeNaturesRelationLegalePageComponent } from './pages/liste-natures-relation-legale-page/liste-natures-relation-legale-page.component';
import { LogoPageComponent } from './pages/logo-page/logo-page.component';
import { InformationsPageComponent } from './pages/informations-page/informations-page.component';
import { ListeVillesPageComponent } from './pages/liste-villes-page/liste-villes-page.component';
import { ListeVillagesPageComponent } from './pages/liste-villages-page/liste-villages-page.component';
import { ListeLimitesPageComponent } from './pages/liste-limites-page/liste-limites-page.component';
import { ListeModesAcquisitionPageComponent } from './pages/liste-modes-acquisition-page/liste-modes-acquisition-page.component';
import { ListeModesAlienationPageComponent } from './pages/liste-modes-alienation-page/liste-modes-alienation-page.component';
import { ListeCentresConservationFoncierePageComponent } from './pages/liste-centres-conservation-fonciere-page/liste-centres-conservation-fonciere-page.component';
import { ListePiecesIdentitePageComponent } from './pages/liste-pieces-identite-page/liste-pieces-identite-page.component';

@NgModule({
  declarations: [
    ListeRegionsPageComponent,
    ListePeriodesPageComponent,
    ListePrefecturesPageComponent,
    ListeCommunesPageComponent,
    ListeCantonsPageComponent,
    ListeQuartiersPageComponent,
    ListeQualitesDocumentPageComponent,
    ListeTypesRegistrePageComponent,
    ListeUtilisateursPageComponent,
    ListeRolesPageComponent,
    ListeProfilsPageComponent,
    ListeCivilitesPageComponent,
    ListeNationalitesPageComponent,
    ListeProfessionsPageComponent,
    ListeFormesJuridiquesPageComponent,
    ListeSecteursActivitePageComponent,
    ListeTypesPersonneMoralePageComponent,
    ListeLiensGroupePageComponent,
    ListeNaturesRelationLegalePageComponent,
    LogoPageComponent,
    InformationsPageComponent,
    ListeVillesPageComponent,
    ListeVillagesPageComponent,
    ListeLimitesPageComponent,
    ListeModesAcquisitionPageComponent,
    ListeModesAlienationPageComponent,
    ListeCentresConservationFoncierePageComponent,
    ListePiecesIdentitePageComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule
  ]
})
export class AdministrationModule { }
