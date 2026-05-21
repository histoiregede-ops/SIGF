import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-menu-title',
  templateUrl: './navbar-menu-title.component.html',
  styleUrl: './navbar-menu-title.component.scss'
})
export class NavbarMenuTitleComponent {
  @Input() title!: string
}
