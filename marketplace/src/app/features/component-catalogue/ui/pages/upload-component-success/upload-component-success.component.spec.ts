import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';

import { UploadComponentSuccessComponent } from './upload-component-success.component';

describe('UploadComponentSuccessComponent', () => {
  let component: UploadComponentSuccessComponent;
  let fixture: ComponentFixture<UploadComponentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadComponentSuccessComponent],
      imports: [RouterTestingModule, BcIconModule.forRoot({ path: '' })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
