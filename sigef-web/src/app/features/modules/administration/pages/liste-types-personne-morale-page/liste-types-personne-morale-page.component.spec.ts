import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypesPersonneMoralePageComponent } from './liste-types-personne-morale-page.component';

describe('ListeTypesPersonneMoralePageComponent', () => {
  let component: ListeTypesPersonneMoralePageComponent;
  let fixture: ComponentFixture<ListeTypesPersonneMoralePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeTypesPersonneMoralePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTypesPersonneMoralePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
