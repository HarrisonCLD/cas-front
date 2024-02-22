import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditLabelComponent } from './dialog-edit-label.component';

describe('DialogEditLabelComponent', () => {
  let component: DialogEditLabelComponent;
  let fixture: ComponentFixture<DialogEditLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditLabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
