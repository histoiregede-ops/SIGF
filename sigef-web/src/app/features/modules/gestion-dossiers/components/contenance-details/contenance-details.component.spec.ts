import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenanceDetailsComponent } from './contenance-details.component';

describe('ContenanceDetailsComponent', () => {
  let component: ContenanceDetailsComponent;
  let fixture: ComponentFixture<ContenanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContenanceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
