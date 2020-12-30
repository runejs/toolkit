import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilestoreIndexComponent } from './filestore-index.component';

describe('FilestoreIndexComponent', () => {
    let component: FilestoreIndexComponent;
    let fixture: ComponentFixture<FilestoreIndexComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ FilestoreIndexComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilestoreIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
