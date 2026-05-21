import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { StorageTokensService } from './storage-tokens.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {

  public isMenuOpened$ = new BehaviorSubject<boolean>(false);

  constructor(
    private sessionStorageService: SessionStorageService,
  ) { }

  updateTheme(): void {
    if (document.documentElement.hasAttribute("data-bs-theme")) {
      const theme = document.documentElement.getAttribute("data-bs-theme")

      if (theme == 'dark') {
        document.documentElement.setAttribute("data-bs-theme", 'light')
        this.sessionStorageService.set(StorageTokensService.DATA_BS_THEME, 'light')
      }
      else {
        document.documentElement.setAttribute("data-bs-theme", 'dark')
        this.sessionStorageService.set(StorageTokensService.DATA_BS_THEME, 'dark')
      }
    }
    window.dispatchEvent(new Event("resize"))
  }

  configFullScreen(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    else {
      document.documentElement.requestFullscreen()
    }
  }

  updateMenu(): void {
    // this.expandedMenu = !this.expandedMenu
    // console.log(this.expandedMenu)

    // Récupère la largeur de la fenêtre
    var clientWidth = document.documentElement.clientWidth;
    var layout = document.documentElement.getAttribute("data-layout");

    // Pour les écrans larges (> 767px), bascule l'état de l'icône hamburger
    if (clientWidth > 767) {
      document.querySelector(".hamburger-icon")?.classList.toggle("open");
      this.isMenuOpened$.next(!this.isMenuOpened$.value);
    }

    // Mise à jour pour le layout "horizontal"
    if (layout === "horizontal") {
      if (document.body.classList.contains("menu")) {
        document.body.classList.remove("menu");
      } else {
        document.body.classList.add("menu");
      }
    }

    // Mise à jour pour le layout "vertical"
    if (layout === "vertical") {
      if (clientWidth <= 1025 && clientWidth > 767) {
        document.body.classList.remove("vertical-sidebar-enable");
        if (document.documentElement.getAttribute("data-sidebar-size") === "sm") {
          document.documentElement.setAttribute("data-sidebar-size", "");
        } else {
          document.documentElement.setAttribute("data-sidebar-size", "sm");
        }
      } else if (clientWidth > 1025) {
        document.body.classList.remove("vertical-sidebar-enable");
        if (document.documentElement.getAttribute("data-sidebar-size") === "lg") {
          document.documentElement.setAttribute("data-sidebar-size", "sm");
        } else {
          document.documentElement.setAttribute("data-sidebar-size", "lg");
        }
      } else if (clientWidth <= 767) {
        document.body.classList.add("vertical-sidebar-enable");
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
    }
  }
}
