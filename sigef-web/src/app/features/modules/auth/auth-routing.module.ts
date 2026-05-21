import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionPageComponent } from './pages/connexion-page/connexion-page.component';
import { InscriptionPageComponent } from './pages/inscription-page/inscription-page.component';
import { AuthLayoutComponent } from '../../layout/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'connexion',
        pathMatch: 'full'
      },
      {
        path: 'connexion',
        component: ConnexionPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'inscription',
        component: InscriptionPageComponent,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
