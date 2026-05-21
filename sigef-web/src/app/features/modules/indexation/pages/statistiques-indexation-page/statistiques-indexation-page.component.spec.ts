import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesIndexationPageComponent } from './statistiques-indexation-page.component';

describe('StatistiquesIndexationPageComponent', () => {
  let component: StatistiquesIndexationPageComponent;
  let fixture: ComponentFixture<StatistiquesIndexationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatistiquesIndexationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiquesIndexationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
