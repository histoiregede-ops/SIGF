import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVillagesPageComponent } from './liste-villages-page.component';

describe('ListeVillagesPageComponent', () => {
  let component: ListeVillagesPageComponent;
  let fixture: ComponentFixture<ListeVillagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeVillagesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeVillagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
