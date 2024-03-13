import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerChatComponent } from './drawer-chat.component';

describe('DrawerChatComponent', () => {
  let component: DrawerChatComponent;
  let fixture: ComponentFixture<DrawerChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawerChatComponent]
    });
    fixture = TestBed.createComponent(DrawerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
