import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActeRegistreDetailsComponent } from './card-acte-registre-details.component';

describe('CardActeRegistreDetailsComponent', () => {
  let component: CardActeRegistreDetailsComponent;
  let fixture: ComponentFixture<CardActeRegistreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardActeRegistreDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardActeRegistreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
