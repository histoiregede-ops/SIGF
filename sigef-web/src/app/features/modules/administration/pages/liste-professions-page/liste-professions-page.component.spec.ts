import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProfessionsPageComponent } from './liste-professions-page.component';

describe('ListeProfessionsPageComponent', () => {
  let component: ListeProfessionsPageComponent;
  let fixture: ComponentFixture<ListeProfessionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeProfessionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeProfessionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
