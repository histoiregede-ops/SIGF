import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormaliteSaisiePageComponent } from './pages/formalite-saisie-page/formalite-saisie-page.component';

const routes: Routes = [
  {
    path: '',
    component: FormaliteSaisiePageComponent
  },
  {
    path: ':id',
    component: FormaliteSaisiePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormaliteSaisieRoutingModule { }
