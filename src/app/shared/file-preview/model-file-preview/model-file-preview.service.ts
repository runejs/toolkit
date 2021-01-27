import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ColorUtils, RsModel } from '@runejs/filestore';

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
        if (this.rsModelMesh == null) {
            return;
        }
        if (this.rsModelMesh.material instanceof THREE.Material) {
            this.rsModelMesh.material.dispose();
        } else {
            this.rsModelMesh.material.forEach(item => {
                item.dispose();
            });
        }
        this.rsModelMesh.geometry.dispose();
        this.scene.remove(this.rsModelMesh);
    }

    public createRsModelMesh(model: RsModel): void {
        model.applyLighting(64, 850, -30, -50, -30, true);

        const geometry = new THREE.BufferGeometry();
        const materials = new Array<THREE.Material>();
        // the default material
        materials.push(new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            flatShading: true,
            vertexColors: true
        }));

        const vertices = [];
        const normals = [];
        const colors = [];

        for (let i = 0; i < model.faceCount; i++) {
            const faceType = model.faceTypes == null ? 0 : (model.faceTypes[i] & 0x3);
            let faceA: number;
            let faceB: number;
            let faceC: number;
            switch (faceType) {
                case 0:
                case 1:
                    faceA = model.faceIndicesA[i];
                    faceB = model.faceIndicesB[i];
                    faceC = model.faceIndicesC[i];
                    break;
                case 2:
                case 3:
                    const texturedFaceIndex = model.faceTypes[i] >> 2;
                    faceA = model.texturedFaceIndicesA[texturedFaceIndex];
                    faceB = model.texturedFaceIndicesB[texturedFaceIndex];
                    faceC = model.texturedFaceIndicesC[texturedFaceIndex];
                    break;
                default:
                    continue;
            }

            // vertices and normals
            for (const vertex of [faceA, faceB, faceC]) {
                vertices.push(model.verticesX[vertex] / 15.0);
                vertices.push(-model.verticesY[vertex] / 15.0);
                vertices.push(model.verticesZ[vertex] / 15.0);

                const vertexNormal = model.vertexNormals[vertex];
                normals.push(vertexNormal.x);
                normals.push(vertexNormal.y);
                normals.push(vertexNormal.z);
            }

            // face colors
            switch (faceType) {
                case 0: // shaded face
                case 2: // textured shaded face
                    // TODO Apply texture color
                    // TODO Apply shadow
                    const hsbColor = model.faceColors[i];
                    const shadowedColorX = hsbColor; // ColorUtils.method709(hsbColor, model.faceColorsX[i]);
                    const shadowedColorY = hsbColor; // ColorUtils.method709(hsbColor, model.faceColorsY[i]);
                    const shadowedColorZ = hsbColor; // ColorUtils.method709(hsbColor, model.faceColorsZ[i]);
                    const colorX = new THREE.Color(ColorUtils.hsbToRgb(shadowedColorX));
                    const colorY = new THREE.Color(ColorUtils.hsbToRgb(shadowedColorY));
                    const colorZ = new THREE.Color(ColorUtils.hsbToRgb(shadowedColorZ));

                    for(const rgb of [colorX, colorY, colorZ]) {
                        colors.push(rgb.r);
                        colors.push(rgb.g);
                        colors.push(rgb.b);
                    }
                    break;
                case 1: // flat face
                case 3: // textured flat face
                    // TODO Apply texture color
                    const color = new THREE.Color(ColorUtils.hsbToRgb(model.faceColorsX[i]));
                    for(const rgb of [color, color, color]) {
                        colors.push(rgb.r);
                        colors.push(rgb.g);
                        colors.push(rgb.b);
                    }
                    break;
            }

            // TODO Multi materials (textures)
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
        geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

        const mesh = new THREE.Mesh(geometry, materials[0]);
        mesh.rotateY(Math.PI);
        this.rsModelMesh = mesh;
        this.scene.add(mesh);
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
