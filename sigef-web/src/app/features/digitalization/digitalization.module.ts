import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DigitalizationRoutingModule } from './digitalization-routing.module';
import { TitleDigitalizationComponent } from './components/title-digitalization.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    DigitalizationRoutingModule
  ]
})
export class DigitalizationModule { }
