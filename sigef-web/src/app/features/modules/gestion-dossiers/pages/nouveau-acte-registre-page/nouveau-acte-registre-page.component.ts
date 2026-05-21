import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActeRegistreService } from '../../../../../data/modules/gestion-dossiers/services/acte-registre.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';
import { Region } from '../../../../../data/modules/commun/models/Region';
import { DossierRegistreService } from '../../../../../data/modules/gestion-dossiers/services/dossier-registre.service';
import { DossierRegistre } from '../../../../../data/modules/gestion-dossiers/models/DossierRegistre';

@Component({
  selector: 'app-nouveau-acte-registre-page',
  templateUrl: './nouveau-acte-registre-page.component.html',
  styleUrl: './nouveau-acte-registre-page.component.scss'
})
export class NouveauActeRegistrePageComponent implements OnInit {

  nouveauActeForm: FormGroup = new FormGroup({
    numeroOrdre: new FormControl(null, [Validators.required]),
    folio: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    regionId: new FormControl(null, [Validators.required]),
    dossierRegistreId: new FormControl(null, [Validators.required]),
    typeRegistreId: new FormControl(TypesRegistre.ACTES, [Validators.required]),
  })

  regions: Region[] = []
  dossiersRegistres: DossierRegistre[] = []

  constructor(
    private router: Router,
    private acteRegistreService: ActeRegistreService,
    private regionService: RegionService,
    private dossierRegistreService: DossierRegistreService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) { }

  ngOnInit(): void {
    this.getRegions()
    this.getDossiersRegistres()
  }

  getRegions(): void {
    this.regionService.getAllData().subscribe({
      next: (value) => this.regions = value,
      error: (err) => console.log(err)
    })
  }

  getDossiersRegistres(): void {
    this.dossierRegistreService.getAllData(TypesRegistre.ACTES).subscribe({
      next: (value) => this.dossiersRegistres = value,
      error: (err) => console.log(err)
    })
  }

  validerCreationActe(): void {
    if (this.nouveauActeForm.valid) {
      this.acteRegistreService.create(this.nouveauActeForm.value).subscribe({
        next: (value) => {
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Succès', description: 'Acte créé avec succès' })
          this.router.navigate(['/dossiers/actes'])
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Erreur lors de la création de l\'acte' })
        }
      })
    }
  }

  annuler(): void {
    this.router.navigate(['/dossiers/actes'])
  }
}
