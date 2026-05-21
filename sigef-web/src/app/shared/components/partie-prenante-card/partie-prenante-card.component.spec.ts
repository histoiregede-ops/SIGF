import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiePrenanteCardComponent } from './partie-prenante-card.component';

describe('PartiePrenanteCardComponent', () => {
  let component: PartiePrenanteCardComponent;
  let fixture: ComponentFixture<PartiePrenanteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartiePrenanteCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiePrenanteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
