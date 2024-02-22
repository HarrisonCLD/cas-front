import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGroupServiceComponent } from './dialog-group-service.component';

describe('DialogGroupServiceComponent', () => {
  let component: DialogGroupServiceComponent;
  let fixture: ComponentFixture<DialogGroupServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogGroupServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogGroupServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
