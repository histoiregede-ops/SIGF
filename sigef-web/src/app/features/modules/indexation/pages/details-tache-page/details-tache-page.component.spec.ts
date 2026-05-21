import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTachePageComponent } from './details-tache-page.component';

describe('DetailsTachePageComponent', () => {
  let component: DetailsTachePageComponent;
  let fixture: ComponentFixture<DetailsTachePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsTachePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTachePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
