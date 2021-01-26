import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Material } from 'three';
import { RsModel } from '@runejs/filestore';

@Injectable({
    providedIn: 'root'
})
export class ModelFilePreviewService implements OnDestroy {

    private canvas: HTMLCanvasElement;
    private canvasWrapper: HTMLElement;

    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private controls: OrbitControls;
    private scene: THREE.Scene;

    private rsModelMesh: THREE.Mesh | null = null;
    private frameId: number = null;

    constructor(private ngZone: NgZone) {
    }

    public ngOnDestroy(): void {
        if (this.frameId != null) {
            cancelAnimationFrame(this.frameId);
        }
    }

    public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
        // The first step is to get the reference of the canvas element from our HTML document
        this.canvas = canvas.nativeElement;
        this.canvasWrapper = canvas.nativeElement.parentElement;

        // create the WebGL renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.canvasWrapper.clientWidth, this.canvasWrapper.clientHeight);

        // create the scene
        this.scene = new THREE.Scene();

        // create the camera
        this.camera = new THREE.PerspectiveCamera(
            75, this.canvasWrapper.clientWidth / this.canvasWrapper.clientHeight, 0.1, 1000
        );
        this.camera.position.z = 5;
        this.scene.add(this.camera);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        const size = 15;
        const divisions = 15;
        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);
    }

    public removeRsModelMesh(): void {
        if (this.rsModelMesh != null) {
            if (this.rsModelMesh.material instanceof Material) {
                this.rsModelMesh.material.dispose();
            } else {
                this.rsModelMesh.material.forEach(item => {
                    item.dispose();
                });
            }
            this.rsModelMesh.geometry.dispose();
            this.scene.remove(this.rsModelMesh);
        }
    }

    public createRsModelMesh(rsModel: RsModel): void {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
    }

    public animate(): void {
        // We have to run this outside angular zones,
        // because it could trigger heavy changeDetection cycles.
        this.ngZone.runOutsideAngular(() => {
            if (document.readyState !== 'loading') {
                this.render();
            } else {
                window.addEventListener('DOMContentLoaded', () => {
                    this.render();
                });
            }
            window.addEventListener('resize', () => {
                this.resize();
            });
        });
    }

    public render(): void {
        this.frameId = requestAnimationFrame(() => {
            this.render();
        });
        this.renderer.render(this.scene, this.camera);
    }

    public resize(): void {
        const width = this.canvasWrapper.clientWidth;
        const height = this.canvasWrapper.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

}
