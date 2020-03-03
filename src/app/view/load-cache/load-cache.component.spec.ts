import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCacheComponent } from './load-cache.component';

describe('LoadCacheComponent', () => {
    let component: LoadCacheComponent;
    let fixture: ComponentFixture<LoadCacheComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoadCacheComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadCacheComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
