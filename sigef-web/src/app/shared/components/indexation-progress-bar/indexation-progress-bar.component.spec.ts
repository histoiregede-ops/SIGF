import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexationProgressBarComponent } from './indexation-progress-bar.component';

describe('IndexationProgressBarComponent', () => {
  let component: IndexationProgressBarComponent;
  let fixture: ComponentFixture<IndexationProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexationProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexationProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
