import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePrefecturesPageComponent } from './liste-prefectures-page.component';

describe('ListePrefecturesPageComponent', () => {
  let component: ListePrefecturesPageComponent;
  let fixture: ComponentFixture<ListePrefecturesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListePrefecturesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePrefecturesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
