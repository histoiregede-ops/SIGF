import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePiecesIdentitePageComponent } from './liste-pieces-identite-page.component';

describe('ListePiecesIdentitePageComponent', () => {
  let component: ListePiecesIdentitePageComponent;
  let fixture: ComponentFixture<ListePiecesIdentitePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListePiecesIdentitePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePiecesIdentitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
