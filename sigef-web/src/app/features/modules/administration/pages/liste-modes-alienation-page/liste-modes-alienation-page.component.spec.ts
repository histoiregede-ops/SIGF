import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeModesAlienationPageComponent } from './liste-modes-alienation-page.component';

describe('ListeModesAlienationPageComponent', () => {
  let component: ListeModesAlienationPageComponent;
  let fixture: ComponentFixture<ListeModesAlienationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeModesAlienationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeModesAlienationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
