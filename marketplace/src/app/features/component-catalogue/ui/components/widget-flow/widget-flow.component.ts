
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-widget-flow',
  templateUrl: './widget-flow.component.html',
  styleUrls: ['./widget-flow.component.scss'],
})
export class WidgetFlowComponent implements OnInit {
  @Input() data: any;
  @Output() onViewDemo: EventEmitter<any> = new EventEmitter();

  baseUrl: string;
  path: any;
  isWeb: boolean;
  inDemoView: boolean;
  urlFigma: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.baseUrl = '';
    if (this.data.implementations['flutter'] && this.data.implementations['flutter'].demoPath) {
      this.path = this.data.implementations['flutter'].demoPath;
    }
    if (this.data.documentation.figma) {
      this.urlFigma = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.figma.com/embed?embed_host=angular&show-proto-sidebar=2&url=' + this.data.documentation.figma
      );
    }else if(this.data.documentation.figmaApp){
      this.urlFigma = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.figma.com/embed?embed_host=angular&show-proto-sidebar=2&url=' + this.data.documentation.figmaApp
      );
    }
    if (this.data.filter === 'Web') {
      this.isWeb = this.data.tags.includes('Web');
    }
  }

  viewDemo() {
    this.onViewDemo.emit();
  }
}
