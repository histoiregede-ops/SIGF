import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeControleursPageComponent } from './liste-controleurs-page.component';

describe('ListeControleursPageComponent', () => {
  let component: ListeControleursPageComponent;
  let fixture: ComponentFixture<ListeControleursPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeControleursPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeControleursPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
