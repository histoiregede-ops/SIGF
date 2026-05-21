import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeQuartiersPageComponent } from './liste-quartiers-page.component';

describe('ListeQuartiersPageComponent', () => {
  let component: ListeQuartiersPageComponent;
  let fixture: ComponentFixture<ListeQuartiersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeQuartiersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeQuartiersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
