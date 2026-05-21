import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexationTitreFoncierSectionComponent } from './indexation-titre-foncier-section.component';

describe('IndexationTitreFoncierSectionComponent', () => {
  let component: IndexationTitreFoncierSectionComponent;
  let fixture: ComponentFixture<IndexationTitreFoncierSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexationTitreFoncierSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexationTitreFoncierSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
