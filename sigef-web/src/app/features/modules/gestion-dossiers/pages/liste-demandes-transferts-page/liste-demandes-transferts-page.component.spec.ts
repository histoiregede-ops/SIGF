import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandesTransfertsPageComponent } from './liste-demandes-transferts-page.component';

describe('ListeDemandesTransfertsPageComponent', () => {
  let component: ListeDemandesTransfertsPageComponent;
  let fixture: ComponentFixture<ListeDemandesTransfertsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeDemandesTransfertsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDemandesTransfertsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
