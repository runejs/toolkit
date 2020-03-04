import { Injectable } from '@angular/core';
import { RsCacheService } from '../../rs-cache/rs-cache.service';
import { WidgetDefinition } from '@runejs/cache-parser';

@Injectable()
export class WidgetListService {

    public constructor(private cacheService: RsCacheService) {
    }

    public fetchWidgets(): WidgetDefinition[] {
        return Array.from(this.cacheService.cache.widgetDefinitions.values());
    }

}
