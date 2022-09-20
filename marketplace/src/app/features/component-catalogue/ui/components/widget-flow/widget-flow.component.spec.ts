import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetFlowComponent } from './widget-flow.component';


describe('WidgetFlowComponent', () => {
  let component: WidgetFlowComponent;
  let fixture: ComponentFixture<WidgetFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetFlowComponent],
      schemas:[ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetFlowComponent);
    component = fixture.componentInstance;
    component.data = {"nameComponent": "Accordion", implementations: {
        flutter: {
          demoPath: {}
        }
        
      },
      tags: ["web"],
      documentation:
      { figma:"http"}
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.data.tags).toEqual(['web']);
    expect(component.data.documentation.figma).toEqual("http");
  });
});
