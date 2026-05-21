import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

import { FormaliteSaisieRoutingModule } from './formalite-saisie-routing.module';
import { FormaliteSaisiePageComponent } from './pages/formalite-saisie-page/formalite-saisie-page.component';


@NgModule({
  declarations: [
    FormaliteSaisiePageComponent
  ],
  imports: [
    CommonModule,
    FormaliteSaisieRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class FormaliteSaisieModule { }
