import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPartiePrenanteFormComponent } from './test-partie-prenante-form.component';

describe('TestPartiePrenanteFormComponent', () => {
  let component: TestPartiePrenanteFormComponent;
  let fixture: ComponentFixture<TestPartiePrenanteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestPartiePrenanteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPartiePrenanteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
