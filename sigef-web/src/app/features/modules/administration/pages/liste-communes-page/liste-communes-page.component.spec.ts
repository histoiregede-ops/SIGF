import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCommunesPageComponent } from './liste-communes-page.component';

describe('ListeCommunesPageComponent', () => {
  let component: ListeCommunesPageComponent;
  let fixture: ComponentFixture<ListeCommunesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeCommunesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCommunesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
