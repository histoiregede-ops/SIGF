import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRegionsPageComponent } from './liste-regions-page.component';

describe('ListeRegionsPageComponent', () => {
  let component: ListeRegionsPageComponent;
  let fixture: ComponentFixture<ListeRegionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeRegionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeRegionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
