import { Injectable } from '@angular/core';
import { FilestoreService } from '../../filestore/filestore.service';
import { WidgetChild, WidgetDefinition } from '@runejs/cache-parser';

export class WidgetContainerChild extends WidgetChild {
    children?: WidgetChild[] = [];
    erase?: boolean;
}

@Injectable()
export class WidgetListService {

    public constructor(private cacheService: FilestoreService) {
    }

    public fetchWidgets(): WidgetDefinition[] {
        return Array.from(this.cacheService.filestore.widgetDefinitions.values());
    }

}
