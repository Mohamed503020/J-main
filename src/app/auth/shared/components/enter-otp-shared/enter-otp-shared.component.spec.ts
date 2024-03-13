import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterOtpSharedComponent } from './enter-otp-shared.component';

describe('EnterOtpSharedComponent', () => {
  let component: EnterOtpSharedComponent;
  let fixture: ComponentFixture<EnterOtpSharedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterOtpSharedComponent]
    });
    fixture = TestBed.createComponent(EnterOtpSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
