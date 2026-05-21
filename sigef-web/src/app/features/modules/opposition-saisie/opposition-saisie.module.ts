import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

import { OppositionSaisieRoutingModule } from './opposition-saisie-routing.module';
import { OppositionSaisiePageComponent } from './pages/opposition-saisie-page/opposition-saisie-page.component';


@NgModule({
  declarations: [
    OppositionSaisiePageComponent
  ],
  imports: [
    CommonModule,
    OppositionSaisieRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class OppositionSaisieModule { }
