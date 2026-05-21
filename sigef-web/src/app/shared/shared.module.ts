import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { CustomFilePickerComponent } from './components/custom-file-picker/custom-file-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomAlertComponent } from './components/custom-alert/custom-alert.component';
import { FormMessageComponent } from './components/form-message/form-message.component';
import { CustomPaginationControlsComponent } from './components/custom-pagination-controls/custom-pagination-controls.component';
import { NoDataBannerComponent } from './components/no-data-banner/no-data-banner.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { CustomPdfViewerComponent } from './components/custom-pdf-viewer/custom-pdf-viewer.component';
import { NgbAccordionModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SeparateurMilliersDirective } from './directives/separateur-milliers.directive';
import { FormatContactDirective } from './directives/format-contact.directive';
import { IndexationProgressBarComponent } from './components/indexation-progress-bar/indexation-progress-bar.component';
import { IndexationPageSignaleesRejeteesComponent } from './components/indexation-page-signalees-rejetees/indexation-page-signalees-rejetees.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormatPourcentagePipe } from './pipes/format-pourcentage.pipe';
import { NotificationAlertComponent } from './components/notification-alert/notification-alert.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { GetPartiesPrenatesParCategoriePipe } from './pipes/get-parties-prenates-par-categorie.pipe';
import { PartiesPrenantesTableComponent } from './components/parties-prenantes-table/parties-prenantes-table.component';
import { PartiePrenanteCardComponent } from './components/partie-prenante-card/partie-prenante-card.component';
import { GetPartiesPrenantesPipe } from './pipes/get-parties-prenantes.pipe';
import { PieceDeposeeCardComponent } from './components/piece-deposee-card/piece-deposee-card.component';
import { GetProprietaireActuelPipe } from './pipes/get-proprietaire-actuel.pipe';
import { CardNumeroTitreFoncierDetailsComponent } from './components/card-numero-titre-foncier-details/card-numero-titre-foncier-details.component';
import { CardNumeroRequisitionDetailsComponent } from './components/card-numero-requisition-details/card-numero-requisition-details.component';
import { GetSuperficieContenancePipe } from './pipes/get-superficie-contenance.pipe';
import { GetContenanceFromSuperficiePipe } from './pipes/get-contenance-from-superficie.pipe';
import { GetNumeroTitreFoncierPipe } from './pipes/get-numero-titre-foncier.pipe';
import { CardActeRegistreDetailsComponent } from './components/card-acte-registre-details/card-acte-registre-details.component';

@NgModule({
  declarations: [
    // Components
    CustomFilePickerComponent,
    CustomAlertComponent,
    FormMessageComponent,
    CustomPaginationControlsComponent,
    NoDataBannerComponent,
    UserAvatarComponent,
    CustomModalComponent,
    CustomPdfViewerComponent,
    IndexationProgressBarComponent,
    IndexationPageSignaleesRejeteesComponent,
    NotificationAlertComponent,
    PartiesPrenantesTableComponent,
    PartiePrenanteCardComponent,
    PieceDeposeeCardComponent,
    CardNumeroTitreFoncierDetailsComponent,
    CardNumeroRequisitionDetailsComponent,
    CardActeRegistreDetailsComponent,

    // Pipes
    FileSizePipe,
    FormatPourcentagePipe,
    GetPartiesPrenatesParCategoriePipe,
    GetPartiesPrenantesPipe,
    GetProprietaireActuelPipe,
    GetSuperficieContenancePipe,
    GetContenanceFromSuperficiePipe,
    GetNumeroTitreFoncierPipe,

    // Directives
    SeparateurMilliersDirective,
    FormatContactDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgbAccordionModule,
    NgbTooltipModule,
    NgSelectModule,
    NgApexchartsModule,
    SimplebarAngularModule,
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgbAccordionModule,
    NgbTooltipModule,
    NgSelectModule,
    NgApexchartsModule,
    SimplebarAngularModule,

    // Components
    CustomFilePickerComponent,
    CustomAlertComponent,
    FormMessageComponent,
    CustomPaginationControlsComponent,
    NoDataBannerComponent,
    UserAvatarComponent,
    CustomModalComponent,
    CustomPdfViewerComponent,
    IndexationProgressBarComponent,
    IndexationPageSignaleesRejeteesComponent,
    NotificationAlertComponent,
    PartiesPrenantesTableComponent,
    PartiePrenanteCardComponent,
    PieceDeposeeCardComponent,
    CardNumeroTitreFoncierDetailsComponent,
    CardNumeroRequisitionDetailsComponent,
    CardActeRegistreDetailsComponent,

    // Pipes
    FileSizePipe,
    FormatPourcentagePipe,
    GetPartiesPrenatesParCategoriePipe,
    GetPartiesPrenantesPipe,
    GetProprietaireActuelPipe,
    GetSuperficieContenancePipe,
    GetContenanceFromSuperficiePipe,
    GetNumeroTitreFoncierPipe,

    // Directives
    SeparateurMilliersDirective,
    FormatContactDirective,
  ],
  providers: [DatePipe, TitleCasePipe]
})
export class SharedModule { }
