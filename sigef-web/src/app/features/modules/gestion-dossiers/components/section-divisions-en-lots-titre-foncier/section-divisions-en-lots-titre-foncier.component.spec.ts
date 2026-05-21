import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDivisionsEnLotsTitreFoncierComponent } from './section-divisions-en-lots-titre-foncier.component';

describe('SectionDivisionsEnLotsTitreFoncierComponent', () => {
  let component: SectionDivisionsEnLotsTitreFoncierComponent;
  let fixture: ComponentFixture<SectionDivisionsEnLotsTitreFoncierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionDivisionsEnLotsTitreFoncierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDivisionsEnLotsTitreFoncierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
