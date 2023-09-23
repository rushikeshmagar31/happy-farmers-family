import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmindashPage } from './admindash.page';

describe('AdmindashPage', () => {
  let component: AdmindashPage;
  let fixture: ComponentFixture<AdmindashPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmindashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
