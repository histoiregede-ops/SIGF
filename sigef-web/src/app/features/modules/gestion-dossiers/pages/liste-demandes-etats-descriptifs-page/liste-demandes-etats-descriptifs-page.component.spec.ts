import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandesEtatsDescriptifsPageComponent } from './liste-demandes-etats-descriptifs-page.component';

describe('ListeDemandesEtatsDescriptifsPageComponent', () => {
  let component: ListeDemandesEtatsDescriptifsPageComponent;
  let fixture: ComponentFixture<ListeDemandesEtatsDescriptifsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeDemandesEtatsDescriptifsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDemandesEtatsDescriptifsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
