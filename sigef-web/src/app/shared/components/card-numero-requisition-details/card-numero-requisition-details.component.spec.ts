import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNumeroRequisitionDetailsComponent } from './card-numero-requisition-details.component';

describe('CardNumeroRequisitionDetailsComponent', () => {
  let component: CardNumeroRequisitionDetailsComponent;
  let fixture: ComponentFixture<CardNumeroRequisitionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardNumeroRequisitionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNumeroRequisitionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
