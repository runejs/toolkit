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

    public reset(): void {
        this._cacheLoaded = false;
        this._cache = null;
    }

    public loadGameCache(path: string): void {
        this._cache = new NewFormatGameCache(path);
        this._cacheLoaded = true;
    }

    public get cacheLoaded() {
        return this._cacheLoaded;
    }

    public get cache(): NewFormatGameCache {
        return this._cache;
    }
}
