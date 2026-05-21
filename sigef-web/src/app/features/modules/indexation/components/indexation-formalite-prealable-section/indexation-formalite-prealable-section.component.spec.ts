import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexationFormalitePrealableSectionComponent } from './indexation-formalite-prealable-section.component';

describe('IndexationFormalitePrealableSectionComponent', () => {
  let component: IndexationFormalitePrealableSectionComponent;
  let fixture: ComponentFixture<IndexationFormalitePrealableSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexationFormalitePrealableSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexationFormalitePrealableSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
