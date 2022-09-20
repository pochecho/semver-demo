import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';
import { BcInputModule } from '@bancolombia/design-system-web/bc-input';
import { BcPaginatorModule } from '@bancolombia/design-system-web/bc-paginator';
import { BcPreloaderModule } from '@bancolombia/design-system-web/bc-preloader';
import { Observable, of } from 'rxjs';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';
import { CoreModule } from 'src/app/core/core.module';
import { TokenService } from 'src/app/core/infraestructure/driven-adapter/token.service';
import { IComponentModel } from '../../../domain/models/component/component.model';
import { ComponentGateway } from '../../../domain/models/component/gateway/component.gateway';
import { IUploadComponentModel } from '../../../domain/models/component/upload-component.model';
import { GetComponentsUsecase } from '../../../domain/usecases/get-components/get-components.usecase';
import { ListComponentCatalogueComponent } from './list-component-catalogue.component';
describe('ListComponentCatalogueComponent', () => {
  let component: ListComponentCatalogueComponent;
  let fixture: ComponentFixture<ListComponentCatalogueComponent>;
  let getComponentsUsecase: GetComponentsUsecase;
  let router: Router;
  const GENERIC_RESPONSE = {
    code: '200',
    data: [
      {
        implementations: [
          {
            components: [
              {
                extends: 'BcDialog',
                methodsClass: [
                  {
                    name: 'cancelIt',
                    args: [],
                    description: '<p>Cancelar alerta</p>\n',
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    name: 'closeByTimeout',
                    args: [],
                    description: '<p>Cerrar alerta según timeout</p>\n',
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    name: 'closeIt',
                    args: [],
                    description: '<p>Cerrar alerta</p>\n',
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    name: 'onInjectInputs',
                    args: [
                      {
                        name: 'inputs',
                        type: 'any',
                      },
                    ],
                    description: '<p>Atributos de la alerta</p>\n',
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    name: 'setIconByType',
                    args: [],
                    description: '<p>Validar icono según tipo de alerta</p>\n',
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    name: 'close',
                    args: [
                      {
                        name: 'output',
                        type: 'any',
                        optional: true,
                      },
                    ],
                    inheritance: {
                      file: 'BcDialog',
                    },
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    name: 'dismiss',
                    args: [
                      {
                        name: 'output',
                        type: 'any',
                        optional: true,
                      },
                    ],
                    inheritance: {
                      file: 'BcDialog',
                    },
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    args: [
                      {
                        name: 'inputs',
                        type: 'any',
                      },
                    ],
                    modifierKind: [117],
                    name: 'onInjectInputs',
                    inheritance: {
                      file: 'BcDialog',
                    },
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                ],
                outputsClass: [
                  {
                    name: 'onclose',
                    description: '<p>Se ejecuta cuando la alerta se cierra, aplica solo para alertas inline.</p>\n',
                    type: 'EventEmitter<any>',
                    defaultValue: 'new EventEmitter()',
                  },
                ],
                rawdescription:
                  'Importa las alertas con los diseños de Bancolombia S.A.\nLas alertas corresponde a un cuadro de diálogo que disponibiliza\ninformación de manera flotante o fija.',
                inputsClass: [
                  {
                    name: 'dismissible',
                    description: '<p>Si la alerta es estática, indica si se puede descartar o cerrar.</p>\n',
                    type: 'boolean',
                    defaultValue: 'false',
                  },
                  {
                    name: 'id',
                    description: '<p>Id del componente.</p>\n',
                    type: 'string',
                    defaultValue: 'this.helper.getId(this)',
                  },
                  {
                    name: 'inline',
                    description:
                      '<p>Indica si la alerta es estática o inline.\nSi la alert es estática significa que aparecerá como un cuadro de \ndiálogo (popup) en la parte superior de la ventana; por el contrario si no\nlo es, aparecerá insertada en el documento.</p>\n',
                    type: 'boolean',
                    defaultValue: 'false',
                  },
                  {
                    name: 'links',
                    description: '<p>Links en la alerta, solo se pintan los 2 primeros items del arreglo.</p>\n',
                    type: 'Array<LinkAlert>',
                    defaultValue: '[]',
                  },
                  {
                    name: 'text',
                    description: '<p>Texto de la alerta.</p>\n',
                    defaultValue: "''",
                  },
                  {
                    name: 'title',
                    description: '<p>Título de la alerta.</p>\n',
                    defaultValue: "''",
                  },
                  {
                    name: 'type',
                    description:
                      '<p>Tipo de alerta [ &quot;error&quot; | &quot;success&quot; | &quot;info&quot; | &quot;warning&quot; | &quot;inactive&quot; ].</p>\n',
                    type: 'string',
                    defaultValue: "'inactive'",
                  },
                ],
                name: 'BcAlertComponent',
                description:
                  '<p>Importa las alertas con los diseños de Bancolombia S.A.\nLas alertas corresponde a un cuadro de diálogo que disponibiliza\ninformación de manera flotante o fija.</p>\n',
                selector: 'bc-alert',
                type: 'component',
              },
            ],
            technology: 'angular',
            examples: [
              {
                description: 'Alerta de Éxito y cierre automático a los 10 segundos',
                code: {
                  visual: {
                    data: 'No aplica',
                    language: 'html',
                  },
                  script: {
                    data: "\n        import { BcDialogService } from '@bancolombia/design-system-web/bc-services/bc-dialog-service/bc-dialog-service.service';\n\n        constructor(private dialogService: BcDialogService) {}\n\n        open(): void {\n          const dialogRef = this.dialogService.open(BcAlertsComponent, {\n            id: 'MyAlertId',\n            type: 'success',\n            text: 'Esta es una alerta de confirmación.',\n            timeout: 10000,\n          });\n\n          dialogRef.onResult().subscribe(\n            (closed) => {},\n            (dismissed) => {},\n            () => {}\n          );\n        }",
                    language: 'ts',
                  },
                },
              },
              {
                description: 'Alerta de Error con elemento de referencia',
                code: {
                  visual: {
                    data: 'No aplica',
                    language: 'html',
                  },
                  script: {
                    data: "\n        import { BcDialogService } from '@bancolombia/design-system-web/bc-services/bc-dialog-service/bc-dialog-service.service';\n\n        constructor(private dialogService: BcDialogService) {}\n\n        open(): void {\n          const dialogRef = this.dialogService.open(BcAlertsComponent, {\n            id: 'MyAlertId',\n            type: 'error',\n            text: 'Esta es una alerta de error.',\n            elementRef: 'IdElementRef',\n          });\n\n          dialogRef.onResult().subscribe(\n            (closed) => {},\n            (dismissed) => {},\n            () => {}\n          );\n        }",
                    language: 'ts',
                  },
                },
              },
              {
                description: 'Alerta de Error insertada antes del elemento de referencia',
                code: {
                  visual: {
                    data: 'No aplica',
                    language: 'html',
                  },
                  script: {
                    data: "\n        import { BcDialogService } from '@bancolombia/design-system-web/bc-services/bc-dialog-service/bc-dialog-service.service';\n\n        constructor(private dialogService: BcDialogService) {}\n\n        open(): void {\n          const dialogRef = this.dialogService.open(BcAlertsComponent, {\n            id: 'MyAlertId',\n            type: 'error',\n            text: 'Esta es una alerta de error.',\n            elementRef: 'IdElementRef',\n            insertBefore: true\n          });\n\n          dialogRef.onResult().subscribe(\n            (closed) => {},\n            (dismissed) => {},\n            () => {}\n          );\n        }",
                    language: 'ts',
                  },
                },
              },
            ],
            directives: [],
            version: '2.0.27',
          },
        ],
        nameComponent: 'Alert',
        status: '',
        image: {
          preview:
            'https://nu0065001-galatea-dev-catalog-bucket.s3.amazonaws.com/components/Alert/images/alert-preview.jpg',
        },
        id: '5c513aee-14a2-4eca-976a-3da4e873e601',
        tags: ['Mobile', 'Web', 'Molécula'],
      },
      {
        implementations: [
          {
            components: [
              {
                extends: 'BcDialog',
                methodsClass: [
                  {
                    name: 'cancelIt',
                    args: [],
                    description: '<p>Cancelar alerta</p>\n',
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    name: 'closeByTimeout',
                    args: [],
                    description: '<p>Cerrar alerta según timeout</p>\n',
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    name: 'closeIt',
                    args: [],
                    description: '<p>Cerrar alerta</p>\n',
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    name: 'onInjectInputs',
                    args: [
                      {
                        name: 'inputs',
                        type: 'any',
                      },
                    ],
                    description: '<p>Atributos de la alerta</p>\n',
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    name: 'setIconByType',
                    args: [],
                    description: '<p>Validar icono según tipo de alerta</p>\n',
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    name: 'close',
                    args: [
                      {
                        name: 'output',
                        type: 'any',
                        optional: true,
                      },
                    ],
                    inheritance: {
                      file: 'BcDialog',
                    },
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    name: 'dismiss',
                    args: [
                      {
                        name: 'output',
                        type: 'any',
                        optional: true,
                      },
                    ],
                    inheritance: {
                      file: 'BcDialog',
                    },
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                  {
                    args: [
                      {
                        name: 'inputs',
                        type: 'any',
                      },
                    ],
                    modifierKind: [117],
                    name: 'onInjectInputs',
                    inheritance: {
                      file: 'BcDialog',
                    },
                    optional: false,
                    typeParameters: [],
                    returnType: 'void',
                  },
                ],
                outputsClass: [
                  {
                    name: 'onclose',
                    description: '<p>Se ejecuta cuando la alerta se cierra, aplica solo para alertas inline.</p>\n',
                    type: 'EventEmitter<any>',
                    defaultValue: 'new EventEmitter()',
                  },
                ],
                rawdescription:
                  'Importa las alertas con los diseños de Bancolombia S.A.\nLas alertas corresponde a un cuadro de diálogo que disponibiliza\ninformación de manera flotante o fija.',
                inputsClass: [
                  {
                    name: 'dismissible',
                    description: '<p>Si la alerta es estática, indica si se puede descartar o cerrar.</p>\n',
                    type: 'boolean',
                    defaultValue: 'false',
                  },
                  {
                    name: 'id',
                    description: '<p>Id del componente.</p>\n',
                    type: 'string',
                    defaultValue: 'this.helper.getId(this)',
                  },
                  {
                    name: 'inline',
                    description:
                      '<p>Indica si la alerta es estática o inline.\nSi la alert es estática significa que aparecerá como un cuadro de \ndiálogo (popup) en la parte superior de la ventana; por el contrario si no\nlo es, aparecerá insertada en el documento.</p>\n',
                    type: 'boolean',
                    defaultValue: 'false',
                  },
                  {
                    name: 'links',
                    description: '<p>Links en la alerta, solo se pintan los 2 primeros items del arreglo.</p>\n',
                    type: 'Array<LinkAlert>',
                    defaultValue: '[]',
                  },
                  {
                    name: 'text',
                    description: '<p>Texto de la alerta.</p>\n',
                    defaultValue: "''",
                  },
                  {
                    name: 'title',
                    description: '<p>Título de la alerta.</p>\n',
                    defaultValue: "''",
                  },
                  {
                    name: 'type',
                    description:
                      '<p>Tipo de alerta [ &quot;error&quot; | &quot;success&quot; | &quot;info&quot; | &quot;warning&quot; | &quot;inactive&quot; ].</p>\n',
                    type: 'string',
                    defaultValue: "'inactive'",
                  },
                ],
                name: 'BcAlertComponent',
                description:
                  '<p>Importa las alertas con los diseños de Bancolombia S.A.\nLas alertas corresponde a un cuadro de diálogo que disponibiliza\ninformación de manera flotante o fija.</p>\n',
                selector: 'bc-alert',
                type: 'component',
              },
            ],
            technology: 'angular',
            examples: [
              {
                description: 'Alerta de Éxito y cierre automático a los 10 segundos',
                code: {
                  visual: {
                    data: 'No aplica',
                    language: 'html',
                  },
                  script: {
                    data: "\n        import { BcDialogService } from '@bancolombia/design-system-web/bc-services/bc-dialog-service/bc-dialog-service.service';\n\n        constructor(private dialogService: BcDialogService) {}\n\n        open(): void {\n          const dialogRef = this.dialogService.open(BcAlertsComponent, {\n            id: 'MyAlertId',\n            type: 'success',\n            text: 'Esta es una alerta de confirmación.',\n            timeout: 10000,\n          });\n\n          dialogRef.onResult().subscribe(\n            (closed) => {},\n            (dismissed) => {},\n            () => {}\n          );\n        }",
                    language: 'ts',
                  },
                },
              },
              {
                description: 'Alerta de Error con elemento de referencia',
                code: {
                  visual: {
                    data: 'No aplica',
                    language: 'html',
                  },
                  script: {
                    data: "\n        import { BcDialogService } from '@bancolombia/design-system-web/bc-services/bc-dialog-service/bc-dialog-service.service';\n\n        constructor(private dialogService: BcDialogService) {}\n\n        open(): void {\n          const dialogRef = this.dialogService.open(BcAlertsComponent, {\n            id: 'MyAlertId',\n            type: 'error',\n            text: 'Esta es una alerta de error.',\n            elementRef: 'IdElementRef',\n          });\n\n          dialogRef.onResult().subscribe(\n            (closed) => {},\n            (dismissed) => {},\n            () => {}\n          );\n        }",
                    language: 'ts',
                  },
                },
              },
              {
                description: 'Alerta de Error insertada antes del elemento de referencia',
                code: {
                  visual: {
                    data: 'No aplica',
                    language: 'html',
                  },
                  script: {
                    data: "\n        import { BcDialogService } from '@bancolombia/design-system-web/bc-services/bc-dialog-service/bc-dialog-service.service';\n\n        constructor(private dialogService: BcDialogService) {}\n\n        open(): void {\n          const dialogRef = this.dialogService.open(BcAlertsComponent, {\n            id: 'MyAlertId',\n            type: 'error',\n            text: 'Esta es una alerta de error.',\n            elementRef: 'IdElementRef',\n            insertBefore: true\n          });\n\n          dialogRef.onResult().subscribe(\n            (closed) => {},\n            (dismissed) => {},\n            () => {}\n          );\n        }",
                    language: 'ts',
                  },
                },
              },
            ],
            directives: [],
            version: '2.0.27',
          },
        ],
        nameComponent: 'Table',
        status: '',
        image: {
          preview:
            'https://nu0065001-galatea-dev-catalog-bucket.s3.amazonaws.com/components/Alert/images/alert-preview.jpg',
        },
        id: '5c513aee-14a2-4eca-976a-3da4e873e601',
        tags: ['Mobile', 'Web', 'Molécula'],
      },
    ],
  };

  class ComponentServiceMock extends ComponentGateway {
    getAll(): Observable<IComponentModel[]> {
      return of([
        {
          id: 'id',
          nameComponent: 'nameComponent',
          implementations: null,
          image: [],
          status: '',
          tags: [],
        },
      ]);
    }
    updateComponent(component: IComponentModel): Observable<IComponentModel> {
      throw new Error('Method not implemented.');
    }
    uploadComponent(component: IUploadComponentModel): Observable<IUploadComponentModel> {
      throw new Error('Method not implemented.');
    }
    uploadImage(file: File, name: string): Observable<string> {
      throw new Error('Method not implemented.');
    }
    getComponentById(id: string): Observable<IComponentModel> {
      throw new Error('Method not implemented.');
    }
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponentCatalogueComponent],
      imports: [
        BcInputModule,
        BcPaginatorModule,
        BcIconModule.forRoot({ path: '' }),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BcPreloaderModule,
        RouterModule.forRoot([]),
        CoreModule,
      ],
      providers: [
        GetComponentsUsecase,
        ComponentGateway,
        {
          provide: ComponentGateway,
          useClass: ComponentServiceMock,
        },
        TokenService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              category: 'widgets',
            }),
          },
        },
      ],
    }).compileComponents();
    getComponentsUsecase = TestBed.inject(GetComponentsUsecase);
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponentCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    USER_PERMISSIONS_DATA['flat-permissions'] = ['component-catalogue|get-components|ui'];
  });

  it('Should valid get all components', () => {
    spyOn(getComponentsUsecase, 'invoke');
    spyOn(component, 'getData').and.callThrough();
    spyOn(component, 'getAllItemsByFilter').and.callThrough();
    component.ngOnInit();
    expect(getComponentsUsecase.invoke).toHaveBeenCalled();
    expect(component.getData).toHaveBeenCalled();
  });

  xit('should execute goToItems function', () => {
    spyOn(router, 'navigate').and.callFake(() => {
      return new Promise((resolve) => {
        resolve(true);
      });
    });
    spyOn(component, 'goToItems').and.callThrough();
    component.goToItems('id', 'filtro');
    expect(component.goToItems).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should execute onChangeCurrentPage function', () => {
    spyOn(component, 'onChangeCurrentPage').and.callThrough();
    component.onChangeCurrentPage();
    expect(component.onChangeCurrentPage).toHaveBeenCalled();
  });
});
