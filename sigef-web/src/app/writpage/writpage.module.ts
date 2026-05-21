import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WritpageRoutingModule } from './writpage-routing.module';
import { WritpageHomeComponent } from './pages/home/writpage-home.component';
import { WritpageControleursHomeComponent } from './pages/controleurs/writpage-controleurs-home.component';
@NgModule({
  declarations: [
    WritpageHomeComponent,
    WritpageControleursHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WritpageRoutingModule
  ],
  exports: [
    WritpageHomeComponent
  ]
})
export class WritpageModule { }
