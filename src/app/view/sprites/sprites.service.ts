import { Injectable } from '@angular/core';
import { RsCacheService } from '../../rs-cache/rs-cache.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class SpritesService {

    public constructor(private cacheService: RsCacheService) {
    }

    public fetchSprites(): Observable<string[]> {
        const base64: string[] = [];

        return new Observable<string[]>(subscriber => {
            subscriber.next([]);

            const promises = [];

            this.cacheService.cache.sprites.forEach((sprite, index) => {
                promises.push(new Promise(resolve => {
                    const png = sprite.toPng();
                    if(!png || !png.data) {
                        return;
                    }

                    png.pack();

                    const chunks = [];

                    png.on('data', (chunk) => {
                        chunks.push(chunk);
                    });
                    png.on('end', () => {
                        const str = Buffer.concat(chunks).toString('base64');
                        base64.push(str);
                        subscriber.next(base64);
                    });
                }));
            });

            Promise.all(promises).then(() => subscriber.complete());
        });
    }

}
