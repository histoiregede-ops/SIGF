import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CentreConservationFonciere } from '../../../../../data/modules/auth/models/CentreConservationFonciere';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { CentreConservationFonciereService } from '../../../../../data/modules/auth/services/centre-conservation-fonciere.service';
import { ActeRegistre } from '../../../../../data/modules/gestion-dossiers/models/ActeRegistre';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { TypeRegistre } from '../../../../../data/modules/commun/models/TypeRegistre';
import { ActeRegistreService } from '../../../../../data/modules/gestion-dossiers/services/acte-registre.service';
import { TypeRegistreService } from '../../../../../data/modules/commun/services/type-registre.service';
import { Utilisateur } from '../../../../../data/modules/auth/models/Utilisateur';
import { delay } from 'rxjs';
import { AuthenticatedUserService } from '../../../../../core/services/authenticated-user.service';
import { DemandeTransfertService } from '../../../../../data/modules/gestion-dossiers/services/demande-transfert.service';
import { DemandeTransfertActeRegistre } from '../../../../../data/modules/gestion-dossiers/models/DemandeTransfertActeRegistre';
import { DemandeTransfert } from '../../../../../data/modules/gestion-dossiers/models/DemandeTransfert';

@Component({
  selector: 'app-nouvelle-demande-transfert-page',
  templateUrl: './nouvelle-demande-transfert-page.component.html',
  styleUrl: './nouvelle-demande-transfert-page.component.scss'
})
export class NouvelleDemandeTransfertPageComponent implements OnInit {

  typeRegistreId!: TypesRegistre
  typeRegistre?: TypeRegistre
  nouvelleDemandeTransfertForm: FormGroup = new FormGroup({
    objet: new FormControl(null, [Validators.required]),
    message: new FormControl(null, []),
    centreConservationFonciereId: new FormControl(null, []),
    typeRegistreId: new FormControl(null, []),
    demandeTransfertActesRegistres: new FormArray([]),
  })

  listeActesRegistres: ActeRegistre[] = []
  listeCentresConservationFonciere: CentreConservationFonciere[] = []
  utilisateurDemande?: Utilisateur

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticatedUserService: AuthenticatedUserService,
    private notificationsHandlerService: NotificationsHandlerService,
    private typeRegistreService: TypeRegistreService,
    private acteRegistreService: ActeRegistreService,
    private centreConservationFonciereService: CentreConservationFonciereService,
    private demandeTransfertService: DemandeTransfertService,
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log("Param changing: ", params["type"])

        this.typeRegistreId = this.activatedRoute.snapshot.paramMap.get("type") as TypesRegistre
        console.log(this.typeRegistreId)

        if (!Object.values(TypesRegistre).includes(this.typeRegistreId)) {
          this.router.navigate(['/'])
        }
        else {
          this.getActesRegistres()
          this.getCentresConservationFonciere()
          this.getTypeRegistre()

          this.addDemandeTransfertActeRegistre()
        }
      })
  }

  ngOnInit(): void {
    this.authenticatedUserService.utilisateur
      .pipe(delay(0))
      .subscribe({
        next: (value: Utilisateur | null) => {
          if (value != null) {
            this.utilisateurDemande = value

            console.log(this.utilisateurDemande.centreConservationFonciere?.id)
            this.nouvelleDemandeTransfertForm.get('centreConservationFonciereId')?.setValue(this.utilisateurDemande.centreConservationFonciere?.id)
          }
        }
      })
  }

  getTypeRegistre(): void {
    this.typeRegistreService.get(this.typeRegistreId)
      .subscribe({
        next: (value: TypeRegistre) => {
          console.log(value)
          this.typeRegistre = value

          this.nouvelleDemandeTransfertForm.get('typeRegistreId')?.setValue(this.typeRegistre.id)
          this.nouvelleDemandeTransfertForm.get('objet')?.setValue("Demande de transfert d'actes - " + this.typeRegistre.libelle)
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération du type de registre' })
        }
      })
  }

  getCentresConservationFonciere(): void {
    this.centreConservationFonciereService.getAllData()
      .subscribe({
        next: (value: CentreConservationFonciere[]) => {
          console.log(value)
          this.listeCentresConservationFonciere = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des centres de conservation foncière' })
        }
      })
  }

  getActesRegistres(): void {
    this.acteRegistreService.getAllData(this.typeRegistreId)
      .subscribe({
        next: (value: ActeRegistre[]) => {
          console.log("Actes Registre: ", value)
          this.listeActesRegistres = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des actes' })
        }
      })
  }

  annulerCreationDemandeTransfert(): void {
    // this.demandeTransfertActesRegistres.clear()
    // this.nouvelleDemandeTransfertForm.reset()
    this.router.navigate(['/dossiers/transferts', this.typeRegistreId])
  }

  validerCreationDemandeTransfert(): void {
    this.nouvelleDemandeTransfertForm.markAllAsTouched()
    console.log(this.nouvelleDemandeTransfertForm.value)

    if (this.nouvelleDemandeTransfertForm.valid) {
      if (this.demandeTransfertActesRegistres.length >= 1) {
        let demandeTransfert: DemandeTransfert = this.nouvelleDemandeTransfertForm.value
        console.log(demandeTransfert)

        this.demandeTransfertService.create(demandeTransfert)
          .subscribe({
            next: (value: DemandeTransfert) => {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette demande a été créée avec succès' })
              this.router.navigate(['/dossiers/transferts', this.typeRegistreId])
            },
            error: (err: HttpErrorResponse) => {
              console.log(err)

              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de cette demande' })
            },
          })
      }
      else {
        this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Il faut au moins un acte à transférer' })
      }
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Certains champs ne sont pas valides' })
    }
  }

  // DemandeTransfert ActesRegistres requisitions
  get demandeTransfertActesRegistres() {
    return this.nouvelleDemandeTransfertForm.controls['demandeTransfertActesRegistres'] as FormArray
  }

  addDemandeTransfertActeRegistre(value?: DemandeTransfertActeRegistre): void {
    if (this.demandeTransfertActesRegistres.valid) {
      let demandeTransfertActeRegistreFormGroup: FormGroup = new FormGroup({
        acteRegistreId: new FormControl(value ? value.acteRegistreId : null, [Validators.required]),
        centreSourceId: new FormControl(value ? value.centreSourceId : null, [Validators.required]),
      })

      this.demandeTransfertActesRegistres.push(demandeTransfertActeRegistreFormGroup)
    }
  }

  removeDemandeTransfertActeRegistre(index: number): void {
    this.demandeTransfertActesRegistres.removeAt(index)
  }

  onActeRegistreChange(acteRegistre: ActeRegistre, demandeTransfertActeRegistreIndex: number): void {
    console.log(acteRegistre)
    this.demandeTransfertActesRegistres.at(demandeTransfertActeRegistreIndex).get('centreSourceId')!.setValue(acteRegistre.centreConservationFonciereId)
  }
}
