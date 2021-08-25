import { Component, Input, OnInit } from '@angular/core';
import { RectangleWidget } from '@runejs/filestore';

@Component({
  selector: 'rs-rectangle-widget',
  templateUrl: './rectangle-widget.component.html',
  styleUrls: ['./rectangle-widget.component.scss']
})
export class RectangleWidgetComponent implements OnInit {
    @Input() widget: RectangleWidget;

    constructor() { }

    ngOnInit(): void { }

    decimalToHex(decimal: number) {
        return `#${('000000' + decimal.toString(16)).slice(-6)}`;
    }

    alphaToOpacity(alpha: number) {
        return (255 - alpha) / 255;
    }
}
