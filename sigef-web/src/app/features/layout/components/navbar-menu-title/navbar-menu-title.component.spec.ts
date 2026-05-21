import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMenuTitleComponent } from './navbar-menu-title.component';

describe('NavbarMenuTitleComponent', () => {
  let component: NavbarMenuTitleComponent;
  let fixture: ComponentFixture<NavbarMenuTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarMenuTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarMenuTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
