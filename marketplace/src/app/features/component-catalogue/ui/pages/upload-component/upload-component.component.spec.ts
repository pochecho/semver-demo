import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';
import { UploadComponentComponent } from './upload-component.component';
import { BcInputSelectModule } from '@bancolombia/design-system-web/bc-input-select';
import { BcInputModule } from '@bancolombia/design-system-web/bc-input';
import { BcInputFileModule } from '@bancolombia/design-system-web/bc-input-file';
import { RouterTestingModule } from '@angular/router/testing';
import { UploadImageUseCase } from '../../../domain/usecases/upload-image/upload-image.usecase';
import { ComponentGateway } from '../../../domain/models/component/gateway/component.gateway';
import { ComponentService } from '../../../infrastructure/driven-adapter/components/components.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TokenService } from '../../../../../core/infraestructure/driven-adapter/token.service';
import { UploadComponentUseCase } from '../../../domain/usecases/upload-component/upload-component.usecase';

describe('UploadComponentComponent', () => {
  let component: UploadComponentComponent;
  let fixture: ComponentFixture<UploadComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadComponentComponent],
      providers: [
        UploadImageUseCase,
        UploadComponentUseCase,
        {
          provide: ComponentGateway,
          useClass: ComponentService,
        },
        TokenService,
      ],
      imports: [
        BcIconModule.forRoot({
          path: '',
        }),
        ReactiveFormsModule,
        BcInputSelectModule,
        BcInputModule,
        BcInputFileModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return widget tags', () => {
    const resTags = [
      {
        label: 'Web',
        value: 'Web'
      },
      {
        label: 'App',
        value: 'Mobile'
      }
    ];
    component.showSelectedValueCategory('Widget');
    expect(component.componentTags).toEqual(resTags);
  });

  it('should return components front tags', () => {
    const resTags = [
      {
        label: 'Átomos',
        value: 'Átomo'
      },
      {
        label: 'Moléculas',
        value: 'Molécula'
      },
      {
        label: 'Organismos',
        value: 'Organismo'
      },
      {
        label: 'Plantillas',
        value: 'Plantilla'
      },
      {
        label: 'Páginas',
        value: 'Página'
      }
    ];
    component.showSelectedValueCategory('Componente Front');
    expect(component.componentTags).toEqual(resTags);
  });

  it('should return components back tags', () => {
    const resTags = [
      {
        label: 'Security Service',
        value: 'Security Service'
      },
      {
        label: 'Engagement Service',
        value: 'Engagement Service'
      },
      {
        label: 'Adapter',
        value: 'Adapter'
      },
      {
        label: 'Chanel Management',
        value: 'Chanel Management'
      }
    ];
    component.showSelectedValueCategory('Componente Back');
    expect(component.componentTags).toEqual(resTags);
  });

  it('should return default tags', () => {
    const resTags = [
      {
        label: 'categoría no válida',
        value: 'categoría no válida'
      }
    ];
    component.showSelectedValueCategory('OTHER');
    expect(component.componentTags).toEqual(resTags);
  });

  it('should set infoComponent tags', () => {
    const TAGS = ['prueba', 'tag'];
    component.showSelectedValueTags(TAGS);
    expect(component.currentTag).toBe(TAGS);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
