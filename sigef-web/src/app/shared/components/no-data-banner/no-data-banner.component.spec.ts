import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataBannerComponent } from './no-data-banner.component';

describe('NoDataBannerComponent', () => {
  let component: NoDataBannerComponent;
  let fixture: ComponentFixture<NoDataBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoDataBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDataBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
