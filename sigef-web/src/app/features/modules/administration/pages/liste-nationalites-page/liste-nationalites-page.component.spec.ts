import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeNationalitesPageComponent } from './liste-nationalites-page.component';

describe('ListeNationalitesPageComponent', () => {
  let component: ListeNationalitesPageComponent;
  let fixture: ComponentFixture<ListeNationalitesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeNationalitesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeNationalitesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
