import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoImplementationComponent} from './demo-implementation.component';
import {BcAccordionModule} from "@bancolombia/design-system-web/bc-accordion";
import {BcTabsModule} from "@bancolombia/design-system-web/bc-tabs-group";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';
import { EmbedFlutterVisualizatorComponent } from '../embed-flutter-visualizator/embed-flutter-visualizator.component';
import { TechnologiesBulletComponent } from 'src/app/core/ui/general-components/technologies-bullet/technologies-bullet.component';
import { AccordionExampleComponent } from '../../example-components/bc-accordion/accordion.component';
import { AdDirective } from 'src/app/core/ui/directives/ad-host-directive/ad-host';

describe('ExampleComponentComponent', () => {
  let component: DemoImplementationComponent;
  let fixture: ComponentFixture<DemoImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BcAccordionModule,
        BcTabsModule,
        CommonModule,
        BcIconModule.forRoot({path: ""})
      ],
      declarations: [DemoImplementationComponent, AdDirective, TechnologiesBulletComponent, AccordionExampleComponent, EmbedFlutterVisualizatorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ AccordionExampleComponent, EmbedFlutterVisualizatorComponent ],
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoImplementationComponent);
    component = fixture.componentInstance;
    component.data = {"nameComponent": "Accordion", implementations: {
        flutter: {
          path: {
            white: {}
          },
        },
        angular : {
          path: {
            white: {}
          }
        }
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call existsImplementation', () => {
    expect(component).toBeTruthy();
  });

  it('should renderExample', () => {
    const spy = spyOn(component, 'renderExample').and.callThrough();
    spyOn(component, 'existsImplementation').and.returnValue(true);

    component.renderExample("angular");
    expect(spy).toHaveBeenCalled();

    const content = fixture.nativeElement.querySelector("h3:first-child");

    expect(content.innerText).toBe("Acordeón básico");

  });

  it('should renderExample with flutter', () => {
    const spy = spyOn(component, 'renderExample').and.callThrough();
    spyOn(component, 'existsImplementation').and.returnValue(true);

    component.renderExample("flutter");
    expect(spy).toHaveBeenCalled();

    const content = fixture.nativeElement.querySelector(".cellphone-background > iframe");

    expect(content).not.toBeNull();

  });
});
