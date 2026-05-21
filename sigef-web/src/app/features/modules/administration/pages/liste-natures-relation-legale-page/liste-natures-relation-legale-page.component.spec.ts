import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeNaturesRelationLegalePageComponent } from './liste-natures-relation-legale-page.component';

describe('ListeNaturesRelationLegalePageComponent', () => {
  let component: ListeNaturesRelationLegalePageComponent;
  let fixture: ComponentFixture<ListeNaturesRelationLegalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeNaturesRelationLegalePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeNaturesRelationLegalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
