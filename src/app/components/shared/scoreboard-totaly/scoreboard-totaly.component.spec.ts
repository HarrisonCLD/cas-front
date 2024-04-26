import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardTotalyComponent } from './scoreboard-totaly.component';

describe('ScoreboardTotalyComponent', () => {
  let component: ScoreboardTotalyComponent;
  let fixture: ComponentFixture<ScoreboardTotalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreboardTotalyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoreboardTotalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
