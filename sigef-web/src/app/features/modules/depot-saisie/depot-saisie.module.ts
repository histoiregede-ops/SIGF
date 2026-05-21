import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

import { DepotSaisieRoutingModule } from './depot-saisie-routing.module';
import { DepotSaisiePageComponent } from './pages/depot-saisie-page/depot-saisie-page.component';


@NgModule({
  declarations: [
    DepotSaisiePageComponent
  ],
  imports: [
    CommonModule,
    DepotSaisieRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class DepotSaisieModule { }
