import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from './core/services/script-loader.service';
import { delay } from 'rxjs';
import { HttpLoaderService } from './core/services/http-loader.service';
import { AuthenticatedUserService } from './core/services/authenticated-user.service';
import { AuthService } from './data/modules/auth/services/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationAlert, TypesNotificationAlert } from './data/interfaces/NotificationAlert';
import { NotificationsHandlerService } from './core/services/notifications-handler.service';
import { SessionStorageService } from './core/services/session-storage.service';
import { StorageTokensService } from './core/services/storage-tokens.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'sigef-web';
  isLoading: boolean = false

  notifications: NotificationAlert[] = []

  constructor(
    private router: Router,
    private ngbModalService: NgbModal,
    private httpLoaderService: HttpLoaderService,
    private scriptLoaderService: ScriptLoaderService,
    private authService: AuthService,
    private authenticatedUserService: AuthenticatedUserService,
    private notificationsHandlerService: NotificationsHandlerService,
    private sessionStorageService: SessionStorageService,

  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.ngbModalService.dismissAll(); // Ferme tous les modals ouverts quand on change de page
      }
    });

    // Initialiser les DATA ATTRIBUTES
    this.initDocumentDataAttributes()
  }

  ngOnInit(): void {
    const authToken = this.authService.getAuthToken();

    if (!authToken) {
      return;
    }

    /**
     * Get utilisateur infos
     */
    this.authService.getLoggedUser()
      .subscribe({
        next: (value) => {
          // console.log("Get utilisateur infos from API...")
          // console.log(value)
          this.authenticatedUserService.setUtilisateur(value)
        },
      })

    /**
     * Get utilisateur roles
     */
    this.authService.getLoggedUserRoles()
      .subscribe({
        next: (value) => {
          // console.log("Get utilisateur roles from API...")
          // console.log(value)
          this.authenticatedUserService.setRolesProfil(value)
        },
      })

    // Get notifications
    this.notificationsHandlerService.getNotifications().subscribe({
      next: (value) => {
        // console.log("Notifications:", value)
        this.notifications = value
      }
    })

    // Test notifications
    // this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.SUCCESS, title: 'Erreur système', description: 'Un peu de description de l\'erreur système'})
    // this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur système', description: 'Un peu de description de l\'erreur système', duration: 15000})
    // this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.WARNING, title: 'Erreur système', description: 'Un peu de description de l\'erreur système', duration: 10000})
  }

  ngAfterViewInit(): void {
    this.httpLoaderService.getValue
      .pipe(delay(0))
      .subscribe({
        next: (value: boolean) => {
          this.isLoading = value
        }
      })

    // Liste des scripts à charger
    const scripts = [
      "assets/js/bootstrap.bundle.min.js",
      "assets/js/plugins.js",
    ];
    this.scriptLoaderService.loadScripts(scripts);
  }

  // Initialiser les DATA ATTRIBUTES
  initDocumentDataAttributes(): void {
    // console.log(sessionStorage)

    const theme: string | null = this.sessionStorageService.get(StorageTokensService.DATA_BS_THEME)
    if(theme != null) {
      // console.log(theme)
      document.documentElement.setAttribute("data-bs-theme", theme)
    }
  }
}
