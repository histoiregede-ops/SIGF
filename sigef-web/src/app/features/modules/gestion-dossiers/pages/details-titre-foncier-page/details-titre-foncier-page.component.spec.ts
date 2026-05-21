import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTitreFoncierPageComponent } from './details-titre-foncier-page.component';

describe('DetailsTitreFoncierPageComponent', () => {
  let component: DetailsTitreFoncierPageComponent;
  let fixture: ComponentFixture<DetailsTitreFoncierPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsTitreFoncierPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTitreFoncierPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
