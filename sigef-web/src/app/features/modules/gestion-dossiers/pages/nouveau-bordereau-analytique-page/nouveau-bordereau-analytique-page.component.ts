import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BordereauAnalytiqueService } from '../../../../../data/modules/gestion-dossiers/services/bordereau-analytique.service';
import { TitreFoncierService } from '../../../../../data/modules/gestion-dossiers/services/titre-foncier.service';
import { RequisitionService } from '../../../../../data/modules/gestion-dossiers/services/requisition.service';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { Requisition } from '../../../../../data/modules/gestion-dossiers/models/Requisition';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';

@Component({
  selector: 'app-nouveau-bordereau-analytique-page',
  templateUrl: './nouveau-bordereau-analytique-page.component.html',
  styleUrl: './nouveau-bordereau-analytique-page.component.scss'
})
export class NouveauBordereauAnalytiquePageComponent implements OnInit {

  nouveauBordereauForm: FormGroup = new FormGroup({
    numero: new FormControl(null, [Validators.required]),
    dateBordereau: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    titreFoncierId: new FormControl(null, [Validators.required]),
    requisitionId: new FormControl(null, []),
  })

  titresFonciers: TitreFoncier[] = []
  requisitions: Requisition[] = []

  constructor(
    private router: Router,
    private bordereauService: BordereauAnalytiqueService,
    private titreFoncierService: TitreFoncierService,
    private requisitionService: RequisitionService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) { }

  ngOnInit(): void {
    this.getTitresFonciers()
    this.getRequisitions()
  }

  getTitresFonciers(): void {
    this.titreFoncierService.getAllData().subscribe({
      next: (value) => this.titresFonciers = value,
      error: (err) => console.log(err)
    })
  }

  getRequisitions(): void {
    this.requisitionService.getAllData().subscribe({
      next: (value) => this.requisitions = value,
      error: (err) => console.log(err)
    })
  }

  validerCreation(): void {
    if (this.nouveauBordereauForm.valid) {
      this.bordereauService.create(this.nouveauBordereauForm.value).subscribe({
        next: (value) => {
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Succès', description: 'Bordereau créé avec succès' })
          this.router.navigate(['/dossiers/bordereaux'])
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Erreur lors de la création' })
        }
      })
    }
  }

  annuler(): void {
    this.router.navigate(['/dossiers/bordereaux'])
  }
}
