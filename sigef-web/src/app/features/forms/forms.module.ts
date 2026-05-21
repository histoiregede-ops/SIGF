import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormComponent } from './components/dynamic-form.component';
import { FormBuilderComponent } from './components/form-builder.component';

const routes: Routes = [
  { path: '', component: FormBuilderComponent },
  { path: 'render/:id', component: DynamicFormComponent },
];

@NgModule({
  declarations: [DynamicFormComponent, FormBuilderComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FormsModule {}
