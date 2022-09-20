import { TestBed, waitForAsync } from '@angular/core/testing';
import { GetVersionsComponentsUsecase } from './get-versions-components.usecase';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentGateway } from '../../models/component/gateway/component.gateway';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenService } from '../../../../../core/infraestructure/driven-adapter/token.service';
import { ImplementationGateway } from '../../models/implementation/gateway/implementation.gateway';
import { Observable, of } from 'rxjs';
import { IComponentModel } from '../../models/component/component.model';
import { IImplementationModel } from '../../models/implementation/implementation.model';
import { IUploadComponentModel } from '../../models/component/upload-component.model';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';

class ImplementationMock extends ImplementationGateway {
    uploadImplementationComponent(impl: IImplementationModel): Observable<any> {
        throw new Error('Method not implemented.');
    }
    getVersionsComponent(id: string): Observable<{ [index: string]: string[] }> {
        return of({ ['1.2.3']: ['Angular', 'Flutter'] });
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

class ComponentMock extends ComponentGateway {
    updateComponent(componentModel: IComponentModel): Observable<IComponentModel> {
        return of(componentModel);
    }
    uploadComponent(component: IUploadComponentModel): Observable<IUploadComponentModel> {
        throw new Error('Method not implemented.');
    }
    uploadImage(file: File, name: string): Observable<string> {
        const responseImageRoute = 'route/of/image';
        return of(responseImageRoute);
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
describe('UploadImageUseCase', () => {
    let updateComponentUseCase: GetVersionsComponentsUsecase;
    beforeAll(() => {
        USER_PERMISSIONS_DATA['flat-permissions'] = ['component-catalogue|get-versions-components|ui'];
    });
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule],
            providers: [
                GetVersionsComponentsUsecase,
                TokenService,
                {
                    provide: ComponentGateway,
                    useClass: ComponentMock,
                },
                {
                    provide: ImplementationGateway,
                    useClass: ImplementationMock,
                },
            ],
        }).compileComponents();

        updateComponentUseCase = TestBed.inject(GetVersionsComponentsUsecase);
    }));

    beforeEach(() => { });

    it('should create the usecase', () => {
        expect(updateComponentUseCase).toBeTruthy();
    });

    it('should update a fake component', (done) => {
        let fakeImplementation = {
            technology: 'angular',
        } as IImplementationModel;
        let params = {
            implementations: { ...fakeImplementation },
            image: 'exampleImage',
            id: 'carlosEdge',
            nameComponent: 'fakeComponent',
            tags: ['bds', 'widgets'],
            status: 'enable',
        };

        const $data = updateComponentUseCase.invoke('someComponentId');
        $data.subscribe((data) => {
            let version = '1.2.3';
            let expectedTechnologies = ['Angular','Flutter'];
            expect(data[version]).toEqual(expectedTechnologies);
            done();
        });
    });
});
