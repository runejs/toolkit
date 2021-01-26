import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelFilePreviewComponent } from './model-file-preview.component';

describe('ModelFilePreviewComponent', () => {
    let component: ModelFilePreviewComponent;
    let fixture: ComponentFixture<ModelFilePreviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModelFilePreviewComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelFilePreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
