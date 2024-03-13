import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAccountContainerComponent } from './sub-account-container.component';

describe('SubAccountContainerComponent', () => {
  let component: SubAccountContainerComponent;
  let fixture: ComponentFixture<SubAccountContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubAccountContainerComponent]
    });
    fixture = TestBed.createComponent(SubAccountContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
