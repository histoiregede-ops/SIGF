import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-message',
  templateUrl: './form-message.component.html',
  styleUrl: './form-message.component.scss'
})
export class FormMessageComponent {

  @Input() show: boolean = false
  @Input() text!: string
  @Input() type: string = 'danger' //primary,secondary,success,danger,warning,info,light,dark

}
