import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Utilisateur } from '../../../../../data/modules/auth/models/Utilisateur';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { UtilisateurService } from '../../../../../data/modules/auth/services/utilisateur.service';
import { Profil } from '../../../../../data/modules/auth/models/Profil';
import { ProfilService } from '../../../../../data/modules/auth/services/profil.service';
import { CentreConservationFonciere } from '../../../../../data/modules/auth/models/CentreConservationFonciere';
import { CentreConservationFonciereService } from '../../../../../data/modules/auth/services/centre-conservation-fonciere.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-utilisateurs-page',
  templateUrl: './liste-utilisateurs-page.component.html',
  styleUrl: './liste-utilisateurs-page.component.scss'
})
export class ListeUtilisateursPageComponent {

  emptyError: boolean = false
  disableButton: boolean = false
  confirmError: boolean = false
  passwordError: boolean = false

  showNouvelUtilisateurModal: boolean = false
  showModificationUtilisateurModal: boolean = false
  showModificationActifUtilisateurModal: boolean = false
  showChangementMotDePasseUtilisateurModal: boolean = false

  listeUtilisateurs: PagingData<Utilisateur> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  rechercheUtilisateur?: string
  profils: Profil[] = []
  listeCentresConservationFonciere: CentreConservationFonciere[] = []

