import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDroitsReelsConstituesParDenombrementTitreFoncierComponent } from './section-droits-reels-constitues-par-denombrement-titre-foncier.component';

describe('SectionDroitsReelsConstituesParDenombrementTitreFoncierComponent', () => {
  let component: SectionDroitsReelsConstituesParDenombrementTitreFoncierComponent;
  let fixture: ComponentFixture<SectionDroitsReelsConstituesParDenombrementTitreFoncierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionDroitsReelsConstituesParDenombrementTitreFoncierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDroitsReelsConstituesParDenombrementTitreFoncierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
