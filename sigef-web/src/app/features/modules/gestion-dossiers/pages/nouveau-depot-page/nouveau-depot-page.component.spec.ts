import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauDepotPageComponent } from './nouveau-depot-page.component';

describe('NouveauDepotPageComponent', () => {
  let component: NouveauDepotPageComponent;
  let fixture: ComponentFixture<NouveauDepotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NouveauDepotPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauDepotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
