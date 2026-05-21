import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFormalitesPrealablesPageComponent } from './liste-formalites-prealables-page.component';

describe('ListeFormalitesPrealablesPageComponent', () => {
  let component: ListeFormalitesPrealablesPageComponent;
  let fixture: ComponentFixture<ListeFormalitesPrealablesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeFormalitesPrealablesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeFormalitesPrealablesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
