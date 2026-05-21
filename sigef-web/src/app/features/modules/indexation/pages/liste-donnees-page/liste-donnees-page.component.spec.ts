import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDonneesPageComponent } from './liste-donnees-page.component';

describe('ListeDonneesPageComponent', () => {
  let component: ListeDonneesPageComponent;
  let fixture: ComponentFixture<ListeDonneesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeDonneesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDonneesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
