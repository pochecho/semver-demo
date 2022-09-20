import { Component, Input, OnInit } from '@angular/core';
// import { BcAlertComponent } from '@bancolombia/design-system-web/bc-alert';
// import { BcDialogService } from '@bancolombia/design-system-web/bc-services';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';
import { isPossibleToPerform } from 'src/app/core/commons/helpers/permission/permission.helpers';
import { UpdateComponentUseCase } from 'src/app/features/component-catalogue/domain/usecases/update-component/update-component.usecase';
import { CATEGORIZED_PROPERTIES } from './design-implementation.constants';

@Component({
  selector: 'app-design-information',
  templateUrl: './design-information.component.html',
  styleUrls: ['./design-information.component.scss'],
})
export class DesignInformationComponent implements OnInit {
  @Input() data: any;
  properties: any;
  enableToSave: boolean;
  currentData: string;

  constructor(private updateComponentUseCase: UpdateComponentUseCase, 
    // private dialogService: BcDialogService
    ) {
    this.properties = {};
  }
  ngOnInit(): void {
    let doc = '';
    let info: any;
    if (this.data && this.data.infoType) {
      const validProperties = CATEGORIZED_PROPERTIES[this.data.infoType];

      const hasPermission = this.hasPermission('component-catalogue|register-component|ui');
      if (this.data.documentation === undefined && hasPermission) {
        this.data.documentation = {};

        for (const property in validProperties) {
          info = {
            documentation: doc,
            title: validProperties[property],
          };
          this.properties[property] = info;
          this.data.documentation[property] = doc;
        }
      }
      for (const property in validProperties) {
        if (!this.properties.hasOwnProperty(property) ) {
          if (this.data.documentation[property]) {
            doc = this.data.documentation[property];
            this.properties[property] = {
              documentation: doc,
              title: validProperties[property],
            };
          } else {
            doc = '';
            if(hasPermission){
              this.properties[property] = {
                documentation: doc,
                title: validProperties[property],
              };
            }
          }
          
        }
      }
    }
  }
  hasPermission(identifier) {
    const isAllowed = isPossibleToPerform(identifier, USER_PERMISSIONS_DATA['flat-permissions']);
    return isAllowed;
  }
  scrollToElement($element): void {
    document.querySelector($element).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  dataIsPresent() {
    return Object.entries(this.properties).length !== 0;
  }
  changedData(data: any) {
    this.currentData = data;
  }
  saveData(responseEvent: any, currentProperties: any) {
    this.data.documentation[currentProperties.key] = this.currentData;
    const $response = this.updateComponentUseCase.invoke(this.data);
    if ($response) {
      $response.subscribe();
    } else {
      // this.dialogService.open(BcAlertComponent, {
      //   id: 'not-allowed',
      //   type: 'error',
      //   text: 'No tienes permisos para modificar la información del componente.',
      // });
    }
  }
}
