import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { CentreConservationFonciere } from '../../../../../data/modules/auth/models/CentreConservationFonciere';
import { CentreConservationFonciereService } from '../../../../../data/modules/auth/services/centre-conservation-fonciere.service';
import { TypeRegistre } from '../../../../../data/modules/commun/models/TypeRegistre';
import { TypeRegistreService } from '../../../../../data/modules/commun/services/type-registre.service';
import { ActeRegistre } from '../../../../../data/modules/gestion-dossiers/models/ActeRegistre';
import { DemandeTransfert } from '../../../../../data/modules/gestion-dossiers/models/DemandeTransfert';
import { DemandeTransfertActeRegistre } from '../../../../../data/modules/gestion-dossiers/models/DemandeTransfertActeRegistre';
import { ActeRegistreService } from '../../../../../data/modules/gestion-dossiers/services/acte-registre.service';
import { DemandeTransfertService } from '../../../../../data/modules/gestion-dossiers/services/demande-transfert.service';
import { StatutsDemandeTransfertActeRegistre } from '../../../../../data/enums/StatutsDemandeTransfertActeRegistre';

@Component({
  selector: 'app-traitement-demande-transfert-page',
  templateUrl: './traitement-demande-transfert-page.component.html',
  styleUrl: './traitement-demande-transfert-page.component.scss'
})
export class TraitementDemandeTransfertPageComponent {

  typeRegistreId!: TypesRegistre
  typeRegistre?: TypeRegistre

  id: string
  demandeTransfert?: DemandeTransfert
  traitementDemandeTransfertForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    objet: new FormControl(null, [Validators.required]),
    message: new FormControl(null, []),
    reponse: new FormControl(null, []),
    centreConservationFonciereId: new FormControl(null, []),
    demandeTransfertActesRegistres: new FormArray([]),
  })

  listeActesRegistres: ActeRegistre[] = []
  listeCentresConservationFonciere: CentreConservationFonciere[] = []

  readonly statutsDemandeTransfertActeRegistre = StatutsDemandeTransfertActeRegistre

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationsHandlerService: NotificationsHandlerService,
    private typeRegistreService: TypeRegistreService,
    private acteRegistreService: ActeRegistreService,
    private centreConservationFonciereService: CentreConservationFonciereService,
    private demandeTransfertService: DemandeTransfertService,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id") as string

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

          this.getDemandeTransfert()
        }
      })
  }

  ngOnInit(): void {
  }

  getTypeRegistre(): void {
    this.typeRegistreService.get(this.typeRegistreId)
      .subscribe({
        next: (value: TypeRegistre) => {
          console.log(value)
          this.typeRegistre = value

          this.traitementDemandeTransfertForm.get('typeRegistreId')?.setValue(this.typeRegistre.id)
          this.traitementDemandeTransfertForm.get('objet')?.setValue("Demande de transfert d'actes - " + this.typeRegistre.libelle)
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération du type de registre' })
        }
      })
  }

  getDemandeTransfert(): void {
    this.demandeTransfertService.get(this.id)
      .subscribe(
        {
          next: (res: DemandeTransfert) => {
            console.log("Demande transfert: ", res)
            this.demandeTransfert = res

            this.traitementDemandeTransfertForm.patchValue(this.demandeTransfert)
            this.demandeTransfert.demandeTransfertActesRegistres?.forEach(demandeTransfertActeRegistre => {
              this.addDemandeTransfertActeRegistre(demandeTransfertActeRegistre)
            })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            if (err.status == 404) {
              this.router.navigate(['/dossiers/transferts', this.typeRegistreId])
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de cette demande de tranfert' })
            }
          },
        }
      )
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

  annulerTraitementDemandeTransfert(): void {
    // this.demandeTransfertActesRegistres.clear()
    // this.traitementDemandeTransfertForm.reset()
    this.router.navigate(['/dossiers/transferts', this.typeRegistreId])
  }

  validerTraitementDemandeTransfert(): void {
    this.traitementDemandeTransfertForm.markAllAsTouched()
    console.log(this.traitementDemandeTransfertForm.value)

    if (this.traitementDemandeTransfertForm.valid) {
      // if (this.demandeTransfertActesRegistres.length >= 1) {
        let demandeTransfert: DemandeTransfert = this.traitementDemandeTransfertForm.value
        console.log(demandeTransfert)

        this.demandeTransfertService.traiter(demandeTransfert)
          .subscribe({
            next: (value: DemandeTransfert) => {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette demande a été traitée avec succès' })
              this.router.navigate(['/dossiers/transferts', this.typeRegistreId])
            },
            error: (err: HttpErrorResponse) => {
              console.log(err)

              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors du traitement de cette demande' })
            },
          })
      // }
      // else {
      //   this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Il faut au moins un acte à transférer' })
      // }
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Certains champs ne sont pas valides' })
    }
  }

  // DemandeTransfert ActesRegistres requisitions
  get demandeTransfertActesRegistres() {
    return this.traitementDemandeTransfertForm.controls['demandeTransfertActesRegistres'] as FormArray
  }

  addDemandeTransfertActeRegistre(value?: DemandeTransfertActeRegistre): void {
    if (this.demandeTransfertActesRegistres.valid) {
      let demandeTransfertActeRegistreFormGroup: FormGroup = new FormGroup({
        id: new FormControl(value ? value.id : null, [Validators.required]),
        acteRegistreId: new FormControl(value ? value.acteRegistreId : null, [Validators.required]),
        centreSourceId: new FormControl(value ? value.centreSourceId : null, [Validators.required]),
        statut: new FormControl(value ? value.statut : null, [Validators.required]),
        commentaire: new FormControl(value ? value.commentaire : null, []),
      })

      this.demandeTransfertActesRegistres.push(demandeTransfertActeRegistreFormGroup)
    }
  }

  onActeRegistreChange(acteRegistre: ActeRegistre, demandeTransfertActeRegistreIndex: number): void {
    console.log(acteRegistre)
    this.demandeTransfertActesRegistres.at(demandeTransfertActeRegistreIndex).get('centreSourceId')!.setValue(acteRegistre.centreConservationFonciereId)
  }

  changeDemandeTransfertActeRegistreStatut(statut: StatutsDemandeTransfertActeRegistre, demandeTransfertActeRegistreIndex: number): void {
    this.demandeTransfertActesRegistres.at(demandeTransfertActeRegistreIndex).get('statut')!.setValue(statut)
  }

}
