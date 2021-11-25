import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrderProcessComponent } from './card-order-process.component';

describe('CardOrderProcessComponent', () => {
  let component: CardOrderProcessComponent;
  let fixture: ComponentFixture<CardOrderProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardOrderProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrderProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
