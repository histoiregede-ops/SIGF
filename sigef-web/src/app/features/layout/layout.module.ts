import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarMenuItemComponent } from './components/navbar-menu-item/navbar-menu-item.component';
import { NavbarMenuTitleComponent } from './components/navbar-menu-title/navbar-menu-title.component';
import { NavbarMenuGroupComponent } from './components/navbar-menu-group/navbar-menu-group.component';
import { NavbarHeaderComponent } from './components/navbar-header/navbar-header.component';
import { SharedModule } from '../../shared/shared.module';
import { SaisieIndexationLayoutComponent } from './layouts/saisie-indexation-layout/saisie-indexation-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';



@NgModule({
  declarations: [
    // Layouts
    DefaultLayoutComponent,
    AuthLayoutComponent,
    SaisieIndexationLayoutComponent,
    AdminLayoutComponent,

    // Components
    NavbarMenuItemComponent,
    NavbarMenuTitleComponent,
    NavbarMenuGroupComponent,
    NavbarHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    // Layouts
    DefaultLayoutComponent,
    AuthLayoutComponent,
    SaisieIndexationLayoutComponent,
    AdminLayoutComponent,
  ]
})
export class LayoutModule { }
