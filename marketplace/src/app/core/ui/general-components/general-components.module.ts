import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { BcAccordionModule } from '@bancolombia/design-system-web/bc-accordion';
// import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';
// import { BcInputSelectModule } from '@bancolombia/design-system-web/bc-input-select';
// import { BcTableModule } from '@bancolombia/design-system-web/bc-table';
// import { BcTabsModule } from '@bancolombia/design-system-web/bc-tabs-group';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { CommunityBannerComponent } from './community-banner/community-banner.component';

import { LostContentComponent } from './lost-content/lost-content.component';
import { PromotionalBannerComponent } from './promotional-banner/promotional-banner.component';

import { TechnologiesBulletComponent } from './technologies-bullet/technologies-bullet.component';

// import { BcInputFileModule } from '@bancolombia/design-system-web/bc-input-file';
// import { BcButtonModule } from '@bancolombia/design-system-web/bc-button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DirectivesModule } from '../directives/directives.module';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';

export const GENERAL_COMPONENTS = [
  ComingSoonComponent,
  CommunityBannerComponent,
  LostContentComponent,
  PromotionalBannerComponent,
  TechnologiesBulletComponent,
  NotAllowedComponent,
];
@NgModule({
  declarations: [...GENERAL_COMPONENTS],
  exports: [...GENERAL_COMPONENTS],
  imports: [
    CommonModule,
    DirectivesModule,
    ReactiveFormsModule,
    // BcAccordionModule,
    // BcTabsModule,
    // BcButtonModule,
    // BcInputSelectModule,
    // BcTableModule,
    // BcIconModule,
    // BcInputFileModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GeneralComponentsModule {}
