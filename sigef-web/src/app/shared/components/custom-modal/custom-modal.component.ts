import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss'
})
export class CustomModalComponent implements OnChanges {

  @ViewChild('content') content!: ElementRef;

  @Input() title!: string
  @Input() show!: boolean
  // @Output() showChange = new EventEmitter<boolean>();
  @Output() modalClose = new EventEmitter<any>();
  @Input() size: string = 'lg' //'sm', 'lg', 'xl'
  @Input() centered: boolean = true
  @Input() fullscreen: boolean = false

  ngbModalRef?: NgbModalRef

  constructor(private ngbModalService: NgbModal) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      const currentValue: boolean = changes['show'].currentValue as boolean
      if (changes['show'].previousValue != currentValue) {
        if (currentValue) {
          this.ngbModalRef = this.ngbModalService.open(this.content, {
            size: this.size,
            centered: this.centered,
            fullscreen: this.fullscreen,
            backdrop: "static"
          })
        }
        else {
          this.close()
        }
      }
    }
  }

  close(): void {
    if (this.ngbModalRef) {
      this.modalClose.emit()
      this.ngbModalRef.close()
    }
    else {
      this.ngbModalService.dismissAll()
    }
  }

}
