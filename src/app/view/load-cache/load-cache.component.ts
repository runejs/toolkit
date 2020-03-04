import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RsCacheService } from '../../rs-cache/rs-cache.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'rs-load-cache',
    templateUrl: './load-cache.component.html',
    styleUrls: ['./load-cache.component.scss']
})
export class LoadCacheComponent implements OnInit {

    @ViewChild('fileInput', { static: true })
    private fileInput: ElementRef;

    private _loading = false;

    public constructor(private rsCache: RsCacheService,
                       private snaccboi: MatSnackBar,
                       private router: Router) {
    }

    public ngOnInit(): void {
        this.rsCache.reset();
    }

    public onFileSelected(): void {
        this._loading = true;

        const files = (this.fileInput.nativeElement as HTMLInputElement).files;

        if(!files || files.length === 0) {
            this.snaccboi.open(`Please select a game cache.`, null, {duration: 5000});
            return;
        }

        setTimeout(() => {
            new Promise(resolve => {
                if(!this.validCache(files)) {
                    (this.fileInput.nativeElement as HTMLInputElement).value = '';
                    this.snaccboi.open(`Please select a valid game cache.`, null, {duration: 5000});
                    resolve();
                    return;
                }

                let path = files.item(0).path;
                path = path.substring(0, path.indexOf('main_file_cache.') - 1);

                this.rsCache.loadGameCache(path);
                (this.fileInput.nativeElement as HTMLInputElement).value = '';
                this.router.navigate(['cache-tools']).finally(() => resolve());
            }).catch(error => {
                console.error(error);
                this.snaccboi.open(`Error loading game cache.`, null, {duration: 5000});
            }).finally(() => this._loading = false);
        }, 0);
    }

    private validCache(files: FileList): boolean {
        if(!files || files.length === 0) {
            return false;
        }

        let mainDataFileFound = false;
        let mainIndexFileFound = false;

        for(let i = 0; i < files.length; i++) {
            const file: File = files.item(i);

            if(!file) {
                continue;
            }

            if(file.name.indexOf('main_file_cache.dat2') !== -1) {
                mainDataFileFound = true;
            } else if(file.name.indexOf('main_file_cache.idx255') != -1) {
                mainIndexFileFound = true;
            }
        }

        return mainDataFileFound && mainIndexFileFound;
    }

    public get loading() {
        return this._loading;
    }

}
