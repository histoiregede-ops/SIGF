import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVillesPageComponent } from './liste-villes-page.component';

describe('ListeVillesPageComponent', () => {
  let component: ListeVillesPageComponent;
  let fixture: ComponentFixture<ListeVillesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeVillesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeVillesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
