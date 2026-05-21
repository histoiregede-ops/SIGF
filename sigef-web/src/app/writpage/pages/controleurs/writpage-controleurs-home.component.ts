import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-writpage-controleurs-home',
  standalone: false,
  templateUrl: './writpage-controleurs-home.component.html',
  styleUrls: ['./writpage-controleurs-home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class WritpageControleursHomeComponent {
  constructor(private router: Router) {}

  navigateTo(module: string): void {
    this.router.navigate([`/${module}`]);
  }
}
