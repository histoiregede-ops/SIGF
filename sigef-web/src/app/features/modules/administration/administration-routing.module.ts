import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeRegionsPageComponent } from './pages/liste-regions-page/liste-regions-page.component';
import { ListePeriodesPageComponent } from './pages/liste-periodes-page/liste-periodes-page.component';
import { ListePrefecturesPageComponent } from './pages/liste-prefectures-page/liste-prefectures-page.component';
import { ListeCommunesPageComponent } from './pages/liste-communes-page/liste-communes-page.component';
import { ListeCantonsPageComponent } from './pages/liste-cantons-page/liste-cantons-page.component';
import { ListeQuartiersPageComponent } from './pages/liste-quartiers-page/liste-quartiers-page.component';
import { ListeTypesRegistrePageComponent } from './pages/liste-types-registre-page/liste-types-registre-page.component';
import { ListeQualitesDocumentPageComponent } from './pages/liste-qualites-document-page/liste-qualites-document-page.component';
import { ListeUtilisateursPageComponent } from './pages/liste-utilisateurs-page/liste-utilisateurs-page.component';
import { ListeProfilsPageComponent } from './pages/liste-profils-page/liste-profils-page.component';
import { ListeRolesPageComponent } from './pages/liste-roles-page/liste-roles-page.component';
import { ListeCivilitesPageComponent } from './pages/liste-civilites-page/liste-civilites-page.component';
import { ListeNationalitesPageComponent } from './pages/liste-nationalites-page/liste-nationalites-page.component';
import { ListeProfessionsPageComponent } from './pages/liste-professions-page/liste-professions-page.component';
import { ListeFormesJuridiquesPageComponent } from './pages/liste-formes-juridiques-page/liste-formes-juridiques-page.component';
import { ListeSecteursActivitePageComponent } from './pages/liste-secteurs-activite-page/liste-secteurs-activite-page.component';
import { ListeTypesPersonneMoralePageComponent } from './pages/liste-types-personne-morale-page/liste-types-personne-morale-page.component';
import { ListeNaturesRelationLegalePageComponent } from './pages/liste-natures-relation-legale-page/liste-natures-relation-legale-page.component';
import { ListeLiensGroupePageComponent } from './pages/liste-liens-groupe-page/liste-liens-groupe-page.component';
import { InformationsPageComponent } from './pages/informations-page/informations-page.component';
import { LogoPageComponent } from './pages/logo-page/logo-page.component';
import { ListeVillagesPageComponent } from './pages/liste-villages-page/liste-villages-page.component';
import { ListeVillesPageComponent } from './pages/liste-villes-page/liste-villes-page.component';
import { ListeCentresConservationFoncierePageComponent } from './pages/liste-centres-conservation-fonciere-page/liste-centres-conservation-fonciere-page.component';
import { ListePiecesIdentitePageComponent } from './pages/liste-pieces-identite-page/liste-pieces-identite-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'prefix'
  },

  // Général
  {
    path: 'general',
    children: [
      {
        path: '',
        redirectTo: 'informations',
        pathMatch: 'prefix'
      },

      // Informations
      {
        path: 'informations',
        component: InformationsPageComponent,
        pathMatch: 'full'
      },

      // Logo
      {
        path: 'logo',
        component: LogoPageComponent,
        pathMatch: 'full'
      },

    ]
  },

  // Sécurité
  {
    path: 'securite',
    children: [
      {
        path: '',
        redirectTo: 'utilisateurs',
        pathMatch: 'prefix'
      },

      // Centres
      {
        path: 'centres',
        component: ListeCentresConservationFoncierePageComponent,
        pathMatch: 'full'
      },


      // Utilisateurs
      {
        path: 'utilisateurs',
        component: ListeUtilisateursPageComponent,
        pathMatch: 'full'
      },

      // Profils
      {
        path: 'profils',
        component: ListeProfilsPageComponent,
        pathMatch: 'full'
      },

      // Roles
      {
        path: 'roles',
        component: ListeRolesPageComponent,
        pathMatch: 'full'
      },
    ]
  },

  // Paramétrage
  {
    path: 'parametrage',
    children: [
      {
        path: '',
        redirectTo: 'types-registre',
        pathMatch: 'prefix'
      },

      // Types de registre
      {
        path: 'types-registre',
        component: ListeTypesRegistrePageComponent,
        pathMatch: 'full'
      },

      // Qualités de document
      {
        path: 'qualites-document',
        component: ListeQualitesDocumentPageComponent,
        pathMatch: 'full'
      },

      // Situations
      {
        path: 'situations',
        children: [
          {
            path: '',
            redirectTo: 'periodes',
            pathMatch: 'prefix'
          },
          {
            path: 'periodes',
            component: ListePeriodesPageComponent,
            pathMatch: 'full'
          },
          {
            path: 'regions',
            component: ListeRegionsPageComponent,
            pathMatch: 'full'
          },
          {
            path: 'prefectures',
            component: ListePrefecturesPageComponent,
            pathMatch: 'full'
          },
          {
            path: 'communes',
            component: ListeCommunesPageComponent,
            pathMatch: 'full'
          },
          {
            path: 'cantons',
            component: ListeCantonsPageComponent,
            pathMatch: 'full'
          },
          {
            path: 'villages',
            component: ListeVillagesPageComponent,
            pathMatch: 'full'
          },
          {
            path: 'villes',
            component: ListeVillesPageComponent,
            pathMatch: 'full'
          },
          {
            path: 'quartiers',
            component: ListeQuartiersPageComponent,
            pathMatch: 'full'
          },
        ]
      },

      // Parties prenantes
      {
        path: 'parties-prenantes',
        children: [
          {
            path: '',
            redirectTo: 'civilites',
            pathMatch: 'prefix'
          },
          {
            path: 'civilites',
            component: ListeCivilitesPageComponent,
            pathMatch: 'full'
          },
          {
            path: 'nationalites',
            component: ListeNationalitesPageComponent,
            pathMatch: 'full'
          },
          {
            path: 'professions',
            component: ListeProfessionsPageComponent,
            pathMatch: 'full'
          },
          {
            path: 'formes-juridiques',
            component: ListeFormesJuridiquesPageComponent,
            pathMatch: 'full'
          },
          {
            path: 'secteurs-activite',
            component: ListeSecteursActivitePageComponent,
            pathMatch: 'full'
          },
          {
            path: 'types-personne-morale',
            component: ListeTypesPersonneMoralePageComponent,
            pathMatch: 'full'
          },
          {
            path: 'liens-groupe',
            component: ListeLiensGroupePageComponent,
            pathMatch: 'full'
          },
          {
            path: 'natures-relation-legale',
            component: ListeNaturesRelationLegalePageComponent,
            pathMatch: 'full'
          },
          {
            path: 'pieces-identite',
            component: ListePiecesIdentitePageComponent,
            pathMatch: 'full'
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
