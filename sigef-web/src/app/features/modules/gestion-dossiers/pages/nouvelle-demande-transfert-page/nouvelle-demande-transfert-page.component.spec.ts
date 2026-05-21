import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleDemandeTransfertPageComponent } from './nouvelle-demande-transfert-page.component';

describe('NouvelleDemandeTransfertPageComponent', () => {
  let component: NouvelleDemandeTransfertPageComponent;
  let fixture: ComponentFixture<NouvelleDemandeTransfertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NouvelleDemandeTransfertPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvelleDemandeTransfertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
