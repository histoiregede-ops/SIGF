import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLiensGroupePageComponent } from './liste-liens-groupe-page.component';

describe('ListeLiensGroupePageComponent', () => {
  let component: ListeLiensGroupePageComponent;
  let fixture: ComponentFixture<ListeLiensGroupePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeLiensGroupePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeLiensGroupePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
