import { Component, Inject, OnInit } from '@angular/core';
import { Sprite } from '../sprites.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'rs-sprite-dialog',
    templateUrl: './sprite-dialog.component.html',
    styleUrls: ['./sprite-dialog.component.scss']
})
export class SpriteDialogComponent implements OnInit {

    public readonly sprite: Sprite;

    public constructor(@Inject(MAT_DIALOG_DATA) data) {
        this.sprite = data.sprite;
    }

    public ngOnInit(): void {
    }

}
