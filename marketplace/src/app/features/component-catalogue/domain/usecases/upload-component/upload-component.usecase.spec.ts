import { TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentGateway } from '../../models/component/gateway/component.gateway';
import { ImplementationGateway } from '../../models/implementation/gateway/implementation.gateway';
import { Observable, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IComponentModel } from '../../models/component/component.model';
import { IImplementationModel } from '../../models/implementation/implementation.model';
import { IUploadComponentModel } from '../../models/component/upload-component.model';
import { UploadComponentUseCase } from './upload-component.usecase';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenService } from 'src/app/core/infraestructure/driven-adapter/token.service';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';
class ImplementationMock extends ImplementationGateway {
    uploadImplementationComponent(impl: IImplementationModel): Observable<any> {
        let response = 'success-trx'
        return of(response);
    }
    getVersionsComponent(id: string): Observable<{ [index: string]: string[]; }> {
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

class ComponentMock extends ComponentGateway {
    updateComponent(component: IComponentModel): Observable<IComponentModel> {

        throw new Error('Method not implemented.');
    }
    uploadComponent(uploadCompEntry: IUploadComponentModel): Observable<IUploadComponentModel> {


        return of(uploadCompEntry);
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
    let useCase: UploadComponentUseCase;
    beforeAll(() => {
        USER_PERMISSIONS_DATA['flat-permissions'] = ['component-catalogue|register-component|ui'];
    });
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule],
            providers: [
                UploadComponentUseCase,
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
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        useCase = TestBed.inject(UploadComponentUseCase);


    }));

    beforeEach(() => { });

    it('should create the usecase', () => {
        expect(useCase).toBeTruthy();
    });

    it('should update a Component', (done) => {
        let expectedResponse = 'testNameComponent';
        let params =
            {
                nameComponent: 'testNameComponent',
                description: 'a little description',
                images: '404',
                tags: ['bds', 'widgets'],
                brand: 'bancolombia',
                status: 'succcess'
            } as IUploadComponentModel

        const $data = useCase.invoke(params);
        $data.subscribe((data) => {
            expect(data.nameComponent).toBe(expectedResponse)
            done();
        })
    })
});
