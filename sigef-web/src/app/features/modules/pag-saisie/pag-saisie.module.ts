import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { PagSaisieRoutingModule } from './pag-saisie-routing.module';
import { PagSaisiePageComponent } from './pages/pag-saisie-page/pag-saisie-page.component';

@NgModule({
  declarations: [
    PagSaisiePageComponent,
  ],
  imports: [
    SharedModule,
    PagSaisieRoutingModule,
  ]
})
export class PagSaisieModule { }
