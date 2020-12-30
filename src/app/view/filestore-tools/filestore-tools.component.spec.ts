import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilestoreToolsComponent } from './filestore-tools.component';

describe('CacheToolsComponent', () => {
    let component: FilestoreToolsComponent;
    let fixture: ComponentFixture<FilestoreToolsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FilestoreToolsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilestoreToolsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
