import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedFlutterVisualizatorComponent } from './embed-flutter-visualizator.component';

describe('EmbedFlutterVisualizatorComponent', () => {
  let component: EmbedFlutterVisualizatorComponent;
  let fixture: ComponentFixture<EmbedFlutterVisualizatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbedFlutterVisualizatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedFlutterVisualizatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should render a website when the baseUrl is provided', () => {
    const baseUrl = 'null';
    component.baseUrl = baseUrl;
    component.ngOnInit();

    const myFrame = fixture.nativeElement.querySelector('iframe');
    const src = myFrame.getAttribute('src');
    expect(src).toBe(`${baseUrl}`);
  })
});
