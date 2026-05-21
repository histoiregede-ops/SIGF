import { AfterViewInit, Component, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { ActivatedRoute, Router } from '@angular/router';
import { FichierService } from '../../../../../data/modules/indexation/services/fichier.service';
import { Fichier } from '../../../../../data/modules/indexation/models/Fichier';
import { HttpErrorResponse, HttpEventType, HttpStatusCode } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../../environments/environment';
import { AuthService } from '../../../../../data/modules/auth/services/auth.service';
import { getClassWithColor } from 'file-icons-js';
import { EtatsControleIndexation, EtatsSaisieIndexation } from '../../../../../data/enums/EtatsIndexation';
import { QualiteDocumentService } from '../../../../../data/modules/commun/services/qualite-document.service';
import { QualiteDocument } from '../../../../../data/modules/commun/models/QualiteDocument';
import { ProgressionTacheIndexation } from '../../../../../data/modules/indexation/models/ProgressionTacheIndexation';
import { TypesTacheIndexation } from '../../../../../data/enums/TypesTacheIndexation';
import { TacheIndexation } from '../../../../../data/modules/indexation/models/TacheIndexation';
import { TacheIndexationService } from '../../../../../data/modules/indexation/services/tache-indexation.service';
import { EtatsProgressionIndexation } from '../../../../../data/enums/EtatsProgressionIndexation';
import { ProgressionTacheIndexationService } from '../../../../../data/modules/indexation/services/progression-tache-indexation.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-espace-indexation-page',
  templateUrl: './espace-indexation-page.component.html',
  styleUrl: './espace-indexation-page.component.scss'
})
export class EspaceIndexationPageComponent implements AfterViewInit {

  readonly FICHIERS_ROOT_PATH: string = environment.MEDIAS_PATH.FICHIERS_ROOT_PATH

  typeTacheIndexation!: TypesTacheIndexation
  typeRegistre: TypesRegistre
  page?: number

  enteteSrc?: string
  fullScreen: boolean = false
  dispositionVerticale!: boolean

  tacheIndexationId?: string
  tacheIndexation?: TacheIndexation

  pageIndexation: number = 0
  lastPageIndexation: number = 1
  currentProgressionTacheIndexation?: ProgressionTacheIndexation
  progressionsTacheIndexation: ProgressionTacheIndexation[] = []

  contenuFichierTacheIndexation?: Uint8Array
  chargementPdf: boolean = false
  erreurChargementPdf: boolean = false
  erreurMessagePdf?: string
  formulaireEtatActif: boolean = false

  qualitesDocument: QualiteDocument[] = []

