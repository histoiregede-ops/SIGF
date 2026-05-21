import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeDocumentsPageComponent } from './pages/liste-documents-page/liste-documents-page.component';
import { ListeIndexeursPageComponent } from './pages/liste-indexeurs-page/liste-indexeurs-page.component';
import { ListeControleursPageComponent } from './pages/liste-controleurs-page/liste-controleurs-page.component';
import { ListeAttributionsLotsPageComponent } from './pages/liste-attributions-lots-page/liste-attributions-lots-page.component';
import { ListeCategorieLotsPageComponent } from './pages/liste-categorie-lots-page/liste-categorie-lots-page.component';
import { DefaultLayoutComponent } from '../../layout/layouts/default-layout/default-layout.component';
import { SaisieIndexationLayoutComponent } from '../../layout/layouts/saisie-indexation-layout/saisie-indexation-layout.component';
import { EspaceIndexationPageComponent } from './pages/espace-indexation-page/espace-indexation-page.component';
import { ListeTachesIndexationPageComponent } from './pages/liste-taches-indexation-page/liste-taches-indexation-page.component';
import { StatistiquesIndexationPageComponent } from './pages/statistiques-indexation-page/statistiques-indexation-page.component';
import { ListeDonneesPageComponent } from './pages/liste-donnees-page/liste-donnees-page.component';
import { SaisieDonneesActesPageComponent } from './pages/saisie-donnees-actes-page/saisie-donnees-actes-page.component';

const routes: Routes = [
  // Espace gestion
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      // Gestion des données
      {
        path: 'donnees',
        children: [
          {
            path: ':type',
            component: ListeDonneesPageComponent,
            pathMatch: 'full'
          },
        ],
      },

      // Gestion des documents
      {
        path: 'documents',
        children: [
          {
            path: ':type',
            component: ListeDocumentsPageComponent,
            pathMatch: 'full'
          },
        ],
      },

      // Attribution des lots
      {
        path: 'lots',
        children: [
          {
            path: ':type',
            component: ListeAttributionsLotsPageComponent,
            pathMatch: 'full'
          },
        ],
      },

      // Tâches de saisie et de contrôle
      {
        path: 'taches',
        children: [
          {
            path: ':tache',
            children: [
              {
                path: ':type',
                component: ListeTachesIndexationPageComponent,
                pathMatch: 'full'
              },
            ]
          }
        ],
      },


      // Gestion des utilisateurs
      {
        path: 'utilisateurs',
        children: [
          {
            path: 'indexeurs',
            component: ListeIndexeursPageComponent,
            pathMatch: 'full',
          },
          {
            path: 'controleurs',
            component: ListeControleursPageComponent,
            pathMatch: 'full',
          },
        ],
      },

      // Statistiques
      {
        path: 'stats',
        children: [
          {
            path: '',
            component: StatistiquesIndexationPageComponent,
            pathMatch: 'full',
          },
        ],
      },
    ]
  },

  // Espace Indexation
  {
    path: '',
    component: SaisieIndexationLayoutComponent,
    children: [
      // Saisie et contrôle - redirigés vers la liste des tâches
      {
        path: 'saisie',
        component: SaisieDonneesActesPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'saisie/:type',
        component: SaisieDonneesActesPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'controle',
        component: SaisieDonneesActesPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'controle/:type',
        component: SaisieDonneesActesPageComponent,
        pathMatch: 'full'
      },
      {
        path: ':tache',
        children: [
          // Saisie des données
          {
            path: ':type',
            children: [
              {
                path: ':id',
                component: EspaceIndexationPageComponent,
                pathMatch: 'full'
              },
            ]
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
export class IndexationRoutingModule { }
