import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypesRegistrePageComponent } from './liste-types-registre-page.component';

describe('ListeTypesRegistrePageComponent', () => {
  let component: ListeTypesRegistrePageComponent;
  let fixture: ComponentFixture<ListeTypesRegistrePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeTypesRegistrePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTypesRegistrePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
