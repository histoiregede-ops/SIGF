import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDocumentsPageComponent } from './liste-documents-page.component';

describe('ListeDocumentsPageComponent', () => {
  let component: ListeDocumentsPageComponent;
  let fixture: ComponentFixture<ListeDocumentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeDocumentsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDocumentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
