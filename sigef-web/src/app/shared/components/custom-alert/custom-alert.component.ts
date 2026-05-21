import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.scss'
})
export class CustomAlertComponent {
  @Input() show!: boolean
  @Input() text!: string
  @Input() type: string = 'primary' //primary,secondary,success,danger,warning,info,light,dark

  constructor() { }

  ngOnInit(): void {
  }
}
