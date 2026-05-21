import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './features/layout/layouts/default-layout/default-layout.component';
import { NotFoundPageComponent } from './features/pages/not-found-page/not-found-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ServerErrorPageComponent } from './features/pages/server-error-page/server-error-page.component';

const routes: Routes = [
  // Auth
  {
    path: 'auth',
    loadChildren: () => import('./features/modules/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      // Commun
      {
        path: '',
        loadChildren: () => import('./features/modules/commun/commun.module').then(m => m.CommunModule),
        canLoad: [AuthGuard],
      },

      // Gestion des dossiers
      {
        path: 'dossiers',
        loadChildren: () => import('./features/modules/gestion-dossiers/gestion-dossiers.module').then(m => m.GestionDossiersModule),
        canLoad: [AuthGuard],
      },

      // Module Admin
      {
        path: 'admin',
        loadChildren: () => import('./features/modules/administration/administration.module').then(m => m.AdministrationModule),
        canLoad: [AuthGuard],
      },

    ]
  },

  // PAG - Page d'Avis de Gestion (sans sidebar)
  {
    path: 'pag',
    loadChildren: () => import('./features/modules/pag-saisie/pag-saisie.module').then(m => m.PagSaisieModule),
    canLoad: [AuthGuard],
  },

  // Indexation
  {
    path: 'indexation',
    loadChildren: () => import('./features/modules/indexation/indexation.module').then(m => m.IndexationModule),
    canLoad: [AuthGuard],
  },

  // Digitalisation de Titre Foncier
  {
    path: 'digitalization',
    loadChildren: () => import('./features/digitalization/digitalization.module').then(m => m.DigitalizationModule),
    canLoad: [AuthGuard],
  },
  
  // Oppositions
  {
    path: 'oppositions',
    loadChildren: () => import('./features/modules/opposition-saisie/opposition-saisie.module').then(m => m.OppositionSaisieModule),
    canLoad: [AuthGuard],
  },

  // Formalités
  {
    path: 'formalites',
    loadChildren: () => import('./features/modules/formalite-saisie/formalite-saisie.module').then(m => m.FormaliteSaisieModule),
    canLoad: [AuthGuard],
  },

  // Dépôts
  {
    path: 'depots',
    loadChildren: () => import('./features/modules/depot-saisie/depot-saisie.module').then(m => m.DepotSaisieModule),
    canLoad: [AuthGuard],
  },

  // Writpage - Digital Monolith Homepage
  {
    path: 'writpage',
    loadChildren: () => import('./writpage/writpage.module').then(m => m.WritpageModule),
    canLoad: [AuthGuard],
  },

  // // Module Admin (commented)
  // {
  //   path: 'admin',
  //   children: [
  //     // Commun
  //     {
  //       path: '',
  //       component: AdminLayoutComponent,
  //       loadChildren: () => import('./features/modules/administration/administration.module').then(m => m.AdministrationModule),
  //       canLoad: [AuthGuard],
  //     },
  //   ]
  // },

  // Internal Server error: 500
  {
    path: '500',
    component: ServerErrorPageComponent,
    pathMatch: 'full'
  },

  // Error
  {
    path: 'error',
    component: ServerErrorPageComponent,
    pathMatch: 'full'
  },

  // Not found
  {
    path: '**',
    component: NotFoundPageComponent,
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

