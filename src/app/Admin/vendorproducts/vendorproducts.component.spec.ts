import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorproductsComponent } from './vendorproducts.component';

describe('VendorproductsComponent', () => {
  let component: VendorproductsComponent;
  let fixture: ComponentFixture<VendorproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorproductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
