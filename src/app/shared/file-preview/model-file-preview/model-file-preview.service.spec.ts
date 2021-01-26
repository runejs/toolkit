import { TestBed } from '@angular/core/testing';

import { ModelFilePreviewService } from './model-file-preview.service';

describe('ModelFilePreviewService', () => {
    let service: ModelFilePreviewService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ModelFilePreviewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
