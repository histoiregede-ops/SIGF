import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceIndexationPageComponent } from './espace-indexation-page.component';

describe('EspaceIndexationPageComponent', () => {
  let component: EspaceIndexationPageComponent;
  let fixture: ComponentFixture<EspaceIndexationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspaceIndexationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceIndexationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
