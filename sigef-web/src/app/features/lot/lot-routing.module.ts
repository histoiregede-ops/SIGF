import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LotListComponent } from './components/lot-list.component';
import { LotDetailComponent } from './components/lot-detail.component';
import { LotFormComponent } from './components/lot-form.component';
import { DocumentDetailComponent } from './components/document-detail.component';
import { UploadComponent } from './components/upload.component';

const routes: Routes = [
  { path: '', component: LotListComponent },
  { path: 'create', component: LotFormComponent },
  { path: ':id', component: LotDetailComponent },
  { path: ':id/edit', component: LotFormComponent },
  { path: 'documents/:id', component: DocumentDetailComponent },
  { path: 'upload', component: UploadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LotRoutingModule {}
