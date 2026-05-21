import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeModesAcquisitionPageComponent } from './liste-modes-acquisition-page.component';

describe('ListeModesAcquisitionPageComponent', () => {
  let component: ListeModesAcquisitionPageComponent;
  let fixture: ComponentFixture<ListeModesAcquisitionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeModesAcquisitionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeModesAcquisitionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
