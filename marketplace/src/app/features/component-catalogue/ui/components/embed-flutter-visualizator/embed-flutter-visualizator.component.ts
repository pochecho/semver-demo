import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-embed-flutter-visualizator',
  templateUrl: './embed-flutter-visualizator.component.html',
  styleUrls: ['./embed-flutter-visualizator.component.scss'],
})
export class EmbedFlutterVisualizatorComponent implements OnInit {
  @Input('base-url') baseUrl: string;
  @Input('path') path: string;

  urlpath: SafeResourceUrl;

  @ViewChild('myIframe', { static: true }) frame: ElementRef;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.frame && this.path) {
       this.urlpath = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.path || ''}`);
    }
  }
}
