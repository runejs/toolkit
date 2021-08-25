import { Injectable } from '@angular/core';
import { FileData, FileIndex, Filestore, getFileName, hash } from '@runejs/filestore';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class FilestoreService {

    public test: string;
    public filestore: Filestore;
    public indexes: FileIndex[] = [];
    public breadcrumb: ([ string, string ] | string)[] = [];
    public fileDisplay: 'grid' | 'list' = 'grid';
    public searchText: string = '';
    public filtered: Subject<string> = new Subject<string>();

    public readonly previewFileEvent = new Subject<{
        file: FileData;
        index: FileIndex;
    }>();

    private _filestoreLoaded = false;

    public constructor() {
    }

    public filterFiles(files: FileData[]): FileData[] {
        if(!this.searchText) {
            return files;
        }

        return files.filter(file => {
            const fileName = getFileName(file.nameHash);
            return fileName.includes(this.searchText) || hash(this.searchText) === file.nameHash;
        });
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
    }

    public loadFilestore(path: string): void {
        if(!path) {
            return;
        }
        this.filestore = new Filestore(path);
        this._filestoreLoaded = true;
    }

    public get filestoreLoaded() {
        return this._filestoreLoaded;
    }
}
