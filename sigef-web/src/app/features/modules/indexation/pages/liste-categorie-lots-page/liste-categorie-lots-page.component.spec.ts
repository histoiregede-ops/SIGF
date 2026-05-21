import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCategorieLotsPageComponent } from './liste-categorie-lots-page.component';

describe('ListeCategorieLotsPageComponent', () => {
  let component: ListeCategorieLotsPageComponent;
  let fixture: ComponentFixture<ListeCategorieLotsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeCategorieLotsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCategorieLotsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
