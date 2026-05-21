import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCentresConservationFoncierePageComponent } from './liste-centres-conservation-fonciere-page.component';

describe('ListeCentresConservationFoncierePageComponent', () => {
  let component: ListeCentresConservationFoncierePageComponent;
  let fixture: ComponentFixture<ListeCentresConservationFoncierePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeCentresConservationFoncierePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCentresConservationFoncierePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
