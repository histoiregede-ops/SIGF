import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRolesPageComponent } from './liste-roles-page.component';

describe('ListeRolesPageComponent', () => {
  let component: ListeRolesPageComponent;
  let fixture: ComponentFixture<ListeRolesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeRolesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeRolesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
