import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BACKEND_TABS, COMPONENT_TABS, WIDGET_TABS } from '../catalogue-constants';
import { IUploadComponentModel } from '../../../domain/models/component/upload-component.model';
import { Router } from '@angular/router';
import { UploadImageUseCase } from '../../../domain/usecases/upload-image/upload-image.usecase';

import { UploadComponentUseCase } from '../../../domain/usecases/upload-component/upload-component.usecase';

@Component({
  selector: 'app-upload-component',
  templateUrl: './upload-component.component.html',
  styleUrls: ['./upload-component.component.css'],
})
export class UploadComponentComponent {
  status;
  formatType = 'simple';
  componentTags;
  deviceTags;
  infoComponent = {} as IUploadComponentModel;

  values = [
    {
      label: 'Widget',
      value: 'Widget',
      icon: 'directions',
    },
    {
      label: 'Componente Front',
      value: 'Componente Front',
      icon: 'assistence',
    },
    {
      label: 'Componente Back',
      value: 'Componente Back',
      icon: 'cube-3d',
    },
  ];
  componentForm;
  currentTag: string[];
  currentTech: string[];

  constructor(
    fb: FormBuilder,
    private router: Router,
    private usecaseImage: UploadImageUseCase,
    private usecaseComponent: UploadComponentUseCase
  ) {
    this.componentForm = fb.group({
      category: '',
      component: '',
      name: '',
      description: '',
      image: '',
      brand: '',
      status: '',
    });
    this.currentTech = [];
    this.currentTag = [];
    this.infoComponent.tags = [];
    this.infoComponent.images = { preview: '' };
  }

  showSelectedValueTags(tag: string[]) {
    this.currentTag = tag;
  }

  showSelectedValueTechTags(tag: string[]) {
    this.currentTech = tag;
  }

  showSelectedValueCategory(value) {
    switch (value) {
      case 'Widget': {
        this.componentTags = this.mapTag(WIDGET_TABS.mainTabs);
        this.deviceTags = null;
        this.currentTech = [];
        break;
      }
      case 'Componente Front': {
        this.componentTags = this.mapTag(COMPONENT_TABS.mainTabs);
        this.deviceTags = this.mapTag(WIDGET_TABS.mainTabs);
        break;
      }
      case 'Componente Back': {
        this.componentTags = this.mapTag(BACKEND_TABS.mainTabs);
        this.deviceTags = null;
        this.currentTech = [];
        break;
      }
      default: {
        this.componentTags = [{ label: 'categoría no válida', value: 'categoría no válida' }];
        this.deviceTags = null;
        break;
      }
    }
  }

  mapTag(mainTags) {
    return mainTags.map((tag) => {
      return {
        label: tag.tag,
        value: tag.category,
      };
    });
  }
  getImage(valor) {
    this.componentForm.get('image').patchValue(valor[0]);
  }

  onSubmit() {
    this.infoComponent.nameComponent = this.componentForm.get('name').value;
    this.infoComponent.description = this.componentForm.get('description').value;
    this.infoComponent.brand = this.componentForm.get('brand').value;
    this.infoComponent.status = this.componentForm.get('status').value;
    this.infoComponent.images = this.componentForm.get('image').value;
    this.infoComponent.tags = [...this.currentTech, ...this.currentTag];
    const name = `components/${
      this.infoComponent.nameComponent
    }/images/${this.infoComponent.nameComponent.toLowerCase()}-preview.jpg`;
    this.usecaseImage.invoke({ file: this.infoComponent.images, name }).subscribe((location) => {
      this.infoComponent.images = { preview: location };
      this.usecaseComponent.invoke(this.infoComponent).subscribe(() => {
        this.router.navigateByUrl('/component-catalogue/upload-component-success');
      });
    });
  }
}
