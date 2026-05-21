import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSecteursActivitePageComponent } from './liste-secteurs-activite-page.component';

describe('ListeSecteursActivitePageComponent', () => {
  let component: ListeSecteursActivitePageComponent;
  let fixture: ComponentFixture<ListeSecteursActivitePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeSecteursActivitePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeSecteursActivitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
