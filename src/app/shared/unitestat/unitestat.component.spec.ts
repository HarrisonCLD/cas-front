import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitestatComponent } from './unitestat.component';

describe('UnitestatComponent', () => {
  let component: UnitestatComponent;
  let fixture: ComponentFixture<UnitestatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitestatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitestatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
