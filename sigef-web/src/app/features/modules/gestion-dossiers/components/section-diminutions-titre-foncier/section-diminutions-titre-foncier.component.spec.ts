import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDiminutionsTitreFoncierComponent } from './section-diminutions-titre-foncier.component';

describe('SectionDiminutionsTitreFoncierComponent', () => {
  let component: SectionDiminutionsTitreFoncierComponent;
  let fixture: ComponentFixture<SectionDiminutionsTitreFoncierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionDiminutionsTitreFoncierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDiminutionsTitreFoncierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
