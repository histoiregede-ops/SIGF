import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DesignationSection, SectionStatus } from '../../../models/title-document.model';

@Component({
  selector: 'app-section1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './section1.component.html',
  styleUrls: ['../metadata-editor.component.scss']
})
export class Section1Component implements OnInit {
  @Input() section!: DesignationSection;
  @Input() isExpanded = false;
  @Output() toggleExpand = new EventEmitter<void>();
  @Output() statusChange = new EventEmitter<SectionStatus>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(): void {
    if (this.form) {
      this.updateForm();
    }
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      nature: [this.section?.nature || ''],
      contenance: [this.section?.contenance || ''],
      situation: [this.section?.situation || ''],
      limits: [this.section?.limits || ''],
      salesLast10Years: [this.section?.salesLast10Years || '']
    });
  }

  private updateForm(): void {
    this.form.patchValue({
      nature: this.section?.nature || '',
      contenance: this.section?.contenance || '',
      situation: this.section?.situation || '',
      limits: this.section?.limits || '',
      salesLast10Years: this.section?.salesLast10Years || ''
    });
  }

  onToggleExpand(): void {
    this.toggleExpand.emit();
  }

  onSave(): void {
    if (this.form.valid) {
      const newStatus: SectionStatus = this.form.value.nature ? 'in_progress' : 'empty';
      this.statusChange.emit(newStatus);
    }
  }

  getStatusClass(): string {
    const statusMap: { [key: string]: string } = {
      'empty': 'badge-secondary',
      'in_progress': 'badge-warning',
      'completed': 'badge-success',
      'to_review': 'badge-info'
    };
    return statusMap[this.section?.status || 'empty'] || 'badge-secondary';
  }

  getStatusText(): string {
    const statusMap: { [key: string]: string } = {
      'empty': 'Vide',
      'in_progress': 'En cours',
      'completed': 'Complété',
      'to_review': 'À corriger'
    };
    return statusMap[this.section?.status || 'empty'] || 'Vide';
  }
}
