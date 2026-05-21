import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTitresFonciersPageComponent } from './liste-titres-fonciers-page.component';

describe('ListeTitresFonciersPageComponent', () => {
  let component: ListeTitresFonciersPageComponent;
  let fixture: ComponentFixture<ListeTitresFonciersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeTitresFonciersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTitresFonciersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
