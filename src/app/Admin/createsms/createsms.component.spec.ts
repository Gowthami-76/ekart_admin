import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesmsComponent } from './createsms.component';

describe('CreatesmsComponent', () => {
  let component: CreatesmsComponent;
  let fixture: ComponentFixture<CreatesmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatesmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
