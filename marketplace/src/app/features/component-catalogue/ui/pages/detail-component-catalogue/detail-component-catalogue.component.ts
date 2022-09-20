import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { decode } from 'js-base64';
import { GetComponentByIdUsecase } from '../../../domain/usecases/get-component-by-id/get-component-by-id.usecase';
import { AdDirective } from '../../../../../core/ui/directives/ad-host-directive/ad-host';
import { LostContentComponent } from '../../../../../core/ui/general-components/lost-content/lost-content.component';
import { CONFIGURATION_TABS } from '../catalogue-constants';
import { StatusPage } from 'src/app/core/ui/interfaces/status-page';

@Component({
  selector: 'app-detail-component-catalogue',
  templateUrl: './detail-component-catalogue.component.html',
  styleUrls: ['./detail-component-catalogue.component.scss'],
})
export class DetailComponentCatalogueComponent implements OnInit {
  /**
   * Indicates the category of the shown component, so, if a component is a widget
   * or a component from the SDB.
   *
   * @memberof ListComponentCatalogueComponent
   */
  componentCategory;

  configuration: any;

  selector = new FormControl('');
  tabs: any;
  selectedTab: string;
  selectedTechnology = 0;
  formatType = 'simple';
  technology = '';
  data = {};
  inDemoView: boolean;
  category: string = '';
  filter = '';

  status: StatusPage;

  constructor(
    private getComponentByIdUsecase: GetComponentByIdUsecase,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.status = 'Pending';
  }

  @ViewChild(AdDirective, { static: false }) spaceToRender!: AdDirective;

  renderSection(tab: string) {
    if (this.status != 'Not Allowed') {
      if (this.spaceToRender) {
        const viewContainerRef = this.spaceToRender.viewContainerRef;
        viewContainerRef.clear();
        function renderDefaultComponnet(componentFactoryResolver) {
          const componentFactory = componentFactoryResolver.resolveComponentFactory(LostContentComponent);
          viewContainerRef.createComponent(componentFactory);
        }

        if (this.configuration.features[tab]['components']) {
          for (const element of this.configuration.features[tab]['components']) {
            if (element.component) {
              const componentFactory = this.componentFactoryResolver.resolveComponentFactory(element.component);
              const componentRef = viewContainerRef.createComponent(componentFactory);
              let dataToFilter = this.filter;
              let dataToSend = { ...this.data, filter: dataToFilter };
              if (element.data) {
                dataToSend = { ...dataToSend, ...element.data, filter: dataToFilter };
              }
              (componentRef.instance as any).onViewDemo?.subscribe(() => {
                this.inDemoView = true;
                this.renderSection('Ejemplo');
              });
              (componentRef.instance as any).data = dataToSend;
            } else {
              renderDefaultComponnet(this.componentFactoryResolver);
            }
          }
        } else {
          renderDefaultComponnet(this.componentFactoryResolver);
        }
      }
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.category = params.category;
      this.filter = params.filter;
      this.configuration = CONFIGURATION_TABS[this.category];
      this.tabs = Object.keys(this.configuration.features);
      const id = decode(params['id']);

      const $dataService = this.getComponentByIdUsecase.invoke(id);
      if ($dataService) {
        $dataService.subscribe((data) => {
          this.data = data;
          this.status = 'Loaded';

          this.selectTab([...this.tabs].shift());
        });
      } else {
        this.status = 'Not Allowed';
      }
    });
  }

  setValue(value: any): void {
    this.selector.setValue([value]);
  }
  setSelectedTechnologyId(id: any) {
    this.selectedTechnology = id;
  }

  selectTab(tab) {
    this.selectedTab = tab;

    this.renderSection(tab);
  }
}
