import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexationDetailsComponent } from './indexation-details.component';

describe('IndexationDetailsComponent', () => {
  let component: IndexationDetailsComponent;
  let fixture: ComponentFixture<IndexationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
