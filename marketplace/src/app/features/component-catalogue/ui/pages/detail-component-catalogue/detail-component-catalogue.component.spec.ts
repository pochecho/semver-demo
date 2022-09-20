import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BcAccordionModule } from '@bancolombia/design-system-web/bc-accordion';
import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';
import { BcInputSelectModule } from '@bancolombia/design-system-web/bc-input-select';
import { BcDialogService } from '@bancolombia/design-system-web/bc-services';
import { BcTableModule } from '@bancolombia/design-system-web/bc-table';
import { BcTabsModule } from '@bancolombia/design-system-web/bc-tabs-group';
import { Observable, of } from 'rxjs';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';
import { CoreModule } from 'src/app/core/core.module';
import { GeneralComponentsModule } from 'src/app/core/ui/general-components/general-components.module';
import { TokenService } from '../../../../../core/infraestructure/driven-adapter/token.service';
import { LostContentComponent } from '../../../../../core/ui/general-components/lost-content/lost-content.component';
import { IComponentModel } from '../../../domain/models/component/component.model';
import { ComponentGateway } from '../../../domain/models/component/gateway/component.gateway';
import { IUploadComponentModel } from '../../../domain/models/component/upload-component.model';
import { ImplementationGateway } from '../../../domain/models/implementation/gateway/implementation.gateway';
import { IImplementationModel } from '../../../domain/models/implementation/implementation.model';
import { GetComponentByIdUsecase } from '../../../domain/usecases/get-component-by-id/get-component-by-id.usecase';
import { UpdateComponentUseCase } from '../../../domain/usecases/update-component/update-component.usecase';
import { ComponentsModule } from '../../components/components.module';
import { DesignInformationComponent } from '../../components/design-information-component/design-information.component';
import { WidgetFlowComponent } from '../../components/widget-flow/widget-flow.component';
import { DetailComponentCatalogueComponent } from './detail-component-catalogue.component';

class ComponentMock extends ComponentGateway {
  updateComponent(component: IComponentModel): Observable<IComponentModel> {
    throw new Error('Method not implemented.');
  }
  uploadComponent(component: IUploadComponentModel): Observable<IUploadComponentModel> {
    throw new Error('Method not implemented.');
  }
  uploadImage(file: File, name: string): Observable<string> {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<IComponentModel[]> {
    throw new Error('Method not implemented.');
  }
  getComponentById(id: string): Observable<IComponentModel> {
    const response: IComponentModel = {
      id: 'id',
      nameComponent: 'nameComponent',
      implementations: null,
      image: [],
      status: '',
      tags: [],
    };
    return of(response);
  }
}

class ImplementationMock extends ImplementationGateway {
  uploadImplementationComponent(impl: IImplementationModel): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getVersionsComponent(id: string): Observable<{ [index: string]: string[] }> {
    throw new Error('Method not implemented.');
  }
  getByTechnologyVersionAndId(params: any): Observable<IImplementationModel> {
    throw new Error('Method not implemented.');
  }
  getLatestTechnologyByIdComponent(idComponent: string): Observable<IImplementationModel[]> {
    const response: IImplementationModel[] = [
      {
        technology: 'flutter',
        components: null,
      },
      {
        technology: 'angular',
        components: null,
      },
    ];
    return of(response);
  }
}

describe('DetailComponentCatalogueComponent', () => {
  let component: DetailComponentCatalogueComponent;
  let fixture: ComponentFixture<DetailComponentCatalogueComponent>;

  let router: ActivatedRoute;

  beforeAll(() => {
    USER_PERMISSIONS_DATA['flat-permissions'] = ['component-catalogue|get-component-by-id|ui'];
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        BcTabsModule,
        BcIconModule.forRoot(),
        HttpClientTestingModule,
        GeneralComponentsModule,
        BcInputSelectModule,
        BcAccordionModule,
        BcTableModule,
        ComponentsModule,
        CoreModule,
      ],
      declarations: [DetailComponentCatalogueComponent],
      providers: [
        GetComponentByIdUsecase,
        UpdateComponentUseCase,
        TokenService,
        BcDialogService,
        {
          provide: ComponentGateway,
          useClass: ComponentMock,
        },
        {
          provide: ImplementationGateway,
          useClass: ImplementationMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: {
              subscribe: (fn: (value: Data) => void) =>
                fn({
                  company: 'company',
                }),
            },
            params: {
              subscribe: (fn: (value: Params) => void) =>
                fn({
                  id: 'componentId',
                  category: 'widgets',
                }),
            },
            snapshot: {
              url: [
                {
                  path: 'foo',
                },
                {
                  path: 'bar',
                },
                {
                  path: 'baz',
                },
              ],
            },
          },
        },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [WidgetFlowComponent, LostContentComponent, DesignInformationComponent],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponentCatalogueComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(ActivatedRoute);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create and init', (done) => {
    expect(component).toBeTruthy();
    done();
  });

  it('should set Value with expected value', () => {
    const value: any = '2.0.1';
    component.setValue(value);
    expect(component.selector.value).toEqual([value]);
  });

  it('should set selectedTechnologyId with expected value ', () => {
    const value: any = '1';
    component.setSelectedTechnologyId(value);
    expect(component.selectedTechnology).toEqual(value);
  });

  it('should render section', () => {
    spyOn(component, 'renderSection').and.callThrough();

    const configuration = {
      features: {
        Uso: {
          components: [
            {
              id: 'use-section',
              component: DesignInformationComponent,
              data: {
                infoType: 'usability',
              },
            },
          ],
        },
      },
    };
    component.configuration = configuration;
    component.renderSection('Uso');
    const childComponent = fixture.nativeElement.querySelector('app-design-information');

    expect(childComponent).not.toBeNull();
    expect(component.renderSection).toHaveBeenCalled();
  });

  it('should render default component', () => {
    spyOn(component, 'renderSection').and.callThrough();
    const configuration = {
      features: {
        Uso: {},
      },
    };
    component.configuration = configuration;

    component.renderSection('Uso');

    const childComponent = fixture.nativeElement.querySelector('app-lost-content');

    expect(childComponent).not.toBeNull();

    expect(component.renderSection).toHaveBeenCalled();
  });
});
