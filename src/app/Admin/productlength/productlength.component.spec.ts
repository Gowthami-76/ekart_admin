import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlengthComponent } from './productlength.component';

describe('ProductlengthComponent', () => {
  let component: ProductlengthComponent;
  let fixture: ComponentFixture<ProductlengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductlengthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
