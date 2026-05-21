import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCantonsPageComponent } from './liste-cantons-page.component';

describe('ListeCantonsPageComponent', () => {
  let component: ListeCantonsPageComponent;
  let fixture: ComponentFixture<ListeCantonsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeCantonsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCantonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
