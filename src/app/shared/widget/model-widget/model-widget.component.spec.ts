import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelWidgetComponent } from './model-widget.component';

describe('ModelWidgetComponent', () => {
  let component: ModelWidgetComponent;
  let fixture: ComponentFixture<ModelWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
