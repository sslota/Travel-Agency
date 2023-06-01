import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingletripComponent } from './singlet-rip.component';

describe('SingletripComponent', () => {
  let component: SingletripComponent;
  let fixture: ComponentFixture<SingletripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingletripComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingletripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
