import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Mutations, SectionStatus } from '../../../models/title-document.model';

@Component({
  selector: 'app-section4',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './section4.component.html',
  styleUrls: ['../metadata-editor.component.scss']
})
export class Section4Component implements OnInit {
  @Input() section!: Mutations;
  @Input() isExpanded = false;
  @Output() toggleExpand = new EventEmitter<void>();
  @Output() statusChange = new EventEmitter<SectionStatus>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({});
  }

  onToggleExpand(): void {
    this.toggleExpand.emit();
  }

  onSave(): void {
    this.statusChange.emit('in_progress');
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
