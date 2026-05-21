import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAugmentationsTitreFoncierComponent } from './section-augmentations-titre-foncier.component';

describe('SectionAugmentationsTitreFoncierComponent', () => {
  let component: SectionAugmentationsTitreFoncierComponent;
  let fixture: ComponentFixture<SectionAugmentationsTitreFoncierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionAugmentationsTitreFoncierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionAugmentationsTitreFoncierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
