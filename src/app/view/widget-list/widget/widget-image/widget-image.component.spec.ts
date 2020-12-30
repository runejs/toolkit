import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WidgetImageComponent } from './widget-image.component';

describe('WidgetImageComponent', () => {
    let component: WidgetImageComponent;
    let fixture: ComponentFixture<WidgetImageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [WidgetImageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WidgetImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
