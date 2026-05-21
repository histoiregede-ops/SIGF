import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunRoutingModule } from './commun-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    CommunRoutingModule,
    SharedModule
  ]
})
export class CommunModule { }
