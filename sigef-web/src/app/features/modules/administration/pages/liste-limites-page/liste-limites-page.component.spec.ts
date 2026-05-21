import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLimitesPageComponent } from './liste-limites-page.component';

describe('ListeLimitesPageComponent', () => {
  let component: ListeLimitesPageComponent;
  let fixture: ComponentFixture<ListeLimitesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeLimitesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeLimitesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
