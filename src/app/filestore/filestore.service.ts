import { Injectable } from '@angular/core';
import { NewFormatGameCache } from '@runejs/cache-parser';
import { FileData, FileIndex, Filestore } from '@runejs/filestore';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class FilestoreService {

    public test: string;
    public filestore: Filestore;
    public indexes: FileIndex[] = [];
    public breadcrumb: ([ string, string ] | string)[] = [];
    public fileDisplay: 'grid' | 'list' = 'list';

    public readonly previewFileEvent = new Subject<{
        file: FileData;
        index: FileIndex;
    }>();

    private _filestoreLoaded = false;
    private _cache: NewFormatGameCache;

    public constructor() {
    }

    public getIndex(indexId: number | string): FileIndex {
        let index = this.indexes.find(i => i.indexId === indexId) || null;

        if(!index) {
            index = this.filestore.getIndex(parseInt(`${indexId}`, 10));
            this.indexes.push(index);
        }

        return index;
    }

    public reset(): void {
        this._filestoreLoaded = false;
        this._cache = null;
    }

    public loadFilestore(path: string): void {
        this.filestore = new Filestore(path);
        this._cache = new NewFormatGameCache(path);
        this._filestoreLoaded = true;
    }

    public get filestoreLoaded() {
        return this._filestoreLoaded;
    }

    public get cache(): NewFormatGameCache {
        return this._cache;
    }
}
