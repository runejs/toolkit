import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RsModel } from '@runejs/filestore';
import { FilestoreService } from '../../../filestore/filestore.service';
import { ModelFilePreviewService } from './model-file-preview.service';

@Component({
    selector: 'rs-model-file-preview',
    templateUrl: './model-file-preview.component.html',
    styleUrls: ['./model-file-preview.component.scss']
})
export class ModelFilePreviewComponent implements OnInit, OnChanges, OnDestroy {

    private inited = false;

    @Input() public modelId: number;
    public rsModel: RsModel;

    @ViewChild('threeCanvas', {static: true})
    public canvas: ElementRef<HTMLCanvasElement>;

    constructor(private fileService: FilestoreService, private modelFilePreviewService: ModelFilePreviewService) {
    }

    ngOnInit(): void {
        this.modelFilePreviewService.createScene(this.canvas);
        this.modelFilePreviewService.animate();
        this.renderModel();
        this.inited = true;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (!this.inited) {
            return;
        }
        this.renderModel();
    }

    public ngOnDestroy(): void {

    }

    public renderModel() {
        this.decode();
        if (this.rsModel == null) {
            return;
        }
        this.modelFilePreviewService.removeRsModelMesh();
        this.modelFilePreviewService.createRsModelMesh(this.rsModel);
    }

    public decode(): void {
        try {
            this.rsModel = this.fileService.filestore.modelStore.getModel(this.modelId);
        } catch(e) {
            console.error(e);
        }
    }

}
