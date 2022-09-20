import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { How2installComponent } from './how2install/how2install.component';

const COMPONENTS = [How2installComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule],
})
export class PagesModule {}
