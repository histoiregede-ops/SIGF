import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauTitreFoncierPageComponent } from './nouveau-titre-foncier-page.component';

describe('NouveauTitreFoncierPageComponent', () => {
  let component: NouveauTitreFoncierPageComponent;
  let fixture: ComponentFixture<NouveauTitreFoncierPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NouveauTitreFoncierPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauTitreFoncierPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
