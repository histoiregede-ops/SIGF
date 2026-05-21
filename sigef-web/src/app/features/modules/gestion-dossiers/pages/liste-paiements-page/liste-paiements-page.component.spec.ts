import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePaiementsPageComponent } from './liste-paiements-page.component';

describe('ListePaiementsPageComponent', () => {
  let component: ListePaiementsPageComponent;
  let fixture: ComponentFixture<ListePaiementsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListePaiementsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePaiementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
