import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsDepotPageComponent } from './pages/details-depot-page/details-depot-page.component';
import { DetailsFormalitePrealablePageComponent } from './pages/details-formalite-prealable-page/details-formalite-prealable-page.component';
import { DetailsOppositionPageComponent } from './pages/details-opposition-page/details-opposition-page.component';
import { DetailsTitreFoncierPageComponent } from './pages/details-titre-foncier-page/details-titre-foncier-page.component';
import { ListeDepotsPageComponent } from './pages/liste-depots-page/liste-depots-page.component';
import { ListeFormalitesPrealablesPageComponent } from './pages/liste-formalites-prealables-page/liste-formalites-prealables-page.component';
import { ListeOppositionsPageComponent } from './pages/liste-oppositions-page/liste-oppositions-page.component';
import { ListeTitresFonciersPageComponent } from './pages/liste-titres-fonciers-page/liste-titres-fonciers-page.component';
import { NouveauDepotPageComponent } from './pages/nouveau-depot-page/nouveau-depot-page.component';
import { NouveauTitreFoncierPageComponent } from './pages/nouveau-titre-foncier-page/nouveau-titre-foncier-page.component';
import { NouvelleFormalitePrealablePageComponent } from './pages/nouvelle-formalite-prealable-page/nouvelle-formalite-prealable-page.component';
import { NouvelleOppositionPageComponent } from './pages/nouvelle-opposition-page/nouvelle-opposition-page.component';
import { ListeRegistresPageComponent } from './pages/liste-registres-page/liste-registres-page.component';
import { ListeDemandesTransfertsPageComponent } from './pages/liste-demandes-transferts-page/liste-demandes-transferts-page.component';
import { NouvelleDemandeTransfertPageComponent } from './pages/nouvelle-demande-transfert-page/nouvelle-demande-transfert-page.component';
import { TraitementDemandeTransfertPageComponent } from './pages/traitement-demande-transfert-page/traitement-demande-transfert-page.component';
import { ListeDemandesEtatsDescriptifsPageComponent } from './pages/liste-demandes-etats-descriptifs-page/liste-demandes-etats-descriptifs-page.component';
import { ListePaiementsPageComponent } from './pages/liste-paiements-page/liste-paiements-page.component';
import { ListeActesRegistrePageComponent } from './pages/liste-actes-registre-page/liste-actes-registre-page.component';
import { NouveauActeRegistrePageComponent } from './pages/nouveau-acte-registre-page/nouveau-acte-registre-page.component';
import { DetailsActeRegistrePageComponent } from './pages/details-acte-registre-page/details-acte-registre-page.component';
import { ListeBordereauxAnalytiquesPageComponent } from './pages/liste-bordereaux-analytiques-page/liste-bordereaux-analytiques-page.component';
import { NouveauBordereauAnalytiquePageComponent } from './pages/nouveau-bordereau-analytique-page/nouveau-bordereau-analytique-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'formalites',
    pathMatch: 'full'
  },

  // Gestion des paiements
  {
    path: 'paiements',
    children: [
      {
        path: '',
        component: ListePaiementsPageComponent,
        pathMatch: 'full'
      },
    ]
  },

  // Gestion des demandes d'états descriptifs
  {
    path: 'etats-descriptifs',
    children: [
      {
        path: '',
        component: ListeDemandesEtatsDescriptifsPageComponent,
        pathMatch: 'full'
      },
      // {
      //   path: 'nouveau',
      //   component: NouvelleDemandeTransfertPageComponent,
      //   pathMatch: 'full'
      // },
      // {
      //   path: ':id/traitement',
      //   component: TraitementDemandeTransfertPageComponent,
      //   pathMatch: 'full'
      // },
    ],
  },
  
  // Gestion des transferts
  {
    path: 'transferts',
    children: [
      {
        path: ':type',
        children: [
          {
            path: '',
            component: ListeDemandesTransfertsPageComponent,
            pathMatch: 'full'
          },
          {
            path: 'nouveau',
            component: NouvelleDemandeTransfertPageComponent,
            pathMatch: 'full'
          },
          {
            path: ':id/traitement',
            component: TraitementDemandeTransfertPageComponent,
            pathMatch: 'full'
          },
        ]
      },
    ],
  },

  // Gestion des registres
  {
    path: 'registres',
    children: [
      {
        path: ':type',
        component: ListeRegistresPageComponent,
        pathMatch: 'full'
      },
    ],
  },

  {
    path: 'formalites',
    children: [
      {
        path: '',
        component: ListeFormalitesPrealablesPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'nouveau',
        component: NouvelleFormalitePrealablePageComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: DetailsFormalitePrealablePageComponent,
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'oppositions',
    children: [
      {
        path: '',
        component: ListeOppositionsPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'nouveau',
        component: NouvelleOppositionPageComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: DetailsOppositionPageComponent,
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'depots',
    children: [
      {
        path: '',
        component: ListeDepotsPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'nouveau',
        component: NouveauDepotPageComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: DetailsDepotPageComponent,
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'titres-fonciers',
    children: [
      {
        path: '',
        component: ListeTitresFonciersPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'nouveau',
        component: NouveauTitreFoncierPageComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: DetailsTitreFoncierPageComponent,
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'actes',
    children: [
      {
        path: '',
        component: ListeActesRegistrePageComponent,
        pathMatch: 'full'
      },
      {
        path: 'nouveau',
        component: NouveauActeRegistrePageComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: DetailsActeRegistrePageComponent,
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'bordereaux',
    children: [
      {
        path: '',
        component: ListeBordereauxAnalytiquesPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'nouveau',
        component: NouveauBordereauAnalytiquePageComponent,
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionDossiersRoutingModule { }
