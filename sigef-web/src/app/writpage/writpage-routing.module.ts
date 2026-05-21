import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WritpageHomeComponent } from './pages/home/writpage-home.component';

import { WritpageControleursHomeComponent } from './pages/controleurs/writpage-controleurs-home.component';

const routes: Routes = [
  {
    path: '',
    component: WritpageHomeComponent
  },
  {
    path: 'controleurs',
    component: WritpageControleursHomeComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WritpageRoutingModule { }

