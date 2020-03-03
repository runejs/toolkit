import { Injectable } from '@angular/core';
import { NewFormatGameCache } from '@runejs/cache-parser';

@Injectable({
    providedIn: 'root'
})
export class RsCacheService {

    public test: string;
    private _cacheLoaded = false;
    private _cache: NewFormatGameCache;

    public constructor() {
    }

    public loadGameCache(path: string): void {
        this._cache = new NewFormatGameCache(path);
        this._cacheLoaded = true;

        this.test = JSON.stringify(this._cache.npcDefinitions.get(0), null, 4);
    }

    public get cacheLoader() {
        return this._cacheLoaded;
    }

    public get cache(): NewFormatGameCache {
        return this._cache;
    }
}
