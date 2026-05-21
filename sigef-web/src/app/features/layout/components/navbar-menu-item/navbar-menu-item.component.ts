import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';

@Component({
  selector: 'app-navbar-menu-item',
  templateUrl: './navbar-menu-item.component.html',
  styleUrl: './navbar-menu-item.component.scss'
})
export class NavbarMenuItemComponent {
  @Input() icon?: string
  @Input() title!: string
  @Input() link!: string
  @Input() linkParams!: Params //{ [key: string]: any }
  @Input() badgeText?: string
  @Input() badgeColor: string = 'danger'
}
