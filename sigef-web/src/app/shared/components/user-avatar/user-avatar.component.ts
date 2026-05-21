import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss'
})
export class UserAvatarComponent {

  readonly USER_PROFILES_PATH: string = environment.MEDIAS_PATH.USER_PROFILES

  @Input() photoDeProfil?: string
  @Input() alt: string = "User profile"
  @Input() type: number = 1
}
