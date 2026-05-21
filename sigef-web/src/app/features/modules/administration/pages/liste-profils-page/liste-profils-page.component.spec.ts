import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProfilsPageComponent } from './liste-profils-page.component';

describe('ListeProfilsPageComponent', () => {
  let component: ListeProfilsPageComponent;
  let fixture: ComponentFixture<ListeProfilsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeProfilsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeProfilsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
