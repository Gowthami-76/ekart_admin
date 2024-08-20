import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandalComponent } from './mandal.component';

describe('MandalComponent', () => {
  let component: MandalComponent;
  let fixture: ComponentFixture<MandalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
