import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceDeposeeCardComponent } from './piece-deposee-card.component';

describe('PieceDeposeeCardComponent', () => {
  let component: PieceDeposeeCardComponent;
  let fixture: ComponentFixture<PieceDeposeeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieceDeposeeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieceDeposeeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