  masquerfiltresListeUtilisateurs: boolean = false
  filtresListeUtilisateursForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    actif: new FormControl(null, []),
    profil: new FormControl(null, []),
    centre: new FormControl(null, []),
  })

  nouvelUtilisateurForm: FormGroup = new FormGroup({
    identifiant: new FormControl(null, [Validators.required]),
    matricule: new FormControl(null, []),
    nom: new FormControl(null, [Validators.required]),
    prenoms: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    contact: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    profilId: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    centreConservationFonciereId: new FormControl(null, []),
  })

  modificationUtilisateurForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    identifiant: new FormControl({ value: null, disabled: true }, [Validators.required]),
    matricule: new FormControl(null, []),
    nom: new FormControl(null, [Validators.required]),
    prenoms: new FormControl(null, [Validators.required]),
    email: new FormControl({ value: null, disabled: true }, [Validators.email, Validators.required]),
    contact: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    profilId: new FormControl(null, [Validators.required]),
    centreConservationFonciereId: new FormControl(null, []),
  })

  modificationActifUtilisateurForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    nom: new FormControl({ value: null, disabled: true }, [Validators.required]),
    prenoms: new FormControl({ value: null, disabled: true }, [Validators.required]),
    actif: new FormControl({ value: null, disabled: true }, [Validators.required]),
  })

  changementMotDePasseUtilisateurForm: FormGroup = new FormGroup({
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
    private utilisateurService: UtilisateurService,
    private profilService: ProfilService,
    private centreConservationFonciereService: CentreConservationFonciereService,
  ) {
    this.getUtilisateurs()
  }

  getUtilisateurs(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeUtilisateursForm.value)

    this.utilisateurService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Utilisateur>) => {
          // console.log(value)
          this.listeUtilisateurs = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des utilisateurs' })
        }
      })
  }

  getProfils(): void {
    this.profilService.getAllData()
      .subscribe({
        next: (value: Profil[]) => {
          this.profils = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des périodes' })
        }
      })
  }

  getCentresConservationFonciere(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
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

  rechercherUtilisateur(): void {
    this.getUtilisateurs({ page: this.listeUtilisateurs.currentPage, paginationSize: this.listeUtilisateurs.paginationSize! })
  }

  annulerRechercheUtilisateur(): void {
    this.rechercheUtilisateur = undefined
    this.rechercherUtilisateur()
  }
  
  filtrerListeUtilisateurs(page?: number, paginationSize?: number): void {
    this.getUtilisateurs({ page: this.listeUtilisateurs.currentPage, paginationSize: this.listeUtilisateurs.paginationSize! })
  }

  effacerFiltresListeUtilisateurs(): void {
    this.filtresListeUtilisateursForm.reset()

    this.filtrerListeUtilisateurs()
  }

  validerCreationUtilisateur(): void {
    console.log(this.nouvelUtilisateurForm.valid, this.nouvelUtilisateurForm.value)
    this.disableButton = true

    let nom: string = this.nouvelUtilisateurForm.get('nom')?.value
    let prenoms: string = this.nouvelUtilisateurForm.get('prenoms')?.value
    let email: string = this.nouvelUtilisateurForm.get('email')?.value
    let contact: string = this.nouvelUtilisateurForm.get('contact')?.value
    let profilId: string = this.nouvelUtilisateurForm.get('profilId')?.value
    let identifiant: string = this.nouvelUtilisateurForm.get('identifiant')?.value
    let matricule: string = this.nouvelUtilisateurForm.get('matricule')?.value
    let password: string = this.nouvelUtilisateurForm.get('password')?.value
    let confirmPassword: string = this.nouvelUtilisateurForm.get('confirmPassword')?.value
    let centreConservationFonciereId: string = this.nouvelUtilisateurForm.get('centreConservationFonciereId')?.value

    if (nom == null || prenoms == null || email == null || identifiant == null || password == null || confirmPassword == null
      || nom.length == 0 || prenoms.length == 0 || email.length == 0 || identifiant.length == 0 || password.length == 0 || confirmPassword.length == 0) {
      this.emptyError = true

      setTimeout(() => {
        this.emptyError = false
      }, 3000)
      this.disableButton = false
    }
    else {
      if (password != confirmPassword) {
        this.confirmError = true
        setTimeout(() => {
          this.confirmError = false
        }, 3000)
        this.disableButton = false
      }
      else {
        let utilisateur = new Utilisateur()
        utilisateur.nom = nom
        utilisateur.prenoms = prenoms
        utilisateur.email = email
        utilisateur.contact = contact
        utilisateur.profilId = profilId ? Number(profilId) : undefined as any
        utilisateur.identifiant = identifiant
        utilisateur.matricule = matricule
        utilisateur.motDePasse = password
        utilisateur.centreConservationFonciereId = centreConservationFonciereId ? Number(centreConservationFonciereId) : undefined

        this.utilisateurService.register(utilisateur)
          .subscribe(
            {
              next: (res) => {
                this.disableButton = false
                this.closeNouvelUtilisateurModal()
                this.getUtilisateurs()
                // this.router.navigateByUrl("/auth/connexion")

                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cet utilisateur a été créé avec succès' })
              },
              error: (err: HttpErrorResponse) => {
                console.log(err.error)
                this.disableButton = false

                if (err.error.emailAlreadyUsed == true) {
                  this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Cet email est déjà utilisé par un autre utilisateur' })
                }
                if (err.error.identifiantAlreadyUsed == true) {
                  this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Cet identifiant est déjà utilisé par un autre utilisateur' })
                }
                if (err.error.nomPrenomsAlreadyUsed == true) {
                  this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Ces nom et prénoms sont déjà utilisés par un autre utilisateur' })
                }

                if (err.error.emailAlreadyUsed == false && err.error.identifiantAlreadyUsed == false && err.error.nomPrenomsAlreadyUsed == false) {
                  this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création' })
                }
              },
            }
          )
      }
    }
  }

  annulerCreationUtilisateur(): void {
    this.closeNouvelUtilisateurModal()
  }

  validerModificationUtilisateur(): void {
    console.log(this.modificationUtilisateurForm.value)
    if (this.modificationUtilisateurForm.valid) {
      let utilisateur = new Utilisateur()
      utilisateur.id = this.modificationUtilisateurForm.get('id')!.value
      utilisateur.matricule = this.modificationUtilisateurForm.get('matricule')!.value
      utilisateur.nom = this.modificationUtilisateurForm.get('nom')!.value
      utilisateur.prenoms = this.modificationUtilisateurForm.get('prenoms')!.value
      utilisateur.contact = this.modificationUtilisateurForm.get('contact')!.value
      utilisateur.profilId = this.modificationUtilisateurForm.get('profilId')!.value
      utilisateur.centreConservationFonciereId = this.modificationUtilisateurForm.get('centreConservationFonciereId')!.value

      this.utilisateurService.update(utilisateur)
        .subscribe(
          {
            next: (res) => {
              this.disableButton = false
              this.closeModificationUtilisateurModal()
              this.getUtilisateurs()
              // this.router.navigateByUrl("/auth/connexion")
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cet utilisateur a été mis à jour avec succès' })
            },
            error: (err: HttpErrorResponse) => {
              console.log(err.error)
              this.disableButton = false

              if (err.error.emailAlreadyUsed == true) {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Cet email est déjà utilisé par un autre utilisateur' })
              }
              if (err.error.identifiantAlreadyUsed == true) {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Cet identifiant est déjà utilisé par un autre utilisateur' })
              }
              if (err.error.nomPrenomsAlreadyUsed == true) {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Ces nom et prénoms sont déjà utilisés par un autre utilisateur' })
              }

              if (err.error.emailAlreadyUsed == false && err.error.identifiantAlreadyUsed == false && err.error.nomPrenomsAlreadyUsed == false) {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour' })
              }
            }
          }
        )
    }
  }

  annulerModificationUtilisateur(): void {
    this.closeModificationUtilisateurModal()
  }

  validerModificationActifUtilisateur(): void {
    console.log(this.modificationActifUtilisateurForm.value, this.modificationActifUtilisateurForm.valid)
    if (this.modificationActifUtilisateurForm.valid) {
      const utilisateurId = this.modificationActifUtilisateurForm.get('id')!.value

      if (utilisateurId) {
        this.utilisateurService.updateActif(utilisateurId)
          .subscribe(
            {
              next: (res) => {
                this.closeModificationActifUtilisateurModal()
                this.getUtilisateurs()
                // this.router.navigateByUrl("/auth/connexion")
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'L\'état du compte de cet utilisateur a été mis à jour avec succès' })
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

  annulerModificationActifUtilisateur(): void {
    this.closeModificationActifUtilisateurModal()
  }

  validerChangementMotDePasseUtilisateur(): void {
    this.changementMotDePasseUtilisateurForm.markAllAsTouched()
    console.log(this.changementMotDePasseUtilisateurForm.valid, this.changementMotDePasseUtilisateurForm.value)

    if (this.changementMotDePasseUtilisateurForm.valid) {
      this.disableButton = true

      let password: string = this.changementMotDePasseUtilisateurForm.get('password')?.value
      let confirmPassword: string = this.changementMotDePasseUtilisateurForm.get('confirmPassword')?.value
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
        utilisateur.id = this.changementMotDePasseUtilisateurForm.get('id')?.value
        utilisateur.motDePasse = password

        this.utilisateurService.updateMotDePasse(utilisateur)
          .subscribe(
            {
              next: (res) => {
                this.disableButton = false
                this.closeChangementMotDePasseUtilisateurModal()
                this.getUtilisateurs()
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Le mot de passe de cet utilisateur a été mis à jour avec succès' })
              },
              error: (err: HttpErrorResponse) => {
                console.log(err.error)
                this.disableButton = false

                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du mot de passe' })
              },
            }
          )
      }
    }
  }

  annulerChangementMotDePasseUtilisateur(): void {
    this.closeChangementMotDePasseUtilisateurModal()
  }

  // Modals
  openNouvelUtilisateurModal(): void {
    this.getProfils()
    this.getCentresConservationFonciere()
    this.showNouvelUtilisateurModal = true
  }

  closeNouvelUtilisateurModal(): void {
    this.showNouvelUtilisateurModal = false
    this.nouvelUtilisateurForm.reset()
  }

  openModificationUtilisateurModal(index: number): void {
    const selectedUtilisateur: Utilisateur | undefined = this.listeUtilisateurs.data[index]

    if (selectedUtilisateur != undefined) {
      this.getProfils()
      this.getCentresConservationFonciere()

      this.modificationUtilisateurForm.get('id')?.setValue(selectedUtilisateur.id)
      this.modificationUtilisateurForm.get('identifiant')?.setValue(selectedUtilisateur.identifiant)
      this.modificationUtilisateurForm.get('matricule')?.setValue(selectedUtilisateur.matricule)
      this.modificationUtilisateurForm.get('nom')?.setValue(selectedUtilisateur.nom)
      this.modificationUtilisateurForm.get('prenoms')?.setValue(selectedUtilisateur.prenoms)
      this.modificationUtilisateurForm.get('email')?.setValue(selectedUtilisateur.email)
      this.modificationUtilisateurForm.get('contact')?.setValue(selectedUtilisateur.contact)
      this.modificationUtilisateurForm.get('profilId')?.setValue(selectedUtilisateur.profil?.id)
      this.modificationUtilisateurForm.get('centreConservationFonciereId')?.setValue(selectedUtilisateur.centreConservationFonciere?.id)

      this.showModificationUtilisateurModal = true
    }
  }

  closeModificationUtilisateurModal(): void {
    this.showModificationUtilisateurModal = false
    this.modificationUtilisateurForm.reset()
  }

  openModificationActifUtilisateurModal(index: number): void {
    const selectedUtilisateur: Utilisateur | undefined = this.listeUtilisateurs.data[index]

    if (selectedUtilisateur != undefined) {
      this.modificationActifUtilisateurForm.get('id')?.setValue(selectedUtilisateur.id)
      this.modificationActifUtilisateurForm.get('nom')?.setValue(selectedUtilisateur.nom)
      this.modificationActifUtilisateurForm.get('prenoms')?.setValue(selectedUtilisateur.prenoms)
      this.modificationActifUtilisateurForm.get('actif')?.setValue(selectedUtilisateur.actif)

      this.showModificationActifUtilisateurModal = true
    }
  }

  closeModificationActifUtilisateurModal(): void {
    this.showModificationActifUtilisateurModal = false
    this.modificationActifUtilisateurForm.reset()
  }

  openChangementMotDePasseUtilisateurModal(index: number): void {
    const selectedUtilisateur: Utilisateur | undefined = this.listeUtilisateurs.data[index]

    if (selectedUtilisateur != undefined) {
      this.changementMotDePasseUtilisateurForm.get('id')?.setValue(selectedUtilisateur.id)
      this.changementMotDePasseUtilisateurForm.get('identifiant')?.setValue(selectedUtilisateur.identifiant)
      this.changementMotDePasseUtilisateurForm.get('email')?.setValue(selectedUtilisateur.email)
      this.changementMotDePasseUtilisateurForm.get('nom')?.setValue(selectedUtilisateur.nom)
      this.changementMotDePasseUtilisateurForm.get('prenoms')?.setValue(selectedUtilisateur.prenoms)

      this.showChangementMotDePasseUtilisateurModal = true
    }
  }

  closeChangementMotDePasseUtilisateurModal(): void {
    this.showChangementMotDePasseUtilisateurModal = false
    this.changementMotDePasseUtilisateurForm.reset()
  }

}
