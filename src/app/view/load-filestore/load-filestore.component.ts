import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FilestoreService } from '../../filestore/filestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'rs-load-filestore',
    templateUrl: './load-filestore.component.html',
    styleUrls: ['./load-filestore.component.scss']
})
export class LoadFilestoreComponent implements OnInit {

    @ViewChild('fileInput', { static: true })
    private fileInput: ElementRef;

    private _loading = false;

    public constructor(private filestoreService: FilestoreService,
                       private snaccboi: MatSnackBar,
                       private router: Router) {
    }

    public ngOnInit(): void {
        this.filestoreService.reset();
    }

    public async onFileSelected(): Promise<void> {
        this._loading = true;

        const fileInput: HTMLInputElement = this.fileInput.nativeElement as HTMLInputElement;
        const files = fileInput.files;

        if(!files || files.length === 0) {
            this.snaccboi.open(`Please select a filestore.`, null, {duration: 5000});
            return;
        }

        await new Promise(async resolve => {
            try {
                if(!this.validFilestore(files)) {
                    fileInput.value = '';
                    this.snaccboi.open(`Filestore format not yet supported.`, null, {duration: 5000});
                } else {
                    let path = files.item(0).path;
                    path = path.substring(0, path.indexOf('main_file_cache.') - 1);

                    this.filestoreService.loadFilestore(path);
                    fileInput.value = '';
                    await this.router.navigate(['filestore']);
                }
            } catch(error) {
                console.error(error);
                this.snaccboi.open(`Error loading filestore.`, null, {duration: 5000});
            }

            this._loading = false;
            resolve();
        });
    }

    private validFilestore(files: FileList): boolean {
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
            } else if(file.name.indexOf('main_file_cache.idx255') !== -1) {
                mainIndexFileFound = true;
            }
        }

        return mainDataFileFound && mainIndexFileFound;
    }

    public get loading() {
        return this._loading;
    }

}
