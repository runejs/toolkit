import { Injectable } from '@angular/core';
import { NewFormatGameCache } from '@runejs/cache-parser';
import { Filestore } from '@runejs/filestore';

@Injectable({
    providedIn: 'root'
})
export class FilestoreService {

    public test: string;
    private _filestoreLoaded = false;
    private _filestore: NewFormatGameCache;
    public newfilestore: Filestore;

    public constructor() {
    }

    public reset(): void {
        this._filestoreLoaded = false;
        this._filestore = null;
    }

    public loadFilestore(path: string): void {
        this.newfilestore = new Filestore(path);
        this._filestore = new NewFormatGameCache(path);
        this._filestoreLoaded = true;
    }

    public get filestoreLoaded() {
        return this._filestoreLoaded;
    }

    public get filestore(): NewFormatGameCache {
        return this._filestore;
    }
}
