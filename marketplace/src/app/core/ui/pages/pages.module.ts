import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { BcInputModule } from '@bancolombia/design-system-web/bc-input';

const COMPONENTS = [];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [ReactiveFormsModule, CommonModule],
})
export class PagesModule {}
