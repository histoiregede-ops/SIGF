import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuditViewerComponent } from './components/audit-viewer.component';

const routes: Routes = [
  { path: '', component: AuditViewerComponent },
];

@NgModule({
  declarations: [AuditViewerComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AuditModule {}
