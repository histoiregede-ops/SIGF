import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActeRegistreService } from '../../../../../data/modules/gestion-dossiers/services/acte-registre.service';
import { ActeRegistre } from '../../../../../data/modules/gestion-dossiers/models/ActeRegistre';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';

@Component({
  selector: 'app-details-acte-registre-page',
  templateUrl: './details-acte-registre-page.component.html',
  styleUrl: './details-acte-registre-page.component.scss'
})
export class DetailsActeRegistrePageComponent implements OnInit {

  acte?: ActeRegistre

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private acteRegistreService: ActeRegistreService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.getActe(id)
    }
  }

  getActe(id: string): void {
    this.acteRegistreService.getById(id).subscribe({
      next: (value) => this.acte = value,
      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Erreur lors de la récupération de l\'acte' })
      }
    })
  }

  retour(): void {
    this.router.navigate(['/dossiers/actes'])
  }
}
