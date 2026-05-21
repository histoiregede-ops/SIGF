import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOppositionPageComponent } from './details-opposition-page.component';

describe('DetailsOppositionPageComponent', () => {
  let component: DetailsOppositionPageComponent;
  let fixture: ComponentFixture<DetailsOppositionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsOppositionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsOppositionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
