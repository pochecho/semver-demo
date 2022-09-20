import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwaggerReaderComponent } from './swagger-reader.component';

describe('SwaggerReaderComponent', () => {
  let component: SwaggerReaderComponent;
  let fixture: ComponentFixture<SwaggerReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwaggerReaderComponent ],
      imports: [
        HttpClientModule,
        //HttpClientTestingModule **mock request
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwaggerReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
