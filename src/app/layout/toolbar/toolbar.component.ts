import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
    selector: 'rs-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    public constructor(private electron: ElectronService) {
    }

    public ngOnInit(): void {
    }

    public minimizeApp(): void {
        this.electron.remote.BrowserWindow.getFocusedWindow().minimize();
    }

    public maximizeApp(): void {
        this.electron.remote.BrowserWindow.getFocusedWindow().maximize();
    }

    public closeApp(): void {
        this.electron.remote.BrowserWindow.getFocusedWindow().close();
    }

}
