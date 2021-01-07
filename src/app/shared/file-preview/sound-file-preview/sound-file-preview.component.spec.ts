import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundFilePreviewComponent } from './sound-file-preview.component';

describe('SoundFilePreviewComponent', () => {
    let component: SoundFilePreviewComponent;
    let fixture: ComponentFixture<SoundFilePreviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ SoundFilePreviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SoundFilePreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
