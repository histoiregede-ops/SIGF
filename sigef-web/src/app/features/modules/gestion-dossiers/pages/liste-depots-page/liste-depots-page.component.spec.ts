import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDepotsPageComponent } from './liste-depots-page.component';

describe('ListeDepotsPageComponent', () => {
  let component: ListeDepotsPageComponent;
  let fixture: ComponentFixture<ListeDepotsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeDepotsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDepotsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
