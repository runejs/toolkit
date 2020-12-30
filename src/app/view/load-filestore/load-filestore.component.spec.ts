import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFilestoreComponent } from './load-filestore.component';

describe('LoadCacheComponent', () => {
    let component: LoadFilestoreComponent;
    let fixture: ComponentFixture<LoadFilestoreComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoadFilestoreComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadFilestoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
