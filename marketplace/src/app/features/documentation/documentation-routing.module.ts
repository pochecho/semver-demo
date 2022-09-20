import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { How2installComponent } from './ui/pages/how2install/how2install.component';

const routes: Routes = [
  {
    path: '',
    component: How2installComponent,
  },
  {
    path: How2installComponent.route,
    component: How2installComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationRoutingModule {}
