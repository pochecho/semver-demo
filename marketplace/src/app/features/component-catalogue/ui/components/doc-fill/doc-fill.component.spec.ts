import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { DocFillComponent } from './doc-fill.component';

describe('DocFillComponent', () => {
  let component: DocFillComponent;
  let fixture: ComponentFixture<DocFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocFillComponent ],
      imports: [
        ReactiveFormsModule,
        QuillModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
