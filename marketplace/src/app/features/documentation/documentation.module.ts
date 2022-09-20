import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BcButtonModule } from '@bancolombia/design-system-web/bc-button';
// import { BcInputFileModule } from '@bancolombia/design-system-web/bc-input-file';
import { QuillModule } from 'ngx-quill';
import { GeneralComponentsModule } from 'src/app/core/ui/general-components/general-components.module';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { PagesModule } from './ui/pages/pages.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GeneralComponentsModule,
    // BcInputFileModule,
    DocumentationRoutingModule,
    FormsModule,
    // BcButtonModule,
    ReactiveFormsModule,
    PagesModule,
  ],
  exports: [],
})
export class DocumentationModule {
  static route = 'documentation';
}
