import { Component, Input, SimpleChanges } from '@angular/core';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { Augmentation } from '../../../../../data/modules/gestion-dossiers/models/Augmentation';
import { AugmentationService } from '../../../../../data/modules/gestion-dossiers/services/augmentation.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Diminution } from '../../../../../data/modules/gestion-dossiers/models/Diminution';
import { DiminutionService } from '../../../../../data/modules/gestion-dossiers/services/diminution.service';
import { ContenanceUtils } from '../../../../../data/utils/ContenanceUtils';

enum TypesVariation {
  AUGMENTATION = 'augmentation',
  DIMINUTION = 'diminution',
}

@Component({
  selector: 'app-contenance-details',
  templateUrl: './contenance-details.component.html',
  styleUrl: './contenance-details.component.scss'
})
export class ContenanceDetailsComponent {

  @Input() titreFoncier!: TitreFoncier

  listeAugmentations: Augmentation[] = []
  listeDiminutions: Diminution[] = []
  listeVariations: { data: any, contenanceEnMettreCarree: number, type: TypesVariation }[] = []
  superficieInitiale: number = 0
  superficieVariation: number = 0
  superficieActuelle: number = 0

  filtresListeAugmentationsDiminutionsForm: FormGroup = new FormGroup({
    titreFoncierId: new FormControl(null, [Validators.required]),
  })

  readonly typesVariation = TypesVariation

  constructor(
    private notificationsHandlerService: NotificationsHandlerService,
    private augmentationService: AugmentationService,
    private diminutionService: DiminutionService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titreFoncier'].previousValue != changes['titreFoncier'].currentValue) {
      if (this.titreFoncier) {
        console.log("Contenance détails")
        this.superficieInitiale = this.getSuperficieContenance(this.titreFoncier.contenanceEnHectare, this.titreFoncier.contenanceEnAre, this.titreFoncier.contenanceEnCentiare)
        this.superficieActuelle = this.superficieInitiale
        this.filtresListeAugmentationsDiminutionsForm.get('titreFoncierId')!.setValue(this.titreFoncier.id)

        this.getAugmentations()
      }
    }
  }

  getAugmentations(): void {
    if (this.filtresListeAugmentationsDiminutionsForm.valid) {
      const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeAugmentationsDiminutionsForm.value)

      this.augmentationService.getAllData(filtres)
        .subscribe({
          next: (value: Augmentation[]) => {
            this.listeAugmentations = value
            this.getDiminutions()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des augmentations' })
          }
        })
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des augmentations' })
    }

  }

  getDiminutions(): void {
    if (this.filtresListeAugmentationsDiminutionsForm.valid) {
      const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeAugmentationsDiminutionsForm.value)

      this.diminutionService.getAllData(filtres)
        .subscribe({
          next: (value: Diminution[]) => {
            this.listeDiminutions = value
            this.getListeVariations()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des diminutions' })
          }
        })
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des diminutions' })
    }

  }

  getListeVariations(): void {
    for (let index = 0; index < this.listeAugmentations.length; index++) {
      const augmentation = this.listeAugmentations[index];
      const superficie = this.getSuperficieContenance(augmentation.contenanceImmeubleAcquisEnHectare, augmentation.contenanceImmeubleAcquisEnAre, augmentation.contenanceImmeubleAcquisEnCentiare)

      this.superficieVariation = this.superficieVariation + superficie
      this.superficieActuelle = this.superficieActuelle + superficie

      this.listeVariations.push({
        data: augmentation,
        contenanceEnMettreCarree: superficie,
        type: TypesVariation.AUGMENTATION
      })
    }

    for (let index = 0; index < this.listeDiminutions.length; index++) {
      const diminution = this.listeDiminutions[index];
      const superficie = this.getSuperficieContenance(diminution.contenanceParcelleAlieneeEnHectare, diminution.contenanceParcelleAlieneeEnAre, diminution.contenanceParcelleAlieneeEnCentiare)

      this.superficieVariation = this.superficieVariation - superficie
      this.superficieActuelle = this.superficieActuelle - superficie

      this.listeVariations.push({
        data: diminution,
        contenanceEnMettreCarree: superficie,
        type: TypesVariation.DIMINUTION
      })
    }

    // Ordonner suivant la date d'inscription
    this.listeVariations = this.listeVariations.filter(variation => variation.data.dateInscription).sort((a, b) => (new Date(b.data.dateInscription!)).getTime() - (new Date(a.data.dateInscription!)).getTime())
  }

  // Utils
  getValeurContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): string {
    return ContenanceUtils.getInstance().getValeurContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

  getSuperficieContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): number {
    return ContenanceUtils.getInstance().getSuperficieContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

}
