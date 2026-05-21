import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUtilisateursPageComponent } from './liste-utilisateurs-page.component';

describe('ListeUtilisateursPageComponent', () => {
  let component: ListeUtilisateursPageComponent;
  let fixture: ComponentFixture<ListeUtilisateursPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeUtilisateursPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeUtilisateursPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
