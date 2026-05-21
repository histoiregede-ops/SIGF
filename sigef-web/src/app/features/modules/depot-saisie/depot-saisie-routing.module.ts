import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepotSaisiePageComponent } from './pages/depot-saisie-page/depot-saisie-page.component';

const routes: Routes = [
  {
    path: '',
    component: DepotSaisiePageComponent
  },
  {
    path: ':id',
    component: DepotSaisiePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepotSaisieRoutingModule { }
