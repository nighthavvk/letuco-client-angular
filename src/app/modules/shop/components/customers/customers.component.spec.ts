import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { СustomersComponent } from './customers.component';

describe('СustomersComponent', () => {
  let component: СustomersComponent;
  let fixture: ComponentFixture<СustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ СustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(СustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
