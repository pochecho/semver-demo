import { fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { UploadImageUseCase, ParamsUploadImage } from './upload-image.usecase';
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
    let useCase: UploadImageUseCase;
    beforeAll(() => {
    });
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule],
            providers: [
                UploadImageUseCase,
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

        useCase = TestBed.inject(UploadImageUseCase);

    }));

    beforeEach(() => { 
        USER_PERMISSIONS_DATA['flat-permissions'] = ['component-catalogue|upload-image|ui'];

    });

    it('should create the usecase', () => {
        expect(useCase).toBeTruthy();
    });

    it('should return the path of saved image', fakeAsync((done) => {
        let blob = new Blob([""], { type: 'text/html' });
        blob["lastModifiedDate"] = "";
        blob["name"] = "fakeFileName";
        const mockFile = <File>blob;
        let params = {
            file: mockFile,
            name: 'testFileName.png'
        } as ParamsUploadImage;
        const $data = useCase.invoke(params);
        $data.subscribe((data) => {
            expect(data).toBe('route/of/image')
        })
        flush();
    }))
});
