import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleFormalitePrealablePageComponent } from './nouvelle-formalite-prealable-page.component';

describe('NouvelleFormalitePrealablePageComponent', () => {
  let component: NouvelleFormalitePrealablePageComponent;
  let fixture: ComponentFixture<NouvelleFormalitePrealablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NouvelleFormalitePrealablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvelleFormalitePrealablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
