import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ConnexionPageComponent } from './pages/connexion-page/connexion-page.component';
import { InscriptionPageComponent } from './pages/inscription-page/inscription-page.component';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ConnexionPageComponent,
    InscriptionPageComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
