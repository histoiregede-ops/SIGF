import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMutationsTitreFoncierComponent } from './section-mutations-titre-foncier.component';

describe('SectionMutationsTitreFoncierComponent', () => {
  let component: SectionMutationsTitreFoncierComponent;
  let fixture: ComponentFixture<SectionMutationsTitreFoncierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionMutationsTitreFoncierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionMutationsTitreFoncierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
