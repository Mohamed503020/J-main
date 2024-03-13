import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInIssueDetailsComponent } from './log-in-issue-details.component';

describe('LogInIssueDetailsComponent', () => {
  let component: LogInIssueDetailsComponent;
  let fixture: ComponentFixture<LogInIssueDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogInIssueDetailsComponent]
    });
    fixture = TestBed.createComponent(LogInIssueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
