import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterOtpContainerComponent } from './enter-otp-container.component';

describe('EnterOtpContainerComponent', () => {
  let component: EnterOtpContainerComponent;
  let fixture: ComponentFixture<EnterOtpContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterOtpContainerComponent]
    });
    fixture = TestBed.createComponent(EnterOtpContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
