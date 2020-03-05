import { Injectable } from '@angular/core';
import { RsCacheService } from '../../rs-cache/rs-cache.service';
import { WidgetChild, WidgetDefinition } from '@runejs/cache-parser';

export class WidgetContainerChild extends WidgetChild {
    children?: WidgetChild[] = [];
    erase?: boolean;
}

@Injectable()
export class WidgetListService {

    public constructor(private cacheService: RsCacheService) {
    }

    public fetchWidgets(): WidgetDefinition[] {
        return Array.from(this.cacheService.cache.widgetDefinitions.values());
    }

}
