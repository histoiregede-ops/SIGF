import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPaginationControlsComponent } from './custom-pagination-controls.component';

describe('CustomPaginationControlsComponent', () => {
  let component: CustomPaginationControlsComponent;
  let fixture: ComponentFixture<CustomPaginationControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomPaginationControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPaginationControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
