import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EtatsProgressionIndexation } from '../../../../../data/enums/EtatsProgressionIndexation';
import { TypesTacheIndexation } from '../../../../../data/enums/TypesTacheIndexation';
import { QualiteDocument } from '../../../../../data/modules/commun/models/QualiteDocument';
import { TypeRegistre } from '../../../../../data/modules/commun/models/TypeRegistre';
import { DonneeIndexation } from '../../../../../data/modules/indexation/models/DonneeIndexation';
import { ProgressionTacheIndexation } from '../../../../../data/modules/indexation/models/ProgressionTacheIndexation';
import { TacheIndexation } from '../../../../../data/modules/indexation/models/TacheIndexation';
import { ProgressionTacheIndexationService } from '../../../../../data/modules/indexation/services/progression-tache-indexation.service';
import { ActeRegistre } from '../../../../../data/modules/gestion-dossiers/models/ActeRegistre';
import { ActeRegistreService } from '../../../../../data/modules/gestion-dossiers/services/acte-registre.service';
import { Region } from '../../../../../data/modules/commun/models/Region';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';
import { Periode } from '../../../../../data/modules/commun/models/Periode';
import { PeriodeService } from '../../../../../data/modules/commun/services/periode.service';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';

@Component({
  selector: 'app-indexation-acte-registre-section',
  templateUrl: './indexation-acte-registre-section.component.html',
  styleUrl: './indexation-acte-registre-section.component.scss'
})
export class IndexationActeRegistreSectionComponent {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  @Input() formulaireEtatActif: boolean = false
  @Input() tacheIndexation!: TacheIndexation
  @Input() pageIndexation!: number
  @Output() pageIndexationChange: EventEmitter<number> = new EventEmitter()
  @Input() progressionTacheIndexation?: ProgressionTacheIndexation

  @Input() qualitesDocument: QualiteDocument[] = []
  @Input() typeRegistre?: TypeRegistre
  @Input() typeTacheIndexation!: TypesTacheIndexation

  metadonneesForm: FormGroup = new FormGroup({
    qualiteDocumentId: new FormControl(null, [Validators.required]),
    typeRegistreId: new FormControl(null, [Validators.required]),
    regionId: new FormControl(null, [Validators.required]),
    periodeId: new FormControl(null, [Validators.required]),
    volumeRegistre: new FormControl(null, []),
    folioRegistre: new FormControl(null, []),
    commentaire: new FormControl(null, []),
  })

  nouveauActeForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    numeroOrdre: new FormControl(null, [Validators.required]),
    folio: new FormControl(null, []),
    description: new FormControl(null, []),
  })

  periodes: Periode[] = []
  _regionsMetadonneesForm: Region[] = []
  regionsMetadonneesForm: Region[] = []

  readonly typesTacheIndexation = TypesTacheIndexation
  readonly etatsProgressionIndexation = EtatsProgressionIndexation

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private periodeService: PeriodeService,
    private regionService: RegionService,
    private progressionTacheIndexationService: ProgressionTacheIndexationService,
    private acteRegistreService: ActeRegistreService,
  ) { }

  ngOnInit(): void {
    this.getPeriodes()
    this.getRegionsMetadonneesForm()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formulaireEtatActif']) {
      if (this.formulaireEtatActif) {
        this.metadonneesForm.enable();
        this.nouveauActeForm.enable();
      } else {
        this.metadonneesForm.disable();
        this.nouveauActeForm.disable();
      }
    }

    if (changes['pageIndexation']) {
      this.resetNouveauActeForm()
      this.initNouveauActeForm()
      if (this.typeRegistre) {
        this.metadonneesForm.get('typeRegistreId')!.setValue(this.typeRegistre.id)
      }
    }
  }

  getPeriodes(): void {
    this.periodeService.getAllData()
      .subscribe({
        next: (value: Periode[]) => {
          this.periodes = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des périodes'})
        }
      })
  }

  onPeriodeChange(selectedPeriodeId?: string): void {
    if (selectedPeriodeId) {
      this.regionsMetadonneesForm = this._regionsMetadonneesForm.filter(value => value.periodeId == selectedPeriodeId)
    }
    else {
      this.regionsMetadonneesForm = this._regionsMetadonneesForm
    }
  }

  getRegionsMetadonneesForm(): void {
    this.regionService.getAllData()
      .subscribe({
        next: (value: Region[]) => {
          this._regionsMetadonneesForm = value
          this.regionsMetadonneesForm = this._regionsMetadonneesForm
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des régions'})
        }
      })
  }

  private getProgressionTacheIndexationValue(removeIds: boolean): ProgressionTacheIndexation {
    if (removeIds) {
      this.nouveauActeForm.removeControl('id');
    }

    let acte: ActeRegistre = this.nouveauActeForm.value
    acte.regionId = this.metadonneesForm.get('regionId')!.value
    acte.typeRegistreId = this.metadonneesForm.get('typeRegistreId')!.value

    let donneeIndexation: DonneeIndexation = new DonneeIndexation()
    donneeIndexation.typeRegistreId = this.metadonneesForm.get('typeRegistreId')!.value
    donneeIndexation.volumeRegistre = this.metadonneesForm.get('volumeRegistre')!.value
    donneeIndexation.folioRegistre = this.metadonneesForm.get('folioRegistre')!.value
    donneeIndexation.regionId = this.metadonneesForm.get('regionId')!.value
    donneeIndexation.acteRegistre = acte

    let progressionTacheIndexation: ProgressionTacheIndexation = new ProgressionTacheIndexation()
    progressionTacheIndexation.page = this.pageIndexation
    progressionTacheIndexation.qualiteDocumentId = this.metadonneesForm.get('qualiteDocumentId')!.value
    progressionTacheIndexation.commentaire = this.metadonneesForm.get('commentaire')!.value
    progressionTacheIndexation.tacheIndexationId = this.tacheIndexation.id
    progressionTacheIndexation.donneeIndexation = donneeIndexation

    return progressionTacheIndexation
  }

  validerSaisie(): void {
    this.metadonneesForm.markAllAsTouched()
    this.nouveauActeForm.markAllAsTouched()

    if (this.nouveauActeForm.valid && this.metadonneesForm.valid) {
      let progressionTacheIndexation: ProgressionTacheIndexation = this.getProgressionTacheIndexationValue(true)
      progressionTacheIndexation.etat = EtatsProgressionIndexation.INDEXE

       switch (this.typeTacheIndexation) {
         case TypesTacheIndexation.SAISIE:
           progressionTacheIndexation.dateSaisie = new Date()
           break;

         case TypesTacheIndexation.CONTROLE:
           progressionTacheIndexation.dateControle = new Date()
           break;
       }

      this.progressionTacheIndexationService.create(progressionTacheIndexation)
        .subscribe({
          next: (value: ProgressionTacheIndexation) => {
            this.resetNouveauActeForm()
            this.pageIndexationChange.emit(this.pageIndexation)
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'La saisie a été validée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la validation de la saisie' })
          },
        })
    }
  }

  modifierSaisie(etatProgressionIndexation?: EtatsProgressionIndexation): void {
    if (this.progressionTacheIndexation) {
      this.metadonneesForm.markAllAsTouched()
      this.nouveauActeForm.markAllAsTouched()

      if (this.nouveauActeForm.valid && this.metadonneesForm.valid) {
        let progressionTacheIndexation: ProgressionTacheIndexation = this.getProgressionTacheIndexationValue(false)
        progressionTacheIndexation.id = this.progressionTacheIndexation.id!

        switch (this.typeTacheIndexation) {
          case TypesTacheIndexation.SAISIE:
            progressionTacheIndexation.dateSaisie = new Date()
            break;

          case TypesTacheIndexation.CONTROLE:
            progressionTacheIndexation.dateControle = new Date()
            const qualiteDocument: QualiteDocument = this.qualitesDocument.find(value => value.id == progressionTacheIndexation.qualiteDocumentId)!
            if (qualiteDocument.aSignaler == true) {
              progressionTacheIndexation.etat = EtatsProgressionIndexation.SIGNALE
            }
            else if (etatProgressionIndexation) {
              progressionTacheIndexation.etat = etatProgressionIndexation
            }
            break;
        }

        this.progressionTacheIndexationService.update(progressionTacheIndexation)
          .subscribe({
            next: (value: ProgressionTacheIndexation) => {
              let acte = progressionTacheIndexation.donneeIndexation?.acteRegistre
              if (acte && acte.id != null) {
                this.acteRegistreService.update(acte)
                  .subscribe({
                    next: () => {
                      this.resetNouveauActeForm()
                      this.pageIndexationChange.emit(this.pageIndexation)
                      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'La saisie a été mise à jour avec succès' })
                    },
                    error: (err: HttpErrorResponse) => {
                      console.log(err)
                      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de l\'acte' })
                    },
                  })
              }
              else {
                this.pageIndexationChange.emit(this.pageIndexation)
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'La saisie a été mise à jour avec succès' })
              }
            },
            error: (err: HttpErrorResponse) => {
              console.log(err)
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la saisie' })
            },
          })
      }
    }
  }

  validerControle(): void {
    this.modifierSaisie(EtatsProgressionIndexation.VALIDE)
  }

  rejeter(): void {
    this.modifierSaisie(EtatsProgressionIndexation.REJETE)
  }

  initNouveauActeForm(): void {
    if (this.progressionTacheIndexation) {
      this.metadonneesForm.patchValue(this.progressionTacheIndexation)
      if (this.progressionTacheIndexation.donneeIndexation) {
        this.metadonneesForm.patchValue(this.progressionTacheIndexation.donneeIndexation)
        this.metadonneesForm.get('periodeId')?.setValue(this.tacheIndexation.fichier?.region?.periodeId)
      }

      let acte: ActeRegistre | undefined = this.progressionTacheIndexation?.donneeIndexation?.acteRegistre
      if (acte) {
        this.nouveauActeForm.patchValue(acte)
      }
    }
    else {
      this.metadonneesForm.get('periodeId')?.setValue(this.tacheIndexation.fichier?.region?.periodeId)
      this.metadonneesForm.get('regionId')?.setValue(this.tacheIndexation.fichier?.regionId)
    }
  }

  resetNouveauActeForm(): void {
    this.nouveauActeForm.reset()
    this.metadonneesForm.get('qualiteDocumentId')!.reset()
    this.metadonneesForm.get('folioRegistre')!.reset()
    this.metadonneesForm.get('regionId')!.reset()
    this.metadonneesForm.get('commentaire')!.reset()

    if (this.scrollContainer != undefined) {
      this.scrollContainer.nativeElement.scrollTop = 0
    }
  }
}
