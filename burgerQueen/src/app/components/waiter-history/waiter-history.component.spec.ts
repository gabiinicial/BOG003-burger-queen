import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterHistoryComponent } from './waiter-history.component';

describe('WaiterHistoryComponent', () => {
  let component: WaiterHistoryComponent;
  let fixture: ComponentFixture<WaiterHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
