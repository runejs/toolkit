import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilestoreRootComponent } from './filestore-root.component';

describe('FilestoreRootComponent', () => {
    let component: FilestoreRootComponent;
    let fixture: ComponentFixture<FilestoreRootComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [FilestoreRootComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilestoreRootComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
