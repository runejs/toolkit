import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { FilestoreService } from '../../filestore/filestore.service';

@Component({
    selector: 'rs-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    private maximixed = false;

    public constructor(private electron: ElectronService,
                       private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
    }

    public minimizeApp(): void {
        this.electron.remote.getCurrentWindow().minimize();
    }

    public maximizeApp(): void {
        if(!this.maximixed) {
            this.electron.remote.getCurrentWindow().setSimpleFullScreen(true);
        } else {
            this.electron.remote.getCurrentWindow().setSimpleFullScreen(false);
        }

        this.maximixed = !this.maximixed;
    }

    public closeApp(): void {
        this.electron.remote.getCurrentWindow().close();
    }

    public get cacheLoaded(): boolean {
        return this.filestoreService.filestoreLoaded;
    }

}
