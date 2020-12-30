import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilestoreComponent } from './filestore.component';

describe('FileViewerComponent', () => {
    let component: FilestoreComponent;
    let fixture: ComponentFixture<FilestoreComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FilestoreComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilestoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
