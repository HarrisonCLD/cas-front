import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateGroupserviceComponent } from './associate-groupservice.component';

describe('AssociateGroupserviceComponent', () => {
  let component: AssociateGroupserviceComponent;
  let fixture: ComponentFixture<AssociateGroupserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociateGroupserviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociateGroupserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
