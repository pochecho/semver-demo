import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { BcAccordionModule } from '@bancolombia/design-system-web/bc-accordion';
// import { BcButtonModule } from '@bancolombia/design-system-web/bc-button';
// import { BcCardModule } from '@bancolombia/design-system-web/bc-card';
// import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';
// import { BcInputModule } from '@bancolombia/design-system-web/bc-input';
// import { BcInputFileModule } from '@bancolombia/design-system-web/bc-input-file';
// import { BcInputSelectModule } from '@bancolombia/design-system-web/bc-input-select';
// import { BcPaginatorModule } from '@bancolombia/design-system-web/bc-paginator';
// import { BcPreloaderModule } from '@bancolombia/design-system-web/bc-preloader';
// import { BcTableModule } from '@bancolombia/design-system-web/bc-table';
// import { BcTabsModule } from '@bancolombia/design-system-web/bc-tabs-group';
import { QuillModule } from 'ngx-quill';
import { GeneralComponentsModule } from 'src/app/core/ui/general-components/general-components.module';
import { CoreModule } from '../../../../core/core.module';
import { ComponentGateway } from '../../domain/models/component/gateway/component.gateway';
import { ImplementationGateway } from '../../domain/models/implementation/gateway/implementation.gateway';
import { GetComponentByIdUsecase } from '../../domain/usecases/get-component-by-id/get-component-by-id.usecase';
import { GetComponentImplementationByVersionUsecase } from '../../domain/usecases/get-component-implementation-by-version/get-component-implementation-by-version.usecase';
import { GetComponentsUsecase } from '../../domain/usecases/get-components/get-components.usecase';
import { GetVersionsComponentsUsecase } from '../../domain/usecases/get-versions-components/get-versions-components.usecase';
import { UploadComponentUseCase } from '../../domain/usecases/upload-component/upload-component.usecase';
import { UploadImageUseCase } from '../../domain/usecases/upload-image/upload-image.usecase';
import { UploadImplementationUsecase } from '../../domain/usecases/upload-implementation/upload-implementation.usecase';
import { ComponentService } from '../../infrastructure/driven-adapter/components/components.service';
import { ImplementationService } from '../../infrastructure/driven-adapter/implementation/implementation.service';
import { COMPONENTS, ComponentsModule } from '../components/components.module';
import { GENERAL_COMPONENTS } from '../../../../core/ui/general-components/general-components.module';
// import { ExampleComponentsModule, EXAMPLES_COMPONENTS } from '../example-components/example-components.module';
import { DetailComponentCatalogueComponent } from './detail-component-catalogue/detail-component-catalogue.component';
import { ListComponentCatalogueComponent } from './list-component-catalogue/list-component-catalogue.component';
import { UploadComponentSuccessComponent } from './upload-component-success/upload-component-success.component';
import { UploadComponentComponent } from './upload-component/upload-component.component';

@NgModule({
  declarations: [
    ListComponentCatalogueComponent,
    DetailComponentCatalogueComponent,
    UploadComponentComponent,
    UploadComponentSuccessComponent,
  ],
  entryComponents: [ ...COMPONENTS, ...GENERAL_COMPONENTS],
  exports: [],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // BcTableModule,
    // ExampleComponentsModule,
    GeneralComponentsModule,
    // BcPaginatorModule,
    // BcIconModule,
    // BcInputFileModule,
    // BcInputModule,
    // BcInputSelectModule,
    // BcPreloaderModule,
    // BcAccordionModule,
    // BcTabsModule,
    // BcCardModule,
    QuillModule.forRoot(),
    // BcButtonModule,
  ],
  providers: [
    GetComponentsUsecase,
    GetComponentByIdUsecase,
    GetVersionsComponentsUsecase,
    GetComponentImplementationByVersionUsecase,
    UploadComponentUseCase,
    UploadImageUseCase,
    UploadImplementationUsecase,
    {
      provide: ComponentGateway,
      useClass: ComponentService,
    },
    {
      provide: ImplementationGateway,
      useClass: ImplementationService,
    },
  ],
})
export class PagesModule {}
