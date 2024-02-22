import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupValidateComponent } from './popup-validate.component';

describe('PopupValidateComponent', () => {
  let component: PopupValidateComponent;
  let fixture: ComponentFixture<PopupValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupValidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
