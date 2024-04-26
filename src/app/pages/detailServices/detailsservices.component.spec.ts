import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListservicesComponent } from './detailsservices.component';

describe('ListservicesComponent', () => {
  let component: ListservicesComponent;
  let fixture: ComponentFixture<ListservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListservicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
