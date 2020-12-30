import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Titlebar, Color } from 'custom-electron-titlebar';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if(environment.production) {
    enableProdMode();
}

new Titlebar({
    backgroundColor: Color.fromHex('#262626')
});

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
