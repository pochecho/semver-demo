import { ChangeDetectorRef, Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { AdDirective } from 'src/app/core/ui/directives/ad-host-directive/ad-host';
import { TechnologiesBulletComponent } from 'src/app/core/ui/general-components/technologies-bullet/technologies-bullet.component';
import { EmbedFlutterVisualizatorComponent } from '../embed-flutter-visualizator/embed-flutter-visualizator.component';
import { componentsMapper } from './components-mapper';

@Component({
  selector: 'app-demo-implementation',
  templateUrl: './demo-implementation.component.html',
  styleUrls: ['./demo-implementation.component.scss'],
})
export class DemoImplementationComponent implements OnInit {
  @Input() data: any;
  
  @ViewChild(AdDirective, { static: false }) exampleComponent!: AdDirective;
  @ViewChild(TechnologiesBulletComponent, { static: true }) techs: TechnologiesBulletComponent;

  name;
  technologies;
  examples;
  currentTech;
  inDemoView: boolean;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, public changeDetector: ChangeDetectorRef) {}
  ngOnInit(): void {    
    this.name = this.data['nameComponent'];    
    this.inDemoView = this.name.toLowerCase().indexOf('widget') != -1 ? true : false;
    this.technologies = Object.keys(this.data.implementations).sort();
  }

  renderExample(tech) {
    const viewContainerRef = this.exampleComponent.viewContainerRef;
    viewContainerRef.clear();
    if (tech != 'flutter') {
      if (this.existsImplementation()) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentsMapper[this.name]);
        const componentRef = viewContainerRef.createComponent(componentFactory);
      }
    } else {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EmbedFlutterVisualizatorComponent);
      const componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.baseUrl = 'assets/showcase-mobile/index-flutter.html';
      if(this.data.implementations[tech]['path']){
        componentRef.instance.path = `#/${this.data.implementations[tech]['path'].white}`;
      }
    }
  }
  
  existsImplementation() {
    return componentsMapper[this.name];
  }

  ngAfterViewInit() {
    if (this.technologies) {
      this.techs.selectBullet([...this.technologies].shift());
    }
    this.changeDetector.detectChanges();
  }
  onSelectTech(tech) {
    this.currentTech = tech;
    if(this.data.implementations[tech]){

      this.examples = this.data.implementations[tech].examples;
    }
    this.renderExample(tech);
  }
}
