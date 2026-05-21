import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexationDepotSectionComponent } from './indexation-depot-section.component';

describe('IndexationDepotSectionComponent', () => {
  let component: IndexationDepotSectionComponent;
  let fixture: ComponentFixture<IndexationDepotSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexationDepotSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexationDepotSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
