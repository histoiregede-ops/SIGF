import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../data/modules/auth/services/auth.service';
import { Utilisateur } from '../../../../data/modules/auth/models/Utilisateur';
import { AuthenticatedUserService } from '../../../../core/services/authenticated-user.service';
import { delay } from 'rxjs';
import { Location } from '@angular/common';
import { AppConfigurationService } from '../../../../core/services/app-configuration.service';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrl: './navbar-header.component.scss'
})
export class NavbarHeaderComponent implements OnInit {

  @Input() showMenuButton: boolean = true
  @Input() showBackButton: boolean = false
  @Input() fluidLayout: boolean = false
  @Input() primary: boolean = false
  // expandedMenu: boolean = true

  error: boolean = false
  utilisateur?: Utilisateur

  constructor(
    private location: Location,
    private authService: AuthService,
    private authenticatedUserService: AuthenticatedUserService,
    private appConfigurationService: AppConfigurationService,
  ) {
    document.addEventListener("fullscreenchange", (event) => {
      if (document.fullscreenElement) {
        document.body.classList.add("fullscreen-enable")
      }
      else {
        document.body.classList.remove("fullscreen-enable")
      }
    })
  }

  ngOnInit(): void {
    this.authenticatedUserService.utilisateur
      .pipe(delay(0))
      .subscribe({
        next: (value: Utilisateur | null) => {
          if (value != null) {
            this.utilisateur = value
          }
        }
      })
  }

  toggleThemeMode(): void {
    this.appConfigurationService.updateTheme()
  }

  toggleFullScreen(): void {
    this.appConfigurationService.configFullScreen()
  }

  toggleMenu(): void {
    this.appConfigurationService.updateMenu()
  }

  goBack(): void {
    this.location.back()
  }

  deconnecterUtilisateur(): void {
    this.authService.logout()
  }
}
