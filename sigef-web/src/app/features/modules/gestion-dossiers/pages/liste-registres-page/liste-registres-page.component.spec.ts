import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRegistresPageComponent } from './liste-registres-page.component';

describe('ListeRegistresPageComponent', () => {
  let component: ListeRegistresPageComponent;
  let fixture: ComponentFixture<ListeRegistresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeRegistresPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeRegistresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
