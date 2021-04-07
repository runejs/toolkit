import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MathHelperService {
    private sineTable: number[] = [];
    private cosineTable: number[] = [];

    // RuneScape always uses 2048 positions around a circle to measure rotation
    // Think of it as a pizza with this many slices
    private cuts = 2048;
    private radian = Math.PI * 2 / this.cuts;

    constructor() {
        for (let currentCut = 0; currentCut < this.cuts; currentCut++) {
            this.sineTable[currentCut] = Math.sin(currentCut * this.radian);
            this.cosineTable[currentCut] = Math.cos(currentCut * this.radian);
        }
    }

    getSineTable() {
        return this.sineTable;
    }

    getCosineTable() {
        return this.cosineTable;
    }

    rotationToRadians(rotation: number) {
        return rotation * this.radian;
    }
}
