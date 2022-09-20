import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BcCarouselModule } from '@bancolombia/design-system-web/bc-carousel';
import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';
import { GeneralComponentsModule } from 'src/app/core/ui/general-components/general-components.module';
import { ComponentsModule } from 'src/app/features/component-catalogue/ui/components/components.module';
import { CoreModule } from '../../../../../core/core.module';
import { DevHomeComponent } from './dev-home.component';

describe('DevHomeComponent', () => {
  let component: DevHomeComponent;
  let fixture: ComponentFixture<DevHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevHomeComponent],
      imports: [
        BcCarouselModule,
        CoreModule,
        RouterTestingModule,
        BcIconModule.forRoot({path: ''}),
        ComponentsModule,
        GeneralComponentsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
