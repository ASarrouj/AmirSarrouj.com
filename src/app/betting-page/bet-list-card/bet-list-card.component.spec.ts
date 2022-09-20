import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetListCardComponent } from './bet-list-card.component';

describe('BetListCardComponent', () => {
  let component: BetListCardComponent;
  let fixture: ComponentFixture<BetListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
