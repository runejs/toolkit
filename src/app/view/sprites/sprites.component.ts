import { Component, OnInit } from '@angular/core';
import { SpritesService } from './sprites.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'rs-sprites',
    templateUrl: './sprites.component.html',
    styleUrls: ['./sprites.component.scss'],
    providers: [SpritesService]
})
export class SpritesComponent implements OnInit {

    public images$: Observable<string[]>;

    constructor(private service: SpritesService) {
    }

    ngOnInit(): void {
        this.images$ = this.service.fetchSprites();
    }

}
