import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheToolsComponent } from './cache-tools.component';

describe('CacheToolsComponent', () => {
    let component: CacheToolsComponent;
    let fixture: ComponentFixture<CacheToolsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CacheToolsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CacheToolsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
