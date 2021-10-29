import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterInProcessComponent } from './waiter-in-process.component';

describe('WaiterInProcessComponent', () => {
  let component: WaiterInProcessComponent;
  let fixture: ComponentFixture<WaiterInProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterInProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
