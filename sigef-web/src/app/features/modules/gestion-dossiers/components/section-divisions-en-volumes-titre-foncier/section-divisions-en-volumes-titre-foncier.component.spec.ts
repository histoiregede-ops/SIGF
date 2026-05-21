import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDivisionsEnVolumesTitreFoncierComponent } from './section-divisions-en-volumes-titre-foncier.component';

describe('SectionDivisionsEnVolumesTitreFoncierComponent', () => {
  let component: SectionDivisionsEnVolumesTitreFoncierComponent;
  let fixture: ComponentFixture<SectionDivisionsEnVolumesTitreFoncierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionDivisionsEnVolumesTitreFoncierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDivisionsEnVolumesTitreFoncierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
