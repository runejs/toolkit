import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetFilePreviewComponent } from './widget-file-preview.component';

describe('WidgetFilePreviewComponent', () => {
    let component: WidgetFilePreviewComponent;
    let fixture: ComponentFixture<WidgetFilePreviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ WidgetFilePreviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WidgetFilePreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
