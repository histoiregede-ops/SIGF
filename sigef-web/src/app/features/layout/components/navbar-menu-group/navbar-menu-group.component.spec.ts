import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMenuGroupComponent } from './navbar-menu-group.component';

describe('NavbarMenuGroupComponent', () => {
  let component: NavbarMenuGroupComponent;
  let fixture: ComponentFixture<NavbarMenuGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarMenuGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarMenuGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
