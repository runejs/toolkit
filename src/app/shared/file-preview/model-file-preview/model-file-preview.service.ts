import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ColorUtils, Filestore, RsModel, SpriteStore, Texture, TextureStore } from '@runejs/filestore';
import { DoubleSide, Material, MeshBasicMaterial, TextureLoader } from 'three';
import { logger } from '@runejs/core';

@Injectable({
    providedIn: 'root'
})
export class ModelFilePreviewService implements OnDestroy {

    private static MODEL_SCALE = 0.025;
    private static FACE_SHADED = 0;
    private static FACE_DEFAULT = 1;

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

    public createRsModelMesh(model: RsModel, textureStore: TextureStore, fileStore: Filestore): void {
        model.applyLighting(64, 768, -50, -10, -50, true);
        model.computeTextureUVs();

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
        const uvs = [];

        // temporary
        let faceIndex = 0;
        const materialIndices = [];
        let lastMaterialIndex = -1;
        let lastGroup: any = null;

        for (let i = 0; i < model.faceCount; i++) {
            const faceType = model.faceTypes == null ? 0 : (model.faceTypes[i] & 0x3);
            let faceA: number;
            let faceB: number;
            let faceC: number;
            switch (faceType) {
                case ModelFilePreviewService.FACE_SHADED:
                case ModelFilePreviewService.FACE_DEFAULT:
                    faceA = model.faceIndicesA[i];
                    faceB = model.faceIndicesB[i];
                    faceC = model.faceIndicesC[i];
                    break;
                default:
                    throw new Error('Unhandled face type: ' + faceType);
            }

            // vertices and normals
            for (const vertex of [faceA, faceB, faceC]) {
                vertices.push(model.verticesX[vertex] || 0);
                vertices.push(-model.verticesY[vertex] || 0);
                vertices.push(model.verticesZ[vertex] || 0);

                const vertexNormal = model.vertexNormals[vertex];
                normals.push(vertexNormal.x);
                normals.push(vertexNormal.y);
                normals.push(vertexNormal.z);
            }

            // colors
            let materialIndex = 0;
            const faceColor = model.faceColors[i];
            switch (faceType) {
                case ModelFilePreviewService.FACE_SHADED:
                    const rgb = ColorUtils.hsbToRgb(faceColor);
                    const shadowedColorX = new THREE.Color(ColorUtils.shade(rgb, ColorUtils.hsbToRgb(model.faceColorsX[i])));
                    const shadowedColorY = new THREE.Color(ColorUtils.shade(rgb, ColorUtils.hsbToRgb(model.faceColorsY[i])));
                    const shadowedColorZ = new THREE.Color(ColorUtils.shade(rgb, ColorUtils.hsbToRgb(model.faceColorsZ[i])));
                    for(const color of [shadowedColorX, shadowedColorY, shadowedColorZ]) {
                        colors.push(color.r);
                        colors.push(color.g);
                        colors.push(color.b);
                    }
                    break;
                case ModelFilePreviewService.FACE_DEFAULT:
                    const colorXYZ = new THREE.Color(ColorUtils.hsbToRgb(model.faceColorsX[i]));
                    for(const color of [colorXYZ, colorXYZ, colorXYZ]) {
                        colors.push(color.r);
                        colors.push(color.g);
                        colors.push(color.b);
                    }
                    break;
            }

            // uvs
            if (model.faceTextures) {
                const u = model.faceTextureU[i];
                const v = model.faceTextureV[i];
                for (let l = 0; l < 3; l++) {
                    uvs.push(u[l]);
                    uvs.push(v[l]);
                }

                // materials
                const textureId = model.faceTextures[i];
                if (textureId !== -1) {
                    materialIndex = materialIndices[textureId];
                    if (materialIndex === undefined) {
                        const texture = textureStore.getTexture(textureId);
                        if (texture) {
                            materialIndices[textureId] = materialIndex = materials.length;
                            texture.generatePixels(fileStore.spriteStore);
                            materials.push(this.createTextureMaterial(texture));
                        } else {
                            materialIndex = 0;
                        }
                    }
                }
            }

            if (materialIndex !== lastMaterialIndex) {
                lastMaterialIndex = materialIndex;
                if (lastGroup != null) {
                    lastGroup.count = (faceIndex * 3) - lastGroup.start;
                    geometry.addGroup(lastGroup.start, lastGroup.count, lastGroup.materialIndex);
                }
                lastGroup = { start: faceIndex * 3, count: 0, materialIndex: lastMaterialIndex };
            }
            faceIndex++;
        }

        if (lastGroup != null) {
            lastGroup.count = (faceIndex * 3) - lastGroup.start;
            geometry.addGroup(lastGroup.start, lastGroup.count, lastGroup.materialIndex);
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
        geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
        geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));

        const mesh = new THREE.Mesh(geometry, materials);
        mesh.rotateY(Math.PI);
        const scale = ModelFilePreviewService.MODEL_SCALE;
        mesh.scale.set(scale, scale, scale);

        this.rsModelMesh = mesh;
        this.scene.add(mesh);
    }

    private createTextureMaterial(texture: Texture): Material {
        const material = new MeshBasicMaterial({
            side: THREE.DoubleSide,
            vertexColors: true
        });
        texture.toBase64().then(value => {
            material.map = new THREE.TextureLoader().load('data:image/png;base64,' + value);
            material.needsUpdate = true;
        });
        return material;
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
