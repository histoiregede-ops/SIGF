import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';

@Component({
  selector: 'app-saisie-donnees-actes-page',
  templateUrl: './saisie-donnees-actes-page.component.html',
  styleUrl: './saisie-donnees-actes-page.component.scss'
})
export class SaisieDonneesActesPageComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const segments = this.activatedRoute.snapshot.url.map(s => s.path);
    const type = this.activatedRoute.snapshot.paramMap.get('type') as TypesRegistre | null;

    if (segments.includes('controle')) {
      const target = type ? `/indexation/taches/controle/${type}` : '/indexation/taches/controle/formalites';
      this.router.navigateByUrl(target);
    } else {
      const target = type ? `/indexation/taches/saisie/${type}` : '/indexation/taches/saisie/formalites';
      this.router.navigateByUrl(target);
    }
  }
}
