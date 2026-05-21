import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFormalitePrealablePageComponent } from './details-formalite-prealable-page.component';

describe('DetailsFormalitePrealablePageComponent', () => {
  let component: DetailsFormalitePrealablePageComponent;
  let fixture: ComponentFixture<DetailsFormalitePrealablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsFormalitePrealablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsFormalitePrealablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
