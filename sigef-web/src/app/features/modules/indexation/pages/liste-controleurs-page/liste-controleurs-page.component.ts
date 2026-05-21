import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Utilisateur } from '../../../../../data/modules/auth/models/Utilisateur';
import { ControleurService } from '../../../../../data/modules/auth/services/controleur.service';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-controleurs-page',
  templateUrl: './liste-controleurs-page.component.html',
  styleUrl: './liste-controleurs-page.component.scss'
})
export class ListeControleursPageComponent {
  
  emptyError: boolean = false
  disableButton: boolean = false
  confirmError: boolean = false
  passwordError: boolean = false

  showModificationControleurModal: boolean = false
  showModificationActifControleurModal: boolean = false
  showChangementMotDePasseControleurModal: boolean = false

  listeControleurs: PagingData<Utilisateur> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  rechercheControleur?: string

  modificationControleurForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    identifiant: new FormControl({ value: null, disabled: true }, [Validators.required]),
    nom: new FormControl(null, [Validators.required]),
    prenoms: new FormControl(null, [Validators.required]),
    email: new FormControl({ value: null, disabled: true }, [Validators.email, Validators.required]),
    contact: new FormControl(null, [Validators.required, Validators.minLength(11)]),
  })

  modificationActifControleurForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    nom: new FormControl({ value: null, disabled: true }, [Validators.required]),
    prenoms: new FormControl({ value: null, disabled: true }, [Validators.required]),
    actif: new FormControl({ value: null, disabled: true }, [Validators.required]),
  })

  changementMotDePasseControleurForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    identifiant: new FormControl({ value: null, disabled: true }, [Validators.required]),
    nom: new FormControl({ value: null, disabled: true }, [Validators.required]),
    prenoms: new FormControl({ value: null, disabled: true }, [Validators.required]),
    email: new FormControl({ value: null, disabled: true }, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private controleurService: ControleurService
  ) {
    this.getControleurs()
  }

  getControleurs(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides({search: this.rechercheControleur ?? ''})

    this.controleurService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Utilisateur>) => {
          // console.log(value)
          this.listeControleurs = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des contrôleurs' })
        }
      })
  }

  rechercherControleur(): void {
    this.getControleurs({page: this.listeControleurs.currentPage, paginationSize: this.listeControleurs.paginationSize!})
  }

  annulerRechercheControleur(): void {
    this.rechercheControleur = undefined
    this.rechercherControleur()
  }

  validerModificationControleur(): void {
    console.log(this.modificationControleurForm.value)
    if (this.modificationControleurForm.valid) {
      let utilisateur = new Utilisateur()
      utilisateur.id = this.modificationControleurForm.get('id')!.value
      utilisateur.nom = this.modificationControleurForm.get('nom')!.value
      utilisateur.prenoms = this.modificationControleurForm.get('prenoms')!.value
      utilisateur.contact = this.modificationControleurForm.get('contact')!.value

      this.controleurService.update(utilisateur)
        .subscribe(
          {
            next: (res) => {
              this.disableButton = false
              this.closeModificationControleurModal()
              this.getControleurs()
              // this.router.navigateByUrl("/auth/connexion")
              this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cet utilisateur a été mis à jour avec succès'})
            },
            error: (err: HttpErrorResponse) => {
              console.log(err.error)
              this.disableButton = false

              if(err.error.emailAlreadyUsed == true) {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Cet email est déjà utilisé par un autre utilisateur' })
              }
              if(err.error.identifiantAlreadyUsed == true) {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Cet identifiant est déjà utilisé par un autre utilisateur' })
              }
              if(err.error.nomPrenomsAlreadyUsed == true) {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Ces nom et prénoms sont déjà utilisés par un autre utilisateur' })
              }
              
              if (err.error.emailAlreadyUsed == false && err.error.identifiantAlreadyUsed == false && err.error.nomPrenomsAlreadyUsed == false) {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour' })
              }
            },
          }
        )
    }
  }

  annulerModificationControleur(): void {
    this.closeModificationControleurModal()
  }

  validerModificationActifControleur(): void {
    console.log(this.modificationActifControleurForm.value)
    if (this.modificationActifControleurForm.valid) {
      const controleurId = this.modificationActifControleurForm.get('id')!.value

      if (controleurId) {
        this.controleurService.updateActif(controleurId)
          .subscribe(
            {
              next: (res) => {
                this.closeModificationActifControleurModal()
                this.getControleurs()
                // this.router.navigateByUrl("/auth/connexion")
                this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'L\'état du compte de cet utilisateur a été mis à jour avec succès'})
              },
              error: (err: HttpErrorResponse) => {
                console.log(err.error)
                this.disableButton = false

                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour' })
              },
            }
          )
      }
    }
  }

  annulerModificationActifControleur(): void {
    this.closeModificationActifControleurModal()
  }

  validerChangementMotDePasseControleur(): void {
    this.changementMotDePasseControleurForm.markAllAsTouched()
    console.log(this.changementMotDePasseControleurForm.valid, this.changementMotDePasseControleurForm.value)

    if (this.changementMotDePasseControleurForm.valid) {
      this.disableButton = true

      let password: string = this.changementMotDePasseControleurForm.get('password')?.value
      let confirmPassword: string = this.changementMotDePasseControleurForm.get('confirmPassword')?.value
      console.log((password != confirmPassword))

      if (password != confirmPassword) {
        this.confirmError = true
        setTimeout(() => {
          this.confirmError = false
        }, 3000)
        this.disableButton = false
      }
      else {
        let utilisateur = new Utilisateur()
        utilisateur.id = this.changementMotDePasseControleurForm.get('id')?.value
        utilisateur.motDePasse = password

        this.controleurService.updateMotDePasse(utilisateur)
          .subscribe(
            {
              next: (res) => {
                this.disableButton = false
                this.closeChangementMotDePasseControleurModal()
                this.getControleurs()
                this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Le mot de passe de cet utilisateur a été mis à jour avec succès'})
              },
              error: (err: HttpErrorResponse) => {
                console.log(err.error)
                this.disableButton = false

                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du mot de passe' })
              }
            }
          )
      }
    }
  }

  annulerChangementMotDePasseControleur(): void {
    this.closeChangementMotDePasseControleurModal()
  }

  // Modals
  openModificationControleurModal(index: number): void {
    const selectedControleur: Utilisateur | undefined = this.listeControleurs.data[index]

    if (selectedControleur != undefined) {
      this.modificationControleurForm.get('id')?.setValue(selectedControleur.id)
      this.modificationControleurForm.get('identifiant')?.setValue(selectedControleur.identifiant)
      this.modificationControleurForm.get('nom')?.setValue(selectedControleur.nom)
      this.modificationControleurForm.get('prenoms')?.setValue(selectedControleur.prenoms)
      this.modificationControleurForm.get('email')?.setValue(selectedControleur.email)
      this.modificationControleurForm.get('contact')?.setValue(selectedControleur.contact)

      this.showModificationControleurModal = true
    }
  }

  closeModificationControleurModal(): void {
    this.showModificationControleurModal = false
    this.modificationControleurForm.reset()
  }

  openModificationActifControleurModal(index: number): void {
    const selectedControleur: Utilisateur | undefined = this.listeControleurs.data[index]

    if (selectedControleur != undefined) {
      this.modificationActifControleurForm.get('id')?.setValue(selectedControleur.id)
      this.modificationActifControleurForm.get('nom')?.setValue(selectedControleur.nom)
      this.modificationActifControleurForm.get('prenoms')?.setValue(selectedControleur.prenoms)
      this.modificationActifControleurForm.get('actif')?.setValue(selectedControleur.actif)

      this.showModificationActifControleurModal = true
    }
  }

  closeModificationActifControleurModal(): void {
    this.showModificationActifControleurModal = false
    this.modificationActifControleurForm.reset()
  }

  openChangementMotDePasseControleurModal(index: number): void {
    const selectedControleur: Utilisateur | undefined = this.listeControleurs.data[index]

    if (selectedControleur != undefined) {
      this.changementMotDePasseControleurForm.get('id')?.setValue(selectedControleur.id)
      this.changementMotDePasseControleurForm.get('identifiant')?.setValue(selectedControleur.identifiant)
      this.changementMotDePasseControleurForm.get('email')?.setValue(selectedControleur.email)
      this.changementMotDePasseControleurForm.get('nom')?.setValue(selectedControleur.nom)
      this.changementMotDePasseControleurForm.get('prenoms')?.setValue(selectedControleur.prenoms)

      this.showChangementMotDePasseControleurModal = true
    }
  }

  closeChangementMotDePasseControleurModal(): void {
    this.showChangementMotDePasseControleurModal = false
    this.changementMotDePasseControleurForm.reset()
  }
}
