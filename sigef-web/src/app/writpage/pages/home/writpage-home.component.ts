import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { TacheIndexationService } from '../../../data/modules/indexation/services/tache-indexation.service';
import { TypesRegistre } from '../../../data/enums/TypesRegistre';
import { TypesTacheIndexation } from '../../../data/enums/TypesTacheIndexation';
import { NotificationsHandlerService } from '../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../data/interfaces/NotificationAlert';

@Component({
  selector: 'app-writpage-home',
  templateUrl: './writpage-home.component.html',
  styleUrls: ['./writpage-home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class WritpageHomeComponent implements OnInit {
  
  // Mapping entre les paramètres des boutons et les valeurs TypesRegistre
  private readonly typeRegistreMapping: { [key: string]: TypesRegistre } = {
    'oppositions': TypesRegistre.OPPOSITIONS,
    'pag': TypesRegistre.TITRES_FONCIERS,
    'titres-fonciers': TypesRegistre.TITRES_FONCIERS,
    'formalites': TypesRegistre.FORMALITES_PREALABLES,
    'depots': TypesRegistre.DEPOTS,
    'actes': TypesRegistre.ACTES
  };

  constructor(
    private router: Router,
    private tacheIndexationService: TacheIndexationService,
    private notificationsHandlerService: NotificationsHandlerService
  ) {}

  ngOnInit(): void {
    // Initialization if needed
  }

  navigateTo(module: string): void {
    const typeRegistre = this.typeRegistreMapping[module];
    
    if (!typeRegistre) {
      this.notificationsHandlerService.addNotification({
        type: TypesNotificationAlert.DANGER,
        title: 'Erreur',
        description: 'Type de registre non reconnu'
      });
      return;
    }

    // Charger la première tâche assignée pour ce type de registre
    this.tacheIndexationService.getAll(
      TypesTacheIndexation.SAISIE,
      typeRegistre,
      0, // page 0
      1  // pagination size 1 (get first task only)
    ).subscribe({
      next: (response) => {
        if (response.data && response.data.length > 0) {
          const firstTask = response.data[0];
          // Naviguer vers la tâche spécifique
          this.router.navigate(['/indexation', TypesTacheIndexation.SAISIE, typeRegistre, firstTask.id]);
        } else {
          this.notificationsHandlerService.addNotification({
            type: TypesNotificationAlert.WARNING,
            title: 'Aucune tâche',
            description: `Aucune tâche assignée pour ce type de registre`
          });
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des tâches:', err);
        this.notificationsHandlerService.addNotification({
          type: TypesNotificationAlert.DANGER,
          title: 'Erreur',
          description: 'Impossible de charger les tâches assignées'
        });
      }
    });
  }
}