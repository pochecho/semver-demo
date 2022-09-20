import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BcInputFileModule } from '@bancolombia/design-system-web/bc-input-file';
import { UploadDocComponent } from './upload-doc.component';

describe('UploadDocComponent', () => {
  let component: UploadDocComponent;
  let fixture: ComponentFixture<UploadDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDocComponent ],
      imports: [
        BcInputFileModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
