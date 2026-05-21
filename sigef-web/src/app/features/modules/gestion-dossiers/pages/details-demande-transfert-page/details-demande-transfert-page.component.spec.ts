import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDemandeTransfertPageComponent } from './details-demande-transfert-page.component';

describe('DetailsDemandeTransfertPageComponent', () => {
  let component: DetailsDemandeTransfertPageComponent;
  let fixture: ComponentFixture<DetailsDemandeTransfertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsDemandeTransfertPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDemandeTransfertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
