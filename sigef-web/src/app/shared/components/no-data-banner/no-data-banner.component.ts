import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data-banner',
  templateUrl: './no-data-banner.component.html',
  styleUrl: './no-data-banner.component.scss'
})
export class NoDataBannerComponent {
  @Input() show: boolean = false
  @Input() text: string = 'Aucune donnée'
  @Input() hideImage: boolean = false
}
