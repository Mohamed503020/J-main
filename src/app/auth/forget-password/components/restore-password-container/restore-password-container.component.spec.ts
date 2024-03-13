import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordContainerComponent } from './restore-password-container.component';

describe('RestorePasswordContainerComponent', () => {
  let component: RestorePasswordContainerComponent;
  let fixture: ComponentFixture<RestorePasswordContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestorePasswordContainerComponent]
    });
    fixture = TestBed.createComponent(RestorePasswordContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
