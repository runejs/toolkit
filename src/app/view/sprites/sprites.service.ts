import { Injectable } from '@angular/core';
import { FilestoreService } from '../../filestore/filestore.service';
import { Observable, of } from 'rxjs';

export interface Sprite {
    id: number;
    frame: number;
    crc: number;
    version: number;
    width: number;
    height: number;
    base64: string;
}

@Injectable()
export class SpritesService {

    public constructor(private cacheService: FilestoreService) {
    }

    public fetchSprite(id: number): Promise<Sprite> {
        return new Promise<Sprite>(resolve => {
            const sprite = this.cacheService.cache.sprites.get(`${id}:0`);

            if(!sprite.pixels || sprite.pixels.length === 0) {
                resolve({ id: sprite.id, frame: sprite.frame, crc: sprite.crc, version: sprite.version,
                    width: 0, height: 0, base64: null });
                return;
            }

            const png = sprite.toPng();
            if(!png || !png.data) {
                resolve({ id: sprite.id, frame: sprite.frame, crc: sprite.crc, version: sprite.version,
                    width: 0, height: 0, base64: null });
                return;
            }

            png.pack();

            const chunks = [];

            png.on('data', (chunk) => {
                chunks.push(chunk);
            });
            png.on('end', () => {
                const str = Buffer.concat(chunks).toString('base64');
                resolve({ id: sprite.id, frame: sprite.frame, crc: sprite.crc, version: sprite.version,
                    width: sprite.width, height: sprite.height, base64: str });
            });
        });
    }

    public fetchSprites(): Observable<Sprite> {
        return new Observable<Sprite>(subscriber => {
            const promises = [];

            this.cacheService.cache.sprites.forEach((sprite, index) => promises.push(new Promise(resolve => {
                if(!sprite.pixels || sprite.pixels.length === 0) {
                    subscriber.next({ id: sprite.id, frame: sprite.frame, crc: sprite.crc, version: sprite.version,
                        width: 0, height: 0, base64: null });
                    resolve();
                    return;
                }

                const png = sprite.toPng();
                if(!png || !png.data) {
                    subscriber.next({ id: sprite.id, frame: sprite.frame, crc: sprite.crc, version: sprite.version,
                        width: 0, height: 0, base64: null });
                    resolve();
                    return;
                }

                png.pack();

                const chunks = [];

                png.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                png.on('end', () => {
                    const str = Buffer.concat(chunks).toString('base64');
                    subscriber.next({ id: sprite.id, frame: sprite.frame, crc: sprite.crc, version: sprite.version,
                        width: sprite.width, height: sprite.height, base64: str });
                    resolve();
                });
            })));

            Promise.all(promises).then(() => subscriber.complete());
        });
    }

}
