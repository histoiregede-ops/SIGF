import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePeriodesPageComponent } from './liste-periodes-page.component';

describe('ListePeriodesPageComponent', () => {
  let component: ListePeriodesPageComponent;
  let fixture: ComponentFixture<ListePeriodesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListePeriodesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePeriodesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
