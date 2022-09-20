import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { BcAccordionModule } from '@bancolombia/design-system-web/bc-accordion';
// import { BcBadgeModule } from '@bancolombia/design-system-web/bc-badge';
// import { BcButtonModule } from '@bancolombia/design-system-web/bc-button';
// import { BcTabsModule } from '@bancolombia/design-system-web/bc-tabs-group';
// import { BcCircleLoadingModule } from '@bancolombia/design-system-web/bc-circle-loading';
import { QuillModule } from 'ngx-quill';
import { DirectivesModule } from 'src/app/core/ui/directives/directives.module';

import { GeneralComponentsModule } from '../../../../core/ui/general-components/general-components.module';
import { DomainModule } from '../../domain/domain.module';
import { ApiBackComponent } from './api-back/api-back.component';
import { DemoImplementationComponent } from './demo-implementation-component/demo-implementation.component';
import { DesignInformationComponent } from './design-information-component/design-information.component';
import { DevelopInformationComponent } from './develop-information-component/develop-information.component';
import { DocFillComponent } from './doc-fill/doc-fill.component';
import { EmbedFlutterVisualizatorComponent } from './embed-flutter-visualizator/embed-flutter-visualizator.component';
import { SwaggerReaderComponent } from './swagger-reader/swagger-reader.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';
import { UploadImplementationBackComponent } from './upload-implementation-back/upload-implementation-back.component';
// import { CustomShareInfrastructureService } from './widget-examples/share-voucher/custom-share-infrastructure.service';
// import { ShareVoucherWidgetExample } from './widget-examples/share-voucher/share-voucher.component';
// import { CustomProductsInfrastructureService } from './widget-examples/statements-widget/infrastructure/custom-product-infrastructure.service';
// import { CustomStatementsInfrastructureService } from './widget-examples/statements-widget/infrastructure/custom-statement-infrastructure.service';
// import { StatementsWidgetExample } from './widget-examples/statements-widget/statements-widget.component';
import { WidgetFlowComponent } from './widget-flow/widget-flow.component';

// import { CPCustomProductService } from './widget-examples/credit-payment-widget/infrastructure/custom-product.service';
// import { CPCustomCreditService } from './widget-examples/credit-payment-widget/infrastructure/custom-credit.service';
// import { CreditPaymentWidgetExampleComponent } from './widget-examples/credit-payment-widget/bc-credit-payment-widget.component';
// import { CustomProductDetailInfrastructureService } from './widget-examples/bc-product-detail-widget/services/products/custom-products-infrastructure.service';
// import { CustomMovementsInfrastructureService } from './widget-examples/bc-product-detail-widget/services/movements/custom-movements-infrastructure.service';
// import { ProductDetailWidgetExampleComponent } from './widget-examples/bc-product-detail-widget/bc-product-detail-widget.component';

// import { ConsolidatedBalancesWidgetExampleComponent } from './widget-examples/bc-consolidated-balances-widget/bc-consolidated-balances-widget.component';
// import { CustomProductInfrastructure } from './widget-examples/bc-consolidated-balances-widget/custom-product-infrastructure';
// import { DepositAccountsComponent } from './widget-examples/bc-consolidated-balances-widget/template_examples2/template/deposit-accounts/deposit-accounts.component';
// import { TemplateCreditosComponent } from './widget-examples/bc-consolidated-balances-widget/template_examples/template-creditos/template-creditos.component';

