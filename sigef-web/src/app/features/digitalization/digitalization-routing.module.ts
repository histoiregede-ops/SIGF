import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleDigitalizationComponent } from './components/title-digitalization.component';

const routes: Routes = [
  {
    path: '',
    component: TitleDigitalizationComponent
  },
  {
    path: ':id',
    component: TitleDigitalizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalizationRoutingModule { }
