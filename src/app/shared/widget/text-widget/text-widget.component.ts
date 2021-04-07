import { Component, Input, OnInit } from '@angular/core';
import { Font, LinkWidget } from '@runejs/filestore';
import { FilestoreService } from '../../../filestore/filestore.service';

@Component({
  selector: 'rs-text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent implements OnInit {
    @Input() widget: LinkWidget;
    @Input() hovering = false;
    private font: Font;
    private defaultSpacing = 4;

    constructor(private filestoreService: FilestoreService) { }

    ngOnInit(): void {
        this.font = this.filestoreService.filestore.fontStore.getFontById(this.widget.fontId);
    }

    // TODO wrap lines if they exceed this widget's width
    public getBase64Text(text: string, color?: number, hoverColor?: number) {
        if (this.hovering && hoverColor) {
            return this.font.drawString(text, hoverColor)
        }

        return this.font.drawString(text, color);
    }

    // Sets the standard string height if the text is empty, otherwise returns null for html to calculate its own height
    public getStringHeight(text: string) {
        if (text.trim() === '') {
            return this.font.getCharHeight('A') + this.defaultSpacing;
        }

        return null;
    }

    public splitTextLines(text: string): string[] {
        return text.split(/\\n/);
    }

    /* Gets the transform CSS value
    *  0 = align start (normal)
    *  1 = align center
    *  2 = align end
    */
    getTextAlignmentStyle() {
        const alignmentStyle: Partial<CSSStyleDeclaration> = {
            alignItems: null,
            justifyContent: null
        };

        if (this.widget.textAlignmentX === 1) {
            alignmentStyle.alignItems = 'center';
        } else if (this.widget.textAlignmentX === 2) {
            alignmentStyle.alignItems = 'flex-end';
        }

        if (this.widget.textAlignmentY === 1) {
            alignmentStyle.justifyContent = 'center';
        } else if (this.widget.textAlignmentY === 2) {
            alignmentStyle.justifyContent = 'flex-end';
        }

        return alignmentStyle;
    }
}
