import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupserviceComponent } from './groupservice.component';

describe('GroupserviceComponent', () => {
  let component: GroupserviceComponent;
  let fixture: ComponentFixture<GroupserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupserviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
