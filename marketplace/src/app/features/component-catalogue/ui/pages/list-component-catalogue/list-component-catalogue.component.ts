import { Component, Inject, OnInit } from '@angular/core';
import { GetComponentsUsecase } from '../../../domain/usecases/get-components/get-components.usecase';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TokenService } from 'src/app/core/infraestructure/driven-adapter/token.service';
import {
  ZERO,
  ITEMS_PER_PAGE,
  CONFIGURATION_TABS,
} from '../catalogue-constants';

import { StatusPage } from 'src/app/core/ui/interfaces/status-page';


@Component({
  selector: 'app-list-component-catalogue',
  templateUrl: './list-component-catalogue.component.html',
  styleUrls: ['./list-component-catalogue.component.css'],
})
export class ListComponentCatalogueComponent implements OnInit {
  /**
   * Indicates the category of the shown component, so, if a component is a widget
   * or a component from the SDB.
   *
   * @memberof ListComponentCatalogueComponent
   */
  componentCategory;

  status: StatusPage;
  filter;
  /**
   * Text searched using the input above the content.
   *
   * @memberof ListComponentCatalogueComponent
   */
  searchText = '';

  styleCards = 'square';

  currentPage = 0;

  masterArray: any;
  num = 0;
  selectedItem: any;
  idToken: any;

  configurationTabs;
  itemsPerPage = ITEMS_PER_PAGE;

  category;
  constructor(
    private getComponentCatalogueUsecase: GetComponentsUsecase,
    private router: Router,
    private route: ActivatedRoute,
    public tokenService: TokenService
  ) {
    this.idToken = this.tokenService.idToken;
    this.status = 'Pending';
  }
  ngOnInit(): void {
    this.route.params.subscribe((p: Params) => {
      this.componentCategory = p.category;
      this.configurationTabs = CONFIGURATION_TABS[p.category];
      this.getData();
    });
  }
  goToItems(id,filter) {
    this.router.navigate([btoa(id),filter], { relativeTo: this.route });
  }



 

  getAllItemsByFilter(filter: string) {
    let response = 0;
    if (this.masterArray && this.masterArray[filter]) {
      for (const page of this.masterArray[filter]) {
        response += page.length;
      }
    }
    return response;
  }

  getData(): void {

    if (this.configurationTabs) {
      const observer = this.getComponentCatalogueUsecase.invoke({
        categories: this.configurationTabs.mainTabs.map((x) => x.category),
        noCategories: this.configurationTabs.exclusionTags,
      });
      if (observer) {
        this.status = 'Loaded';
        observer.subscribe((dataService) => {
          if (dataService !== null) {
            this.masterArray = dataService;
            this.filter = this.configurationTabs.mainTabs.map((x) => x.category).shift();
          }
        });
      } else {
        this.status = 'Not Allowed';
      }
    }
  }
  navigateToUploadComponent(){
    this.router.navigateByUrl('component-catalogue/upload-component');
  }
  onChangeCurrentPage() {
    this.currentPage = 0;
    const buttonsPaginator: any = document.querySelectorAll(
      '.component-paginator .bc-paginator .bc-paginator-list .bc-paginator-center button'
    );
    if (buttonsPaginator.length > ZERO) {
      buttonsPaginator[ZERO].click();
    }
  }
}
