import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';

import { PromotionalBannerComponent } from './promotional-banner.component';

describe('PromotionalBannerComponent', () => {
  let component: PromotionalBannerComponent;
  let fixture: ComponentFixture<PromotionalBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionalBannerComponent ],
      imports:[
        BcIconModule.forRoot({
          path: ''
        })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
