import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-menu-group',
  templateUrl: './navbar-menu-group.component.html',
  styleUrl: './navbar-menu-group.component.scss'
})
export class NavbarMenuGroupComponent {
  @Input() icon?: string
  @Input() title!: string
  @Input() menuGroupId!: string

}
