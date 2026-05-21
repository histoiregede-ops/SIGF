import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNumeroTitreFoncierDetailsComponent } from './card-numero-titre-foncier-details.component';

describe('CardNumeroTitreFoncierDetailsComponent', () => {
  let component: CardNumeroTitreFoncierDetailsComponent;
  let fixture: ComponentFixture<CardNumeroTitreFoncierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardNumeroTitreFoncierDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNumeroTitreFoncierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
