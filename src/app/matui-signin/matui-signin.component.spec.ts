import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatuiSigninComponent } from './matui-signin.component';

describe('MatuiSigninComponent', () => {
  let component: MatuiSigninComponent;
  let fixture: ComponentFixture<MatuiSigninComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatuiSigninComponent]
    });
    fixture = TestBed.createComponent(MatuiSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
