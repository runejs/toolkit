import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpriteDialogComponent } from './sprite-dialog.component';

describe('SpriteDialogComponent', () => {
    let component: SpriteDialogComponent;
    let fixture: ComponentFixture<SpriteDialogComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SpriteDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpriteDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
