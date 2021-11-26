import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOrderChefComponent } from './history-order-chef.component';

describe('HistoryOrderChefComponent', () => {
  let component: HistoryOrderChefComponent;
  let fixture: ComponentFixture<HistoryOrderChefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryOrderChefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOrderChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
