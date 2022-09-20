import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';

import { LostContentComponent } from './lost-content.component';

describe('LostContentComponent', () => {
  let component: LostContentComponent;
  let fixture: ComponentFixture<LostContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostContentComponent ],
      imports: [
        BcIconModule.forRoot({path: ''})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
