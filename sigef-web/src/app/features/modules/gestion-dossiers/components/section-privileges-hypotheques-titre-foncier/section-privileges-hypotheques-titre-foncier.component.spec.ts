import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPrivilegesHypothequesTitreFoncierComponent } from './section-privileges-hypotheques-titre-foncier.component';

describe('SectionPrivilegesHypothequesTitreFoncierComponent', () => {
  let component: SectionPrivilegesHypothequesTitreFoncierComponent;
  let fixture: ComponentFixture<SectionPrivilegesHypothequesTitreFoncierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionPrivilegesHypothequesTitreFoncierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionPrivilegesHypothequesTitreFoncierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
