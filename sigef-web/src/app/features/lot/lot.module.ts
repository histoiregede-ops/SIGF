import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LotRoutingModule } from './lot-routing.module';

import { LotListComponent } from './components/lot-list.component';
import { LotDetailComponent } from './components/lot-detail.component';
import { LotFormComponent } from './components/lot-form.component';
import { DocumentDetailComponent } from './components/document-detail.component';
import { UploadComponent } from './components/upload.component';

@NgModule({
  declarations: [
    LotListComponent,
    LotDetailComponent,
    LotFormComponent,
    DocumentDetailComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LotRoutingModule,
  ],
})
export class LotModule {}
