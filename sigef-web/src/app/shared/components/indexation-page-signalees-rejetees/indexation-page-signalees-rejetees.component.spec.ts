import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexationPageSignaleesRejeteesComponent } from './indexation-page-signalees-rejetees.component';

describe('IndexationPageSignaleesRejeteesComponent', () => {
  let component: IndexationPageSignaleesRejeteesComponent;
  let fixture: ComponentFixture<IndexationPageSignaleesRejeteesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexationPageSignaleesRejeteesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexationPageSignaleesRejeteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
