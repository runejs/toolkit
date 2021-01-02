import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiFilePreviewComponent } from './midi-file-preview.component';

describe('MidiFilePreviewComponent', () => {
    let component: MidiFilePreviewComponent;
    let fixture: ComponentFixture<MidiFilePreviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ MidiFilePreviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MidiFilePreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
