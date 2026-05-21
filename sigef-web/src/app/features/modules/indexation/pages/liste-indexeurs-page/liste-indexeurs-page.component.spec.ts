import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeIndexeursPageComponent } from './liste-indexeurs-page.component';

describe('ListeIndexeursPageComponent', () => {
  let component: ListeIndexeursPageComponent;
  let fixture: ComponentFixture<ListeIndexeursPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeIndexeursPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeIndexeursPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
