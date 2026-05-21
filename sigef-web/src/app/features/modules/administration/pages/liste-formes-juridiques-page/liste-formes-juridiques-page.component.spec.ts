import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFormesJuridiquesPageComponent } from './liste-formes-juridiques-page.component';

describe('ListeFormesJuridiquesPageComponent', () => {
  let component: ListeFormesJuridiquesPageComponent;
  let fixture: ComponentFixture<ListeFormesJuridiquesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeFormesJuridiquesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeFormesJuridiquesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
