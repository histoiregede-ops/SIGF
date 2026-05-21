import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexationOppositionSectionComponent } from './indexation-opposition-section.component';

describe('IndexationOppositionSectionComponent', () => {
  let component: IndexationOppositionSectionComponent;
  let fixture: ComponentFixture<IndexationOppositionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexationOppositionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexationOppositionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
