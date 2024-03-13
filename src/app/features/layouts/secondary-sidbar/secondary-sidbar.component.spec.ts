import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondarySidbarComponent } from './secondary-sidbar.component';

describe('SecondarySidbarComponent', () => {
  let component: SecondarySidbarComponent;
  let fixture: ComponentFixture<SecondarySidbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondarySidbarComponent]
    });
    fixture = TestBed.createComponent(SecondarySidbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
