import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpriteWidgetComponent } from './sprite-widget.component';

describe('SpriteWidgetComponent', () => {
  let component: SpriteWidgetComponent;
  let fixture: ComponentFixture<SpriteWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpriteWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpriteWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
