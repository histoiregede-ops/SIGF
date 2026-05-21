import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCausesIndisponibiliteTitreFoncierComponent } from './section-causes-indisponibilite-titre-foncier.component';

describe('SectionCausesIndisponibiliteTitreFoncierComponent', () => {
  let component: SectionCausesIndisponibiliteTitreFoncierComponent;
  let fixture: ComponentFixture<SectionCausesIndisponibiliteTitreFoncierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionCausesIndisponibiliteTitreFoncierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCausesIndisponibiliteTitreFoncierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
