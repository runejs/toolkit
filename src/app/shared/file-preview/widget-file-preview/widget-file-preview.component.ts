import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { FilestoreService } from '../../../filestore/filestore.service';
import { ParentWidget } from '@runejs/filestore';
import * as THREE from 'three';

@Component({
    selector: 'rs-widget-file-preview',
    templateUrl: './widget-file-preview.component.html',
    styleUrls: [ './widget-file-preview.component.scss' ]
})
export class WidgetFilePreviewComponent implements OnInit, OnChanges {
    @Input() widgetId: number;
    widget: ParentWidget;
    decoded = false;
    showGrid = true;
    highlightWidgetsOnHover = false;
    modelRenderer: THREE.WebGLRenderer;

    @ViewChild('models', { static: false })
    public canvas: ElementRef<HTMLCanvasElement>;

    constructor(private filestoreService: FilestoreService, private ref: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.decode();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.widgetId && !changes.widgetId.firstChange) {
            this.decoded = false;
            this.decode();
        }
    }

    decode() {
        try {
            this.widget = this.filestoreService.filestore.widgetStore.decodeWidget(this.widgetId) as ParentWidget;
            this.decoded = true;

            this.ref.detectChanges();

            this.modelRenderer = new THREE.WebGLRenderer({
                canvas: this.canvas.nativeElement,
                alpha: true,
                antialias: false
            });
            this.modelRenderer.setPixelRatio(window.devicePixelRatio);
            this.modelRenderer.setSize(this.canvas.nativeElement.parentElement.clientWidth, this.canvas.nativeElement.parentElement.clientHeight);
        } catch (e) {
            console.error(e);
        }
    }
}
