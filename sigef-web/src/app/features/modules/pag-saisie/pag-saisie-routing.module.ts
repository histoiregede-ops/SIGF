import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagSaisiePageComponent } from './pages/pag-saisie-page/pag-saisie-page.component';

const routes: Routes = [
  {
    path: '',
    component: PagSaisiePageComponent,
  },
  {
    path: ':id',
    component: PagSaisiePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagSaisieRoutingModule { }
