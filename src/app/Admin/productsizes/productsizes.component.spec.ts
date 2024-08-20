import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsizesComponent } from './productsizes.component';

describe('ProductsizesComponent', () => {
  let component: ProductsizesComponent;
  let fixture: ComponentFixture<ProductsizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsizesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
