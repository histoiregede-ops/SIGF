import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleOppositionPageComponent } from './nouvelle-opposition-page.component';

describe('NouvelleOppositionPageComponent', () => {
  let component: NouvelleOppositionPageComponent;
  let fixture: ComponentFixture<NouvelleOppositionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NouvelleOppositionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvelleOppositionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
