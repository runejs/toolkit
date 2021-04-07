import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleWidgetComponent } from './rectangle-widget.component';

describe('RectangleWidgetComponent', () => {
  let component: RectangleWidgetComponent;
  let fixture: ComponentFixture<RectangleWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangleWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
