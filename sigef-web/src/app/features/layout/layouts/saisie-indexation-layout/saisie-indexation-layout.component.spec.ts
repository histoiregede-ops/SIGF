import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieIndexationLayoutComponent } from './saisie-indexation-layout.component';

describe('SaisieIndexationLayoutComponent', () => {
  let component: SaisieIndexationLayoutComponent;
  let fixture: ComponentFixture<SaisieIndexationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaisieIndexationLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaisieIndexationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
