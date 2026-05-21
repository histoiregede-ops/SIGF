import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAttributionsLotsPageComponent } from './liste-attributions-lots-page.component';

describe('ListeAttributionsLotsPageComponent', () => {
  let component: ListeAttributionsLotsPageComponent;
  let fixture: ComponentFixture<ListeAttributionsLotsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeAttributionsLotsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAttributionsLotsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
