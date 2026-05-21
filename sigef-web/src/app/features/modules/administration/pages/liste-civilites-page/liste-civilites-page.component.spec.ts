import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCivilitesPageComponent } from './liste-civilites-page.component';

describe('ListeCivilitesPageComponent', () => {
  let component: ListeCivilitesPageComponent;
  let fixture: ComponentFixture<ListeCivilitesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeCivilitesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCivilitesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
