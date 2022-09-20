import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { BcAccordionModule } from '@bancolombia/design-system-web/bc-accordion';
// import { BcAlertModule } from '@bancolombia/design-system-web/bc-alert';
// import { BcBreadcrumbModule } from '@bancolombia/design-system-web/bc-breadcrumb';
// import { BcButtonModule } from '@bancolombia/design-system-web/bc-button';
// import { BcCardModule } from '@bancolombia/design-system-web/bc-card';
// import { BcCarouselModule } from '@bancolombia/design-system-web/bc-carousel';
// import { BcHeaderModule } from '@bancolombia/design-system-web/bc-header';
// import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';
// import { BcInputModule } from '@bancolombia/design-system-web/bc-input';
// import { BcInputFileModule } from '@bancolombia/design-system-web/bc-input-file';
// import { BcModalModule } from '@bancolombia/design-system-web/bc-modal';
// import { BcPageHeaderModule } from '@bancolombia/design-system-web/bc-page-header';
// import { BcPaginatorModule } from '@bancolombia/design-system-web/bc-paginator';
// import { BcServicesModule } from '@bancolombia/design-system-web/bc-services';
// import { BcTableModule } from '@bancolombia/design-system-web/bc-table';
// import { BcTabsModule } from '@bancolombia/design-system-web/bc-tabs-group';
import { GeneralComponentsModule } from 'src/app/core/ui/general-components/general-components.module';
import { CoreModule } from '../../../../core/core.module';
import { DesignHomeComponent } from './design-home/design-home.component';
import { DevHomeComponent } from './dev-home/dev-home.component';
import { FigmaDesignComponent } from './figma-design/figma-design.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent, DevHomeComponent, DesignHomeComponent, FigmaDesignComponent],
  imports: [
    CommonModule,
    GeneralComponentsModule,
    CoreModule,
    ReactiveFormsModule,
    // BcModalModule,
    // BcButtonModule,
    // BcAccordionModule,
    // BcInputModule,
    // BcIconModule,
    // BcServicesModule,
    // BcAlertModule,
    // BcTableModule,
    // BcPaginatorModule,
    // BcBreadcrumbModule,
    // BcCardModule,
    FormsModule,
    // BcTabsModule,
    RouterModule,
    // BcHeaderModule,
    // BcInputFileModule,
    // BcCarouselModule,
    // BcPageHeaderModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
