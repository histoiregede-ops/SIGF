import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesPrenantesTableComponent } from './parties-prenantes-table.component';

describe('PartiesPrenantesTableComponent', () => {
  let component: PartiesPrenantesTableComponent;
  let fixture: ComponentFixture<PartiesPrenantesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartiesPrenantesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiesPrenantesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
