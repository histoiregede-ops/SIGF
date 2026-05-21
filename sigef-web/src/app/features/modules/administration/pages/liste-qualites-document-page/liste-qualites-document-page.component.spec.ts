import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeQualitesDocumentPageComponent } from './liste-qualites-document-page.component';

describe('ListeQualitesDocumentPageComponent', () => {
  let component: ListeQualitesDocumentPageComponent;
  let fixture: ComponentFixture<ListeQualitesDocumentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeQualitesDocumentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeQualitesDocumentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