  readonly etatsSaisieIndexation = EtatsSaisieIndexation
  readonly etatsControleIndexation = EtatsControleIndexation
  readonly typesTacheIndexation = TypesTacheIndexation
  readonly typesRegistre = TypesRegistre

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private activatedRoute: ActivatedRoute,
    private fichierService: FichierService,
    private authService: AuthService,
    private tacheIndexationService: TacheIndexationService,
    private progressionTacheIndexationService: ProgressionTacheIndexationService,
    private modalService: NgbModal,
    private qualiteDocumentService: QualiteDocumentService
  ) {
    this.typeTacheIndexation = this.activatedRoute.snapshot.paramMap.get("tache") as TypesTacheIndexation
    this.typeRegistre = this.activatedRoute.snapshot.paramMap.get("type") as TypesRegistre
    this.tacheIndexationId = this.activatedRoute.snapshot.paramMap.get("id") as string
    this.page = this.activatedRoute.snapshot.queryParamMap.get("page") != null ? Number(this.activatedRoute.snapshot.queryParamMap.get("page")) : undefined

    if (this.tacheIndexationId == undefined || !Object.values(TypesRegistre).includes(this.typeRegistre) || !Object.values(TypesTacheIndexation).includes(this.typeTacheIndexation)) {
      this.router.navigate(['/'])
    }
    else {
      this.dispositionVerticale = this.typeRegistre != TypesRegistre.FORMALITES_PREALABLES
      this.getTacheIndexation()
      this.getQualitesDocument()

      if (this.typeRegistre != TypesRegistre.TITRES_FONCIERS) {
        this.enteteSrc = "assets/images/entetes/" + this.typeRegistre + ".jpg"
      }
    }
  }

  ngAfterViewInit(): void {
    const espace = document.getElementById('espace')
    console.log("Espace HTML Element: ", espace)

    if (espace) {
      const handle: HTMLElement | null = espace.querySelector('a.handle')
      const content: HTMLElement | null = espace.querySelector('div.content')
      console.log(handle, content)

      if (handle && content) {
        this.initHandlePosition(handle, content)

        handle.addEventListener('mousedown', (event) => {
          event.preventDefault()

          const drag = (event) => {
            event.preventDefault()

            if (this.dispositionVerticale) {
              const left = (100 * event.pageX) / window.innerWidth
              const right = 100 - left

              if (left >= 15 && left <= 85) {
                content.style.gridTemplateColumns = `${left}% ${right}%`
                handle.style.left = `${left}%`
              }
            }
            else {
              const top = (100 * event.pageY) / window.innerHeight
              const bottom = 100 - top

              if (top >= 15 && top <= 85) {
                content.style.gridTemplateRows = `${top}% ${bottom}%`
                handle.style.bottom = `${bottom}%`
              }
            }

          }

          const mouseup = (event) => {
            event.preventDefault()

            document.removeEventListener('mousemove', drag)
            document.removeEventListener('mouseup', mouseup)
          }

          document.addEventListener('mousemove', drag)
          document.addEventListener('mouseup', mouseup)
        })

        handle.addEventListener('click', (event) => {
          event.preventDefault()
        })
      }
    }
  }

  private initHandlePosition(handle: HTMLElement, content: HTMLElement): void {
    if (this.dispositionVerticale) {
      handle.style.left = '50%'
      content.style.gridTemplateColumns = '50% 50%'
      content.style.gridTemplateRows = '100%'
    }
    else {
      const isTitreFoncier = this.typeRegistre == TypesRegistre.TITRES_FONCIERS
      const split = isTitreFoncier ? 65 : 50
      const bottom = 100 - split
      handle.style.bottom = `${bottom}%`
      content.style.gridTemplateRows = `${split}% ${bottom}%`
      content.style.gridTemplateColumns = '100%'
    }
  }

  onDispositionVerticaleChange(): void {
    const espace = document.getElementById('espace')

    if (espace) {
      const handle: HTMLElement | null = espace.querySelector('a.handle')
      const content: HTMLElement | null = espace.querySelector('div.content')

      if (handle && content) {
        this.initHandlePosition(handle, content)
      }
    }
  }

  private initTacheIndexation(): void {
    if (this.tacheIndexation && (this.tacheIndexation.fichierId || this.tacheIndexation.fichier?.id)) {
      this.getFichierContenu()
      switch (this.typeTacheIndexation) {
        case TypesTacheIndexation.SAISIE:
          console.log(this.typeTacheIndexation, this.tacheIndexation?.etatSaisie)

          switch (this.tacheIndexation.etatSaisie) {
            case EtatsSaisieIndexation.A_INDEXER:
            case EtatsSaisieIndexation.EN_COURS:
              this.getLastSaisiePageIndexation()
              this.goLastPageIndexation()
              this.formulaireEtatActif = true
              break;

            case EtatsSaisieIndexation.INDEXE:
              this.goFirstPageIndexation()
              this.lastPageIndexation = this.tacheIndexation?.fichier?.nombrePages ?? 1
              this.formulaireEtatActif = false
              break;

            default:
              break;
          }
          break;

        case TypesTacheIndexation.CONTROLE:
          console.log(this.typeTacheIndexation, this.tacheIndexation?.etatControle)

          switch (this.tacheIndexation.etatControle) {
            case EtatsControleIndexation.EN_ATTENTE:
              // Open Alert
              this.formulaireEtatActif = false
              break;

            case EtatsControleIndexation.A_CONTROLER:
            case EtatsControleIndexation.EN_COURS:
              this.getLastControlePageIndexation()
              this.goLastPageIndexation()
              this.formulaireEtatActif = true
              console.log('A controleer');
              break;

            case EtatsControleIndexation.CONTROLE:
              this.lastPageIndexation = this.tacheIndexation?.fichier?.nombrePages ?? 1
              this.goFirstPageIndexation()
              this.formulaireEtatActif = false
              break;

            default:
              break;
          }
          break;

        case TypesTacheIndexation.ADMIN:
          this.getLastAdminPageIndexation()
          this.goToPageIndexation(this.page ?? 1)
          this.formulaireEtatActif = true
          break;

        default:
          break;
      }
    }
    else {

    }
  }

  getTacheIndexation(): void {
    this.tacheIndexationService.get(this.tacheIndexationId!, this.typeTacheIndexation, this.typeRegistre)
      .subscribe({
        next: (value: TacheIndexation) => {
          console.log(value)
          this.tacheIndexation = value

          this.getProgressionsTacheIndexation()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          if (err.status == HttpStatusCode.NotFound) {
            this.router.navigate(['/indexation/taches/', this.typeTacheIndexation, this.typeRegistre])
          }
          else {
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la informations de la tâche' })
          }
        }
      })
  }

  getProgressionsTacheIndexation(): void {
    if (this.tacheIndexation) {
      this.progressionTacheIndexationService.getAllData(this.typeRegistre, this.tacheIndexation.id!)
        .subscribe({
          next: (value: ProgressionTacheIndexation[]) => {
            console.log(value)
            this.progressionsTacheIndexation = value//?.sort((a, b) => b.page! - a.page!) ?? []
            console.log("Progressions: ", this.progressionsTacheIndexation)

            this.initTacheIndexation()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération des progressions de la tâche' })
          }
        })
    }
  }

  getFichierContenu(): void {
    const fichierId = this.tacheIndexation?.fichierId ?? this.tacheIndexation?.fichier?.id
    console.log('getFichierContenu: fichierId =', fichierId)
    if (!this.tacheIndexation || !fichierId) {
      this.chargementPdf = false
      this.erreurChargementPdf = true
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Aucun fichier n’est associé à cette tâche.' })
      return
    }

    const token = this.authService.getAuthToken()
    if (!token) {
      this.chargementPdf = false
      this.erreurChargementPdf = true
      this.erreurMessagePdf = 'Jeton d\'authentification introuvable. Veuillez vous reconnecter.'
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: this.erreurMessagePdf })
      return
    }

    console.log('getFichierContenu: requête PDF', {
      fichierId,
      tokenPresent: !!token,
      apiUrl: `${environment.API_MODULES.INDEXATION}/fichiers/${fichierId}/contenu`
    })

    this.chargementPdf = true
    this.erreurChargementPdf = false
    this.erreurMessagePdf = undefined
    this.contenuFichierTacheIndexation = undefined

    this.fichierService.getContenu(fichierId)
      .subscribe({
        next: (blob: Blob) => {
          console.log('getFichierContenu: blob reçu, taille =', blob.size)
          if (blob && blob.size > 0) {
            blob.arrayBuffer().then((data) => {
              console.log('getFichierContenu: arrayBuffer =', data.byteLength, 'bytes')
              this.contenuFichierTacheIndexation = new Uint8Array(data)
              this.chargementPdf = false
              this.erreurChargementPdf = false
              this.erreurMessagePdf = undefined
            }).catch((error) => {
              console.error('Erreur de conversion du blob en Uint8Array', error)
              this.chargementPdf = false
              this.erreurChargementPdf = true
              this.erreurMessagePdf = 'Impossible de lire le contenu du fichier PDF.'
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: this.erreurMessagePdf })
            })
          } else {
            console.warn('Blob reçu mais avec une taille vide:', blob.size)
            this.chargementPdf = false
            this.erreurChargementPdf = true
            this.erreurMessagePdf = 'Le fichier est vide ou n\'a pas pu être lu correctement.'
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: this.erreurMessagePdf })
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('getFichierContenu: ERREUR HTTP', err)
          this.chargementPdf = false
          this.erreurChargementPdf = true
          
          let errorMessage = 'Une erreur est survenue lors de la récupération du fichier à indexer.';
          
          if (err.status === 0) {
            errorMessage = 'Erreur de connexion: Le serveur API n\'est pas accessible. Vérifiez que le serveur est en cours d\'exécution sur le port 3000.';
            console.error('Network error - possible CORS issue or server not running');
          } else if (err.status === 401) {
            errorMessage = 'Vous n\'êtes pas autorisé à accéder à ce fichier. Vérifiez votre session ou reconnectez-vous.';
          } else if (err.status === 403) {
            errorMessage = 'Accès refusé au fichier.';
          } else if (err.status === 404) {
            errorMessage = 'Le fichier n\'existe pas sur le serveur.';
          } else if (err.status === 500) {
            errorMessage = 'Erreur serveur lors de la récupération du fichier.';
          }
          
          if (err.status === 0) {
            errorMessage = 'Erreur de connexion : le serveur n\'a pas répondu ou la requête est bloquée par une extension (adblocker, antivirus, proxy local).';
            console.error('getFichierContenu: status 0 possible blocage navigateur ou CORS', err)
          }
          
          this.erreurMessagePdf = errorMessage
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: errorMessage })
        }
      });
  }

  getCurrentProgressionTacheIndexation(): void {
    this.currentProgressionTacheIndexation = this.progressionsTacheIndexation[this.pageIndexation - 1]
    console.log(this.currentProgressionTacheIndexation, this.pageIndexation, this.progressionsTacheIndexation.length)
  }

  getQualitesDocument(): void {
    this.qualiteDocumentService.getAllData()
      .subscribe({
        next: (value: QualiteDocument[]) => {
          this.qualitesDocument = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des qualités de document' })
        }
      })
  }

  goToPageIndexation(page: number): void {
    this.pageIndexation = page
    this.getCurrentProgressionTacheIndexation()
  }

  goFirstPageIndexation(): void {
    this.pageIndexation = 1
    this.getCurrentProgressionTacheIndexation()
  }

  prevPageIndexation(): void {
    this.pageIndexation--
    this.getCurrentProgressionTacheIndexation()
  }

  nextPageIndexation(): void {
    this.pageIndexation++
    this.getCurrentProgressionTacheIndexation()
  }

  goLastPageIndexation(): void {
    this.pageIndexation = this.lastPageIndexation
    this.getCurrentProgressionTacheIndexation()
    console.log(this.pageIndexation, this.currentProgressionTacheIndexation)
  }

  getLastSaisiePageIndexation(): void {
    if (this.progressionsTacheIndexation.length == 0) {
      this.lastPageIndexation = 1
    }
    else {
      if (this.progressionsTacheIndexation.length < this.tacheIndexation?.fichier?.nombrePages!) {
        this.lastPageIndexation = this.progressionsTacheIndexation.length + 1
      }
      else {
        this.lastPageIndexation = this.progressionsTacheIndexation.length
      }
    }

    this.currentProgressionTacheIndexation = undefined
  }

  getLastControlePageIndexation(): void {
    const progressionsTacheIndexationIndexees: ProgressionTacheIndexation[] = this.progressionsTacheIndexation.filter(value => value.etat != EtatsProgressionIndexation.INDEXE)
    if (progressionsTacheIndexationIndexees.length == 0) {
      this.lastPageIndexation = 1
    }
    else {
      if (progressionsTacheIndexationIndexees.length < this.tacheIndexation?.fichier?.nombrePages!) {
        this.lastPageIndexation = progressionsTacheIndexationIndexees.length + 1
      }
      else {
        this.lastPageIndexation = progressionsTacheIndexationIndexees.length
      }
    }

    this.currentProgressionTacheIndexation = undefined
  }

  getLastAdminPageIndexation(): void {
    if (this.progressionsTacheIndexation.length == 0) {
      this.lastPageIndexation = 1
    }
    else {
      this.lastPageIndexation = this.progressionsTacheIndexation.length
    }

    this.currentProgressionTacheIndexation = undefined
  }

  onPageIndexationChange(): void {
    if (this.tacheIndexation && this.tacheIndexation.fichier && this.pageIndexation) {
      if (this.pageIndexation < this.tacheIndexation.fichier.nombrePages!) {
        // this.nextPageIndexation()
        // this.lastPageIndexation = this.pageIndexation

        if (this.pageIndexation == 1) {
          let tacheIndexation: TacheIndexation = this.tacheIndexation

          switch (this.typeTacheIndexation) {
            case TypesTacheIndexation.SAISIE:
              tacheIndexation.etatSaisie = EtatsSaisieIndexation.EN_COURS
              break;

            case TypesTacheIndexation.CONTROLE:
              tacheIndexation.etatControle = EtatsControleIndexation.EN_COURS
              break;
          }

          this.tacheIndexationService.update(tacheIndexation)
            .subscribe({
              next: (value) => {
                this.getTacheIndexation()
              },
              error: (err: HttpErrorResponse) => {
                console.log(err)
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la tâche' })
              }
            })
        }
        else {
          this.getTacheIndexation()
        }
      }
      else {
        // Valider indexation
        let tacheIndexation: TacheIndexation = this.tacheIndexation

        switch (this.typeTacheIndexation) {
          case TypesTacheIndexation.SAISIE:
            tacheIndexation.etatSaisie = EtatsSaisieIndexation.INDEXE
            tacheIndexation.etatControle = EtatsControleIndexation.A_CONTROLER

            this.tacheIndexationService.update(tacheIndexation)
              .subscribe({
                next: (value) => {
                  this.openNextSaisieTacheIndexation()
                },
                error: (err: HttpErrorResponse) => {
                  console.log(err)
                  this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la tâche' })
                }
              })
            break;

          case TypesTacheIndexation.CONTROLE:
            tacheIndexation.etatControle = EtatsControleIndexation.CONTROLE

            this.tacheIndexationService.update(tacheIndexation)
              .subscribe({
                next: (value) => {
                  this.router.navigate(['/indexation/taches', this.typeTacheIndexation, this.typeRegistre])
                },
                error: (err: HttpErrorResponse) => {
                  console.log(err)
                  this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la tâche' })
                }
              })
            break;

          default:
            break;
        }
      }
    }
  }

  onFullScreenChange(event: boolean, content: TemplateRef<any>) {
    if (event) {
      this.openFullscreen(content)
    }
    else {
      this.modalService.dismissAll()
    }
  }

  getFichierRessourceIcone(nomFichier: string): string {
    return getClassWithColor(nomFichier)
  }

  // Modals
  openFullscreen(content: TemplateRef<any>) {
    this.modalService.open(content, { fullscreen: true });
  }

  private openNextSaisieTacheIndexation(): void {
    this.tacheIndexationService.getAll(this.typeTacheIndexation, this.typeRegistre, 0, 1)
      .subscribe({
        next: (value) => {
          const nextTacheIndexation = value.data?.[0]

          if (nextTacheIndexation?.id) {
            this.openSaisieTacheIndexation(nextTacheIndexation.id)
            return
          }

          Swal.fire({
            title: '<h5 class="modal-title">Lot terminé</h5>',
            html: '<div>Toutes les pages des fichiers affectés ont été indexées.</div>',
            icon: 'info',
            showCloseButton: true,
            confirmButtonText: 'Ok',
            customClass: {
              htmlContainer: 'text-muted fs-6',
              confirmButton: 'btn btn-primary'
            }
          }).then(() => {
            this.router.navigate(['/writpage'])
          })
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la prochaine tâche' })
          this.router.navigate(['/indexation/saisie', this.typeRegistre])
        }
      })
  }

  private openSaisieTacheIndexation(tacheIndexationId: string): void {
    this.tacheIndexationId = tacheIndexationId
    this.tacheIndexation = undefined
    this.currentProgressionTacheIndexation = undefined
    this.progressionsTacheIndexation = []
    this.contenuFichierTacheIndexation = undefined
    this.pageIndexation = 0
    this.lastPageIndexation = 1
    this.formulaireEtatActif = false

    this.router.navigate(['/indexation', this.typeTacheIndexation, this.typeRegistre, tacheIndexationId], { replaceUrl: true })
    this.getTacheIndexation()
  }


}
