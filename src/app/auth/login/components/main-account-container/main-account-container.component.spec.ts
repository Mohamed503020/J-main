import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAccountContainerComponent } from './main-account-container.component';

describe('MainAccountContainerComponent', () => {
  let component: MainAccountContainerComponent;
  let fixture: ComponentFixture<MainAccountContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainAccountContainerComponent]
    });
    fixture = TestBed.createComponent(MainAccountContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
