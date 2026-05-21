import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementDemandeTransfertPageComponent } from './traitement-demande-transfert-page.component';

describe('TraitementDemandeTransfertPageComponent', () => {
  let component: TraitementDemandeTransfertPageComponent;
  let fixture: ComponentFixture<TraitementDemandeTransfertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TraitementDemandeTransfertPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraitementDemandeTransfertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
