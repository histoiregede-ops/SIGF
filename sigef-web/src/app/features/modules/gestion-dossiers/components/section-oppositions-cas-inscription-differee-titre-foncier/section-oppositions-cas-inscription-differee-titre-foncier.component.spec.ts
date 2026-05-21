import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOppositionsCasInscriptionDiffereeTitreFoncierComponent } from './section-oppositions-cas-inscription-differee-titre-foncier.component';

describe('SectionOppositionsCasInscriptionDiffereeTitreFoncierComponent', () => {
  let component: SectionOppositionsCasInscriptionDiffereeTitreFoncierComponent;
  let fixture: ComponentFixture<SectionOppositionsCasInscriptionDiffereeTitreFoncierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionOppositionsCasInscriptionDiffereeTitreFoncierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionOppositionsCasInscriptionDiffereeTitreFoncierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
