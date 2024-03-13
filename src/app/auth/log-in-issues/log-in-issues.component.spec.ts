import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInIssuesComponent } from './log-in-issues.component';

describe('LogInIssuesComponent', () => {
  let component: LogInIssuesComponent;
  let fixture: ComponentFixture<LogInIssuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogInIssuesComponent]
    });
    fixture = TestBed.createComponent(LogInIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
