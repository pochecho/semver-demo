import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponentCatalogueComponent } from './ui/pages/list-component-catalogue/list-component-catalogue.component';
import { DetailComponentCatalogueComponent } from './ui/pages/detail-component-catalogue/detail-component-catalogue.component';

import { UploadComponentComponent } from './ui/pages/upload-component/upload-component.component';
import { UploadComponentSuccessComponent } from './ui/pages/upload-component-success/upload-component-success.component';

const routes: Routes = [
  {
    path: 'upload-component',
    component: UploadComponentComponent,
  },
  {
    path: 'upload-component-success',
    component: UploadComponentSuccessComponent,
  },

  {
    path: ':category',
    component: ListComponentCatalogueComponent,
  },
  {
    path: ':category/:id/:filter',
    component: DetailComponentCatalogueComponent,
    children: [].concat(),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentCatalogueRoutingModule {}
