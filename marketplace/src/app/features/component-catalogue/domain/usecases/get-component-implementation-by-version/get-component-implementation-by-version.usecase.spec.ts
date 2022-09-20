
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ImplementationService } from 'src/app/features/component-catalogue/infrastructure/driven-adapter/implementation/implementation.service';
import { TokenService } from '../../../../../core/infraestructure/driven-adapter/token.service';
import { ImplementationGateway } from '../../models/implementation/gateway/implementation.gateway';
import { GetComponentImplementationByVersionUsecase } from './get-component-implementation-by-version.usecase';




describe('GetComponentImplementationByVersionUsecase', () => {
  let component: GetComponentImplementationByVersionUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            GetComponentImplementationByVersionUsecase,
            {
                provide: ImplementationGateway,
                useClass: ImplementationService,
            },
            TokenService
        ],
    })
    component = TestBed.inject(GetComponentImplementationByVersionUsecase);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke GetImplementationByVersion', () => {

    const params = {
        technology: 'angular',
        version: '1.0.3',
        id: '456445-54845-54545645-5454564'
    };

    spyOn(component, 'invoke').and.callThrough();
    component.invoke(params);
    expect(component.invoke).toHaveBeenCalled();
  });

});
