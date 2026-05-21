import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OppositionSaisiePageComponent } from './pages/opposition-saisie-page/opposition-saisie-page.component';

const routes: Routes = [
  {
    path: '',
    component: OppositionSaisiePageComponent
  },
  {
    path: ':id',
    component: OppositionSaisiePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OppositionSaisieRoutingModule { }
