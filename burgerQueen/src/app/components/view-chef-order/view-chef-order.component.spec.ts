import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChefOrderComponent } from './view-chef-order.component';

describe('ViewChefOrderComponent', () => {
  let component: ViewChefOrderComponent;
  let fixture: ComponentFixture<ViewChefOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewChefOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChefOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
