import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDepotPageComponent } from './details-depot-page.component';

describe('DetailsDepotPageComponent', () => {
  let component: DetailsDepotPageComponent;
  let fixture: ComponentFixture<DetailsDepotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsDepotPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDepotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
