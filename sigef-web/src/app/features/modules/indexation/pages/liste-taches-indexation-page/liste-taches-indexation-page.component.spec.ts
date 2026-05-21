import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTachesIndexationPageComponent } from './liste-taches-indexation-page.component';

describe('ListeTachesIndexationPageComponent', () => {
  let component: ListeTachesIndexationPageComponent;
  let fixture: ComponentFixture<ListeTachesIndexationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeTachesIndexationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTachesIndexationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
