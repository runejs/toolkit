import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SpritePack } from '@runejs/filestore';

/* A directive to apply sprites to the scrollbar */
@Directive({ selector: '[scrollbar-sprites]' })
export class ScrollbarDirective implements OnChanges {
    @Input('scrollbar-sprites') scrollbarSprites: SpritePack;
    scrollUpCssVariable = '--scroll-up';
    scrollDownCssVariable = '--scroll-down';

    constructor(private host: ElementRef<HTMLElement>) {}

    async ngOnChanges(changes: SimpleChanges) {
        const value: SpritePack = changes.scrollbarSprites.currentValue;

        if (!value.sprites) {
            return;
        }

        await this.setScrollbarSprites(value);
    }

    async setScrollbarSprites(scrollbarSprites: SpritePack) {
        const base64Up = await scrollbarSprites.sprites[0].toBase64();
        const base64Down = await scrollbarSprites.sprites[1].toBase64();
        this.host.nativeElement.style.setProperty(this.scrollUpCssVariable, `url(data:image/png;base64,${base64Up})`);
        this.host.nativeElement.style.setProperty(this.scrollDownCssVariable, `url(data:image/png;base64,${base64Down})`);
    }
}
