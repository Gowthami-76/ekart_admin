import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoctionsComponent } from './loctions.component';

describe('LoctionsComponent', () => {
  let component: LoctionsComponent;
  let fixture: ComponentFixture<LoctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
