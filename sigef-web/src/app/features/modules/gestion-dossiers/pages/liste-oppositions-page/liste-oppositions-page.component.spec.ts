import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOppositionsPageComponent } from './liste-oppositions-page.component';

describe('ListeOppositionsPageComponent', () => {
  let component: ListeOppositionsPageComponent;
  let fixture: ComponentFixture<ListeOppositionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeOppositionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeOppositionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
