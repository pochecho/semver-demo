import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BcCarouselModule } from '@bancolombia/design-system-web/bc-carousel';
import { BcIconModule } from "@bancolombia/design-system-web/bc-icon";
import { GeneralComponentsModule } from 'src/app/core/ui/general-components/general-components.module';
import { ComponentsModule } from 'src/app/features/component-catalogue/ui/components/components.module';
import { CoreModule } from '../../../../../core/core.module';
import { DesignHomeComponent } from './design-home.component';

describe('DesignHomeComponent', () => {
  let component: DesignHomeComponent;
  let fixture: ComponentFixture<DesignHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignHomeComponent],
      imports: [
        BcCarouselModule,
        CoreModule,
        RouterTestingModule,
        BcIconModule,
        ComponentsModule,
        GeneralComponentsModule
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(DesignHomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
