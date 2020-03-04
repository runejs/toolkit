import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Sprite, SpritesService } from './sprites.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SpriteDialogComponent } from './sprite-dialog/sprite-dialog.component';

@Component({
    selector: 'rs-sprites',
    templateUrl: './sprites.component.html',
    styleUrls: ['./sprites.component.scss'],
    providers: [SpritesService]
})
export class SpritesComponent implements OnInit, OnDestroy {

    public sprites: Sprite[] = [];
    public show: 'VALID' | 'MISSING' = 'VALID';
    public loading = true;

    private sub: Subscription;

    public constructor(private service: SpritesService,
                       private changeDetector: ChangeDetectorRef,
                       private dialog: MatDialog) {
    }

    public ngOnInit(): void {
        this.sub = this.service.fetchSprites().subscribe(sprite => this.addSprite(sprite),
            () => {}, () => {
            this.sprites.sort((a, b) => {
                if(a.id === b.id) {
                    return a.frame - b.frame;
                }

                return a.id - b.id;
            });
            this.loading = false;
            this.changeDetector.detectChanges();
        });
    }

    private addSprite(sprite: Sprite): void {
        this.sprites.push(sprite);
    }

    public openSprite(sprite: Sprite): void {
        this.dialog.open(SpriteDialogComponent, {
            data: { sprite }
        });
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
