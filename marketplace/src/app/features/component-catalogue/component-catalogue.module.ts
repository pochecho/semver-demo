import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Identifier } from 'src/app/core/commons/decorators/identifier';
import { ComponentCatalogueRoutingModule } from './component-catalogue-routing.module';
import { ComponentGateway } from './domain/models/component/gateway/component.gateway';
import { ImplementationGateway } from './domain/models/implementation/gateway/implementation.gateway';
import { GetComponentByIdUsecase } from './domain/usecases/get-component-by-id/get-component-by-id.usecase';
import { GetComponentImplementationByVersionUsecase } from './domain/usecases/get-component-implementation-by-version/get-component-implementation-by-version.usecase';
import { GetComponentsUsecase } from './domain/usecases/get-components/get-components.usecase';
import { GetVersionsComponentsUsecase } from './domain/usecases/get-versions-components/get-versions-components.usecase';
import { UploadComponentUseCase } from './domain/usecases/upload-component/upload-component.usecase';
import { UploadImageUseCase } from './domain/usecases/upload-image/upload-image.usecase';
import { ComponentService } from './infrastructure/driven-adapter/components/components.service';
import { ImplementationService } from './infrastructure/driven-adapter/implementation/implementation.service';
import { DesignInformationComponent } from './ui/components/design-information-component/design-information.component';
import { PagesModule } from './ui/pages/pages.module';


@NgModule({
  declarations: [

  ],
  imports: [CommonModule, ComponentCatalogueRoutingModule, PagesModule, HttpClientModule],
  
  exports: [],
  providers: [
    GetComponentsUsecase,
    GetComponentByIdUsecase,
    GetVersionsComponentsUsecase,
    GetComponentImplementationByVersionUsecase,
    UploadComponentUseCase,
    UploadImageUseCase,
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
export class ComponentCatalogueModule {
  static route = 'component-catalogue';
  static identifier = 'component-catalogue|get-components|ui'

}