export const COMPONENTS = [
  UploadDocComponent,
  DesignInformationComponent,
  ApiBackComponent,

  DevelopInformationComponent,
  DemoImplementationComponent,
  WidgetFlowComponent,
  DocFillComponent,
  SwaggerReaderComponent,
  EmbedFlutterVisualizatorComponent,
  UploadImplementationBackComponent,
  // ShareVoucherWidgetExample,
  // StatementsWidgetExample,
  // CreditPaymentWidgetExampleComponent,
  // ProductDetailWidgetExampleComponent,
  // DepositAccountsComponent,
  // TemplateCreditosComponent,
  // ConsolidatedBalancesWidgetExampleComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    DirectivesModule,
    DomainModule,
    // BcInputModule,
    // BcInputFileModule,
    // BcInputNumberModule,
    // BcInputTokenModule,
    // BcInputSelectModule,
    // BcIconModule.forRoot(),
    // BcModalModule,
    // BcCircleLoadingModule,
    // BcMenuModule,
    // BcLoaderModule,
    // BcLinkModule,
    // BcListModule,
    // BcSwitchModule,
    // BcPaginatorModule,
    // BcPreloaderModule,
    // BcPlannerModule,
    // BcProgressBarWebModule,
    // BcRadioModule,
    // BcSearchModule,
    // BcShortcutModule,
    // BcSliderModule,
    // BcStepperModule,
    // BcTableModule,
    // BcAccordionModule,
    // BcButtonModule,
    // BcTabsModule,
    FormsModule,
    // BcPreloaderModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    // BcIconModule.forRoot(),
    // BcInputSelectModule,
    GeneralComponentsModule,
    // BcPageHeaderModule,
    // BcBadgeModule,
    // BcSkipLinkModule,
    // BcSidebarModule,
    // BcStatusModule,
    // ShareVoucherModule.forRoot({
    //   infrastructures: [
    //     {
    //       gateway: ShareVoucherGateway,
    //       implementation: CustomShareInfrastructureService,
    //     },
    //   ],
    // }),
    // BcOffCanvasModule,
    // BcCoachMarkModule,
    // BcFileDownloadModule,
    // BcSliderModule,
    // StatementsWidgetModule.forRoot({
    //   infrastructures: [
    //     {
    //       gateway: SWProductGateway,
    //       implementation: CustomProductsInfrastructureService,
    //     },
    //     {
    //       gateway: StatementGateway,
    //       implementation: CustomStatementsInfrastructureService,
    //     },
    //   ],
    // }),
    // ProductDetailWidgetModule.forRoot({
    //   infrastructures: [
    //     {
    //       gateway: ProductsGateway,
    //       implementation: CustomProductDetailInfrastructureService,
    //     },
    //     {
    //       gateway: MovementsGateway,
    //       implementation: CustomMovementsInfrastructureService,
    //     },
    //   ],
    //   labels: {
    //     ProductDetailMainComponent: {
    //       tab1Text: 'Detalle del producto',
    //       tab2Text: 'Movimientos',
    //       titleTable: 'Titulo de la tabla',
    //       sectionTitleButtons: 'Section title button',
    //       titleSection: 'Información del productos',
    //       errorPageTitle: 'Algo ocurrió',
    //       errorPageSubtitle: 'No fue posible cargar la información.',
    //       errorPageButtonText: 'Intentar nuevamente',
    //       tableDropdownViewOptionText: 'Ver detalle',
    //       tableDropdownDownloadOptionText: 'Descargar movimiento',
    //       tableDropdownShareOptionText: 'Enviar comprobante',
    //       tableDownloadButtonText: 'Descargar movimientos',
    //       titleModal: 'Detalle de movimientos',
    //       download: 'Descargar',
    //       sendVoucher: 'Enviar comprobante',
    //       alertDownload: 'La descarga se ha realizado correctamente.',
    //       optionTextSearch1: 'Pruebe diferentes palabras claves',
    //       optionTextSearch2: 'Pruebe con un solo criterio de búsqueda',
    //       optionTextSearchNull: 'No se encontraron movimientos',
    //       notFountMovements: 'Este producto no tiene movimientos registrados.',
    //       balanceText: 'Saldo disponible',
    //     },
    //   },
    //   endpoints: {
    //     Products: {
    //       GET_PRODUCTS_ENDPOINT: 'http://localhost/products',
    //     },
    //     Movements: {
    //       DOWNLOAD_MOVEMENTS_AND_CONSOLIDATED_ENDPOINT: 'http://localhost/movements/download',
    //       GET_ALL_MOVEMENTS_ENDPOINT: 'http://localhost/movements',
    //       GET_MOVEMENT_PREVIEW_ENDPOINT: 'http://localhost/movements/preview',
    //     },
    //   },
    // }),
    // ConsolidatedBalancesModule.forRoot({
    //   infrastructures: [
    //     {
    //       gateway: SCProductGateway,
    //       implementation: CustomProductInfrastructure,
    //     },
    //   ],
    //   labels: {
    //     MainConsolidatedComponent: {
    //       productName: 'Los saldos consolidados.',
    //       messageAlertError: 'Inténtelo nuevamente. Algunos datos no se han podido cargar correctamente.',
    //       labelAllProducts: 'Ver todas las tarjetas',
    //       labelSeeMore: 'Ver más',
    //       labelSeeLess: 'Ver menos',
    //     },
    //     ErrorScreenComponent: {
    //       titleErrorMessage: 'Error desde el showcase new',
    //       descriptionError: 'Nuestro equipo esta trabajando para brindarle una pronta solución',
    //       titleErrorMessageSystem: 'Error del sistema showcase',
    //       descriptionErrorSystem: 'descripcion error del sistema showcase',
    //       defaultIcon: 'il-process-mistake',
    //     },
    //     DetailsConsolidatedComponent: {
    //       titleTable: 'Titulo tabla showcase',
    //       titleSearch: 'Buscador showcase',
    //       titleDetail: 'Detalle producto showcase',
    //       seeDetail: 'Ver detalle',
    //       block: 'Bloquear',
    //       seeStatements: 'Ver extractos',
    //       unlock: 'Desbloquear',
    //     },
    //   },
    //   endpoints: {
    //     ProductService: {
    //       GET_PRODUCTS_TYPE_ENDPOINT: 'http://localhost:6985/types',
    //       GET_PRODUCTS_ENDPOINT: 'http://localhost:6985/products',
    //     },
    //   },
    // }),

    RouterModule,
    // CreditPaymentWidgetModule.forRoot({
    //   infrastructures: [
    //     {
    //       gateway: CPProductGateway,
    //       implementation: CPCustomProductService,
    //     },
    //     {
    //       gateway: CPCreditGateway,
    //       implementation: CPCustomCreditService,
    //     },
    //   ],
    // }),
  ],
})
export class ComponentsModule {}
