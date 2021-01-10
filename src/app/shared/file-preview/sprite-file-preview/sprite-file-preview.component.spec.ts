import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpriteFilePreviewComponent } from './sprite-file-preview.component';

describe('SpriteFilePreviewComponent', () => {
    let component: SpriteFilePreviewComponent;
    let fixture: ComponentFixture<SpriteFilePreviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ SpriteFilePreviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SpriteFilePreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
