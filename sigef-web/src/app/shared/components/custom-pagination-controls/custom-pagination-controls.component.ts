import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';

export type PaginationEventData = {
  page: number,
  paginationSize: number
}

@Component({
  selector: 'app-custom-pagination-controls',
  templateUrl: './custom-pagination-controls.component.html',
  styleUrl: './custom-pagination-controls.component.scss'
})
export class CustomPaginationControlsComponent implements OnChanges {

  @Input() currentPage!: number
  @Input() totalPages!: number
  @Input() totalItems!: number
  @Output() paginationChange: EventEmitter<PaginationEventData> = new EventEmitter<PaginationEventData>()
  @Input() paginationSize: number = 10
  pages: number[] = []

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      if (changes['totalPages'].previousValue != changes['totalPages'].currentValue) {
        this.pages = []
        for (let index = 0; index < this.totalPages; index++) {
          this.pages.push(index)
        }
      }
    }
  }

  private emitCurrentData(): void {
    this.paginationChange.emit({
      page: this.currentPage,
      paginationSize: this.paginationSize
    })
  }

  next(): void {
    this.currentPage++
    this.emitCurrentData()
  }

  prev(): void {
    this.currentPage--
    this.emitCurrentData()
  }

  changePage(page: number): void {
    this.currentPage = page
    this.emitCurrentData()
  }

  changePaginationSize() {
    this.currentPage = 0
    this.emitCurrentData()
  }
}
